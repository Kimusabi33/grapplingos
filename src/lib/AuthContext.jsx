import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getProgress, getSubscription } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState({})
  const [subscription, setSubscription] = useState(null)
  const [subscriptionLoading, setSubscriptionLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        loadProgress(u.id)
        loadSubscription(u.id)
      }
      setLoading(false)
    })

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        loadProgress(u.id)
        loadSubscription(u.id)
      } else {
        setProgress({})
        setSubscription(null)
      }
    })

    return () => authListener.unsubscribe()
  }, [])

  const loadProgress = async (userId) => {
    const data = await getProgress(userId)
    setProgress(data)
  }

  const loadSubscription = async (userId) => {
    setSubscriptionLoading(true)
    const data = await getSubscription(userId)
    setSubscription(data)
    setSubscriptionLoading(false)
  }

  const updateProgress = (techniqueId, status) => {
    setProgress(prev => ({ ...prev, [techniqueId]: status }))
  }

  const refreshSubscription = () => {
    if (user) loadSubscription(user.id)
  }

  const isPremium =
    subscription?.status === 'active' || subscription?.status === 'trialing'

  return (
    <AuthContext.Provider value={{
      user, progress, updateProgress,
      subscription, isPremium, subscriptionLoading, refreshSubscription,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
