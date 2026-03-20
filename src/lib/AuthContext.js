import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getProgress } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProgress(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProgress(session.user.id)
      else setProgress({})
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProgress = async (userId) => {
    const data = await getProgress(userId)
    setProgress(data)
  }

  const updateProgress = (techniqueId, status) => {
    setProgress(prev => ({ ...prev, [techniqueId]: status }))
  }

  return (
    <AuthContext.Provider value={{ user, progress, updateProgress, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
