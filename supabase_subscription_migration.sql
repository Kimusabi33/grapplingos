-- ============================================================
-- GrapplingOS — Stripe Subscription Migration
-- Run this in your Supabase SQL editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  -- Valid Stripe subscription statuses plus 'canceled' for deleted subs
  status                  TEXT CHECK (status IN (
                            'active', 'trialing', 'past_due', 'canceled',
                            'incomplete', 'incomplete_expired', 'unpaid', 'paused'
                          )),
  current_period_end      TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read only their own subscription record.
-- Writes happen exclusively through the webhook via the service role key (bypasses RLS).
DROP POLICY IF EXISTS "Users read own subscription" ON public.subscriptions;
CREATE POLICY "Users read own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);
