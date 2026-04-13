// Creates a Stripe Checkout session and returns the hosted URL.
// Called from the frontend when a user clicks "Upgrade to Premium".
// The Stripe secret key never touches the browser.

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

  // Verify the caller's Supabase JWT so the userId cannot be spoofed
  const authHeader = event.headers['authorization'] || event.headers['Authorization']
  if (!authHeader?.startsWith('Bearer ')) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) }
  }
  const token = authHeader.slice(7)
  const { data: { user: authedUser }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !authedUser) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Unauthorized' }) }
  }

  let userId, email
  try {
    const body = JSON.parse(event.body || '{}')
    userId = body.userId
    email = body.email
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) }
  }

  // Ensure the token belongs to the user making the request
  if (!userId || !email || authedUser.id !== userId) {
    return { statusCode: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Forbidden' }) }
  }

  try {
    // Check if a Stripe customer already exists for this user to avoid duplicates
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id, status')
      .eq('user_id', userId)
      .single()

    let customerId = existingSub?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId },
      })
      customerId = customer.id
    }

    const siteUrl = process.env.URL || 'http://localhost:8888'

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      success_url: `${siteUrl}/?checkout=success`,
      cancel_url: `${siteUrl}/?checkout=canceled`,
      // Pass userId through so the webhook can link the subscription to the user
      metadata: { userId },
      subscription_data: { metadata: { userId } },
      allow_promotion_codes: true,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (err) {
    console.error('create-checkout-session error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
