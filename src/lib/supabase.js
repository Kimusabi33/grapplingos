import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get current user
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Sign up
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

// Sign in
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get progress for current user
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

// Upsert progress entry
export const upsertProgress = async (userId, techniqueId, status) => {
  const { error } = await supabase
    .from('progress')
    .upsert({ user_id: userId, technique_id: techniqueId, status }, { onConflict: 'user_id,technique_id' })
  return { error }
}
