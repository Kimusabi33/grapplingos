import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getProgress = async (userId) => {
  const { data, error } = await supabase
    .from('progress')
    .select('technique_id, status')
    .eq('user_id', userId)
  if (error) return {}
  return data.reduce((acc, row) => {
    acc[row.technique_id] = row.status
    return acc
  }, {})
}

export const upsertProgress = async (userId, techniqueId, status) => {
  const { error } = await supabase
    .from('progress')
    .upsert({ user_id: userId, technique_id: techniqueId, status }, { onConflict: 'user_id,technique_id' })
  return { error }
}

import { techniques as staticTechniques } from '../data/techniques'

// Some techniques exist in both sources but with slightly different names
const NAME_ALIASES = {
  'Osoto-gaeshi':              'O-soto-gaeshi',
  'Osoto-makikomi':            'O-soto-makikomi',
  'De la Riva guard':          'De la Riva',
  'Guillotine choke':          'Guillotine',
  'Bridge and roll escape':    'Bridge escape',
  'Ude-hishigi-juji-gatame':   'Juji-gatame',
}

// Merge Supabase row (source of truth for live fields) with static rich content
const normalize = (row) => {
  const lookupName = NAME_ALIASES[row.name] ?? row.name
  const staticData = staticTechniques.find(t => t.name === lookupName) || {}
  // Resolve related IDs (static file IDs) to names so TechniquePage can look them up by name
  const relatedNames = (staticData.related || [])
    .map(rid => staticTechniques.find(t => t.id === rid)?.name)
    .filter(Boolean)
  return {
    ...staticData,
    ...row,
    cat: row.category,
    desc: row.description,
    vid: row.youtube_url?.trim() || null,
    relatedNames,
  }
}

export const getTechniques = async () => {
  const { data, error } = await supabase
    .from('techniques')
    .select('*')
    .order('id')
  if (error) return []
  return data.map(normalize)
}

export const getTechniqueById = async (id) => {
  const { data, error } = await supabase
    .from('techniques')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return normalize(data)
}

// ─── Profile visibility prefs ────────────────────────────────────────────────

const DEFAULT_VISIBILITY = { username: true, school: true, belt: true, weightClass: true, ageClass: true }

export const getVisibilityPrefs = async (userId) => {
  const { data } = await supabase
    .from('user_profiles')
    .select('visibility_prefs')
    .eq('id', userId)
    .single()
  if (!data) return DEFAULT_VISIBILITY
  return { ...DEFAULT_VISIBILITY, ...(data.visibility_prefs || {}) }
}

export const upsertVisibilityPrefs = async (userId, prefs) => {
  const { error } = await supabase
    .from('user_profiles')
    .upsert({ id: userId, visibility_prefs: prefs, updated_at: new Date().toISOString() }, { onConflict: 'id' })
  return { error }
}

// ─── Competitions ─────────────────────────────────────────────────────────────

export const getCompetitions = async (userId) => {
  const { data, error } = await supabase
    .from('competitions')
    .select('*, competition_matches(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  return error ? [] : data
}

export const addCompetition = async (userId, name, date) => {
  const { data, error } = await supabase
    .from('competitions')
    .insert({ user_id: userId, name, date: date || null })
    .select()
    .single()
  return { data, error }
}

export const deleteCompetition = async (id) => {
  const { error } = await supabase.from('competitions').delete().eq('id', id)
  return { error }
}

export const addMatch = async (userId, competitionId, matchData) => {
  const { data, error } = await supabase
    .from('competition_matches')
    .insert({ user_id: userId, competition_id: competitionId, ...matchData })
    .select()
    .single()
  return { data, error }
}

export const deleteMatch = async (id) => {
  const { error } = await supabase.from('competition_matches').delete().eq('id', id)
  return { error }
}

// ─── Planned sessions ─────────────────────────────────────────────────────────

export const getPlannedSessions = async (userId) => {
  const { data, error } = await supabase
    .from('planned_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('planned_date')
  return error ? [] : data
}

export const addPlannedSession = async (userId, session) => {
  const { data, error } = await supabase
    .from('planned_sessions')
    .insert({ user_id: userId, ...session })
    .select()
    .single()
  return { data, error }
}

export const updateSessionCompletion = async (sessionId, completed) => {
  const { error } = await supabase
    .from('planned_sessions')
    .update({ completed })
    .eq('id', sessionId)
  return { error }
}

export const updatePlannedSessionNotes = async (sessionId, notes) => {
  const { error } = await supabase
    .from('planned_sessions')
    .update({ notes })
    .eq('id', sessionId)
  return { error }
}

export const deletePlannedSession = async (sessionId) => {
  const { error } = await supabase.from('planned_sessions').delete().eq('id', sessionId)
  return { error }
}

// ─── Technique notes ─────────────────────────────────────────────────────────

export const getTechniqueNote = async (userId, techniqueId) => {
  const { data } = await supabase
    .from('technique_notes')
    .select('note')
    .eq('user_id', userId)
    .eq('technique_id', techniqueId)
    .single()
  return data?.note || ''
}

export const upsertTechniqueNote = async (userId, techniqueId, note) => {
  const { error } = await supabase
    .from('technique_notes')
    .upsert(
      { user_id: userId, technique_id: techniqueId, note, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,technique_id' }
    )
  return { error }
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

export const submitFeedback = async (userId, feedbackText) => {
  const { error } = await supabase
    .from('user_feedback')
    .insert({ user_id: userId || null, feedback_text: feedbackText })
  return { error }
}

// ─── Subscription ────────────────────────────────────────────────────────────

export const getSubscription = async (userId) => {
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data || null
}

// ─── History cache ────────────────────────────────────────────────────────────

export const getHistoryCache = async (sport) => {
  const { data } = await supabase
    .from('history_cache')
    .select('content')
    .eq('id', sport)
    .single()
  return data?.content || null
}

export const saveHistoryCache = async (sport, content) => {
  const { error } = await supabase
    .from('history_cache')
    .upsert({ id: sport, content }, { onConflict: 'id' })
  return { error }
}
