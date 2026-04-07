-- ============================================================
-- GrapplingOS — Feature Migration
-- Run this in your Supabase SQL editor
-- ============================================================

-- 1. Profile visibility preferences
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  visibility_prefs JSONB NOT NULL DEFAULT
    '{"username":true,"school":true,"belt":true,"weightClass":true,"ageClass":true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own user_profiles" ON public.user_profiles;
CREATE POLICY "Users manage own user_profiles" ON public.user_profiles
  FOR ALL USING (auth.uid() = id);

-- 2. Competition tracker
CREATE TABLE IF NOT EXISTS public.competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own competitions" ON public.competitions;
CREATE POLICY "Users manage own competitions" ON public.competitions
  FOR ALL USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.competition_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID REFERENCES public.competitions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  result TEXT CHECK (result IN ('win', 'loss')) NOT NULL,
  medal TEXT CHECK (medal IN ('gold', 'silver', 'bronze', 'none')) NOT NULL DEFAULT 'none',
  match_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.competition_matches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own matches" ON public.competition_matches;
CREATE POLICY "Users manage own matches" ON public.competition_matches
  FOR ALL USING (auth.uid() = user_id);

-- 3. Planned sessions (for calendar integration)
CREATE TABLE IF NOT EXISTS public.planned_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  planned_date DATE NOT NULL,
  planned_time TEXT,
  focus TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.planned_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own planned_sessions" ON public.planned_sessions;
CREATE POLICY "Users manage own planned_sessions" ON public.planned_sessions
  FOR ALL USING (auth.uid() = user_id);

-- 4. Technique personal notes
CREATE TABLE IF NOT EXISTS public.technique_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  technique_id INTEGER NOT NULL,
  note TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, technique_id)
);
ALTER TABLE public.technique_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own technique_notes" ON public.technique_notes;
CREATE POLICY "Users manage own technique_notes" ON public.technique_notes
  FOR ALL USING (auth.uid() = user_id);

-- 5. User feedback
CREATE TABLE IF NOT EXISTS public.user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.user_feedback;
CREATE POLICY "Anyone can insert feedback" ON public.user_feedback
  FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users read own feedback" ON public.user_feedback;
CREATE POLICY "Users read own feedback" ON public.user_feedback
  FOR SELECT USING (auth.uid() = user_id);

-- 5b. Add notes column to planned_sessions (run if table already exists)
ALTER TABLE public.planned_sessions ADD COLUMN IF NOT EXISTS notes TEXT;

-- 6. History content cache
CREATE TABLE IF NOT EXISTS public.history_cache (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.history_cache ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read history_cache" ON public.history_cache;
CREATE POLICY "Public read history_cache" ON public.history_cache
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth users insert history_cache" ON public.history_cache;
CREATE POLICY "Auth users insert history_cache" ON public.history_cache
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Auth users update history_cache" ON public.history_cache;
CREATE POLICY "Auth users update history_cache" ON public.history_cache
  FOR UPDATE USING (auth.uid() IS NOT NULL);
