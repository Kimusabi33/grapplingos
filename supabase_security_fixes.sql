-- ============================================================
-- GrapplingOS — Security Fixes
-- Run this in your Supabase SQL editor
-- ============================================================

-- Fix H2: history_cache was writable by any authenticated user.
-- Remove the permissive INSERT/UPDATE policies — writes now happen
-- only via the service role key (server-side), which bypasses RLS.
DROP POLICY IF EXISTS "Auth users insert history_cache" ON public.history_cache;
DROP POLICY IF EXISTS "Auth users update history_cache" ON public.history_cache;

-- Fix M1: user_feedback INSERT allowed unauthenticated callers (spam risk).
-- Restrict to signed-in users only.
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.user_feedback;
CREATE POLICY "Auth users insert feedback" ON public.user_feedback
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
