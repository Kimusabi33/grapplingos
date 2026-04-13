import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { supabase } from './supabase'

// ── Upgrade hook — call from any component ────────────────────────────────────
export function useUpgrade() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [upgrading, setUpgrading] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      navigate('/auth')
      return
    }
    setUpgrading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ userId: user.id, email: user.email }),
      })
      const { url, error } = await res.json()
      if (url) {
        window.location.href = url
      } else {
        console.error('Checkout error:', error)
        setUpgrading(false)
      }
    } catch (err) {
      console.error('Checkout fetch error:', err)
      setUpgrading(false)
    }
  }

  return { handleUpgrade, upgrading }
}

// ── Billing portal redirect ───────────────────────────────────────────────────
export function useManageBilling() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const openPortal = async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/.netlify/functions/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else console.error('Portal error:', error)
    } catch (err) {
      console.error('Portal fetch error:', err)
    }
    setLoading(false)
  }

  return { openPortal, loading }
}

// ── Full-page / card upgrade prompt ──────────────────────────────────────────
export function UpgradePrompt({ feature }) {
  const { handleUpgrade, upgrading } = useUpgrade()
  return (
    <div className="upgrade-prompt">
      <div className="upgrade-star">✦</div>
      <div className="upgrade-title">Premium</div>
      <div className="upgrade-body">
        {feature || 'This feature'} is available on the Premium plan.
      </div>
      <button
        onClick={handleUpgrade}
        disabled={upgrading}
        className="btn btn-primary upgrade-btn"
      >
        {upgrading ? 'Redirecting to Stripe…' : 'Upgrade to Premium'}
      </button>
      <div className="upgrade-sub">Billed monthly · Cancel anytime</div>
    </div>
  )
}

// ── Compact inline upgrade strip ─────────────────────────────────────────────
export function UpgradeStrip({ feature }) {
  const { handleUpgrade, upgrading } = useUpgrade()
  return (
    <div className="upgrade-strip">
      <span className="upgrade-strip-text">✦ {feature || 'Premium feature'}</span>
      <button
        onClick={handleUpgrade}
        disabled={upgrading}
        className="btn btn-primary btn-sm"
        style={{ opacity: upgrading ? 0.7 : 1 }}
      >
        {upgrading ? 'Redirecting…' : 'Upgrade'}
      </button>
    </div>
  )
}

// ── Gate wrapper — renders children if premium, otherwise upgrade prompt ──────
export function PremiumGate({ children, feature, compact }) {
  const { isPremium, subscriptionLoading, user } = useAuth()
  const navigate = useNavigate()

  // While loading subscription, render nothing (avoid flash of wrong state)
  if (subscriptionLoading) return null

  if (isPremium) return children

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--muted)', fontSize: 13 }}>
        <button onClick={() => navigate('/auth')} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          Sign in
        </button>{' '}to access {feature || 'this feature'}.
      </div>
    )
  }

  if (compact) return <UpgradeStrip feature={feature} />
  return <UpgradePrompt feature={feature} />
}
