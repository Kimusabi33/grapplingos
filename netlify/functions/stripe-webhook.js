// Handles Stripe webhook events and writes subscription status to Supabase
// using the service role key (bypasses RLS — never expose this key to the browser).
// Register this URL in the Stripe dashboard: https://your-site.netlify.app/.netlify/functions/stripe-webhook

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  // Stripe sends the raw body for signature verification.
  // Netlify may base64-encode it — handle both cases.
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body

  const sig = event.headers['stripe-signature']

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }

  try {
    switch (stripeEvent.type) {
      // ── Checkout completed → subscription activated ──────────────────────────
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object

        // Retrieve full subscription to get period_end and status
        const sub = await stripe.subscriptions.retrieve(session.subscription)
        const userId = session.metadata?.userId || sub.metadata?.userId

        if (!userId) {
          console.error('checkout.session.completed: no userId in metadata', session.id)
          break
        }

        await supabase.from('subscriptions').upsert(
          {
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            status: sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        )
        break
      }

      // ── Subscription updated (renewal, plan change, pause, etc.) ─────────────
      case 'customer.subscription.updated': {
        const sub = stripeEvent.data.object
        const userId = sub.metadata?.userId

        const update = {
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }

        if (userId) {
          await supabase.from('subscriptions').update(update).eq('user_id', userId)
        } else {
          await supabase.from('subscriptions').update(update).eq('stripe_subscription_id', sub.id)
        }
        break
      }

      // ── Subscription cancelled ───────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = stripeEvent.data.object
        const userId = sub.metadata?.userId

        const update = {
          status: 'canceled',
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }

        if (userId) {
          await supabase.from('subscriptions').update(update).eq('user_id', userId)
        } else {
          await supabase.from('subscriptions').update(update).eq('stripe_subscription_id', sub.id)
        }
        break
      }

      // ── Payment failed ───────────────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due', updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', invoice.subscription)
        break
      }

      default:
        // Unhandled event — log and return 200 so Stripe stops retrying
        console.log('Unhandled webhook event type:', stripeEvent.type)
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return { statusCode: 500, body: `Handler Error: ${err.message}` }
  }
}
