import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/AuthContext'
import { signOut, submitFeedback } from './lib/supabase'
import { useUpgrade } from './lib/premium'
import DashboardPage from './pages/DashboardPage'
import LibraryPage from './pages/LibraryPage'
import TechniquePage from './pages/TechniquePage'
import AuthPage from './pages/AuthPage'
import HistoryPage from './pages/HistoryPage'
import './index.css'

// ── Feedback modal ────────────────────────────────────────────────────────────
function FeedbackModal({ onClose, userId }) {
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return
    setSending(true)
    await submitFeedback(userId, text.trim())
    setSent(true)
    setTimeout(onClose, 1500)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 420, padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '.04em' }}>Send Feedback</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--green)', fontSize: 14 }}>✓ Thanks for your feedback!</div>
        ) : (
          <>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share a bug, feature request, or anything on your mind…"
              className="dash-textarea"
              style={{ minHeight: 100, marginBottom: 10 }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleSubmit} disabled={sending || !text.trim()} className="btn btn-primary" style={{ flex: 1, opacity: (!text.trim() || sending) ? 0.5 : 1 }}>
                {sending ? 'Sending…' : 'Submit'}
              </button>
              <button onClick={onClose} className="btn btn-ghost">Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Checkout success banner ───────────────────────────────────────────────────
function CheckoutBanner({ type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000)
    return () => clearTimeout(t)
  }, [])
  if (!type) return null
  const success = type === 'success'
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: success ? 'rgba(61,186,111,0.95)' : 'rgba(90,90,95,0.95)',
      color: 'white', padding: '12px 1.25rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: "'DM Sans', sans-serif", fontSize: 13, backdropFilter: 'blur(8px)',
    }}>
      <span>
        {success
          ? '✦ Welcome to Premium! Your subscription is now active.'
          : 'Checkout cancelled — no charge was made.'}
      </span>
      <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>✕</button>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ onFeedback }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isPremium, subscriptionLoading } = useAuth()
  const { handleUpgrade, upgrading } = useUpgrade()

  const isLib = location.pathname.startsWith('/library') || location.pathname.startsWith('/technique')
  const isDash = location.pathname === '/'
  const isHistory = location.pathname === '/history'

  const navLinks = [
    { path: '/', label: 'Dashboard', active: isDash },
    { path: '/library', label: 'Library', active: isLib },
    { path: '/history', label: 'History', active: isHistory },
  ]

  return (
    <nav className="nav">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
          <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Grappling<span>OS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={onFeedback}
              title="Send feedback"
              style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', fontSize: 11, color: 'var(--muted)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
            >
              Feedback
            </button>

            {/* Show upgrade button for logged-in non-premium users */}
            {user && !isPremium && !subscriptionLoading && (
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.9), rgba(201,168,76,0.6))',
                  border: '1px solid rgba(201,168,76,0.5)',
                  borderRadius: 'var(--radius-sm)', padding: '4px 12px',
                  fontSize: 11, fontWeight: 600, color: '#111', cursor: upgrading ? 'wait' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: '.04em',
                  opacity: upgrading ? 0.7 : 1,
                }}
              >
                {upgrading ? '…' : '✦ Upgrade'}
              </button>
            )}

            {/* Premium badge */}
            {user && isPremium && (
              <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 99 }}>
                ✦ Premium
              </span>
            )}

            {user ? (
              <button className="btn btn-outline btn-sm" onClick={() => { signOut(); navigate('/') }}>Sign out</button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/auth')}>Sign in</button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)', margin: '0 -1.25rem', padding: '0 1.25rem' }}>
          {navLinks.map(({ path, label, active }) => (
            <button key={path} onClick={() => navigate(path)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
              color: active ? 'var(--white)' : 'var(--muted)',
              padding: '8px 16px 8px 0',
              borderBottom: active ? '2px solid var(--red)' : '2px solid transparent',
              transition: 'all .15s', marginBottom: '-1px'
            }}>{label}</button>
          ))}
        </div>
      </div>
    </nav>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ── App routes ────────────────────────────────────────────────────────────────
function AppRoutes() {
  const { user, loading, refreshSubscription } = useAuth()
  const [guestMode, setGuestMode] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [checkoutResult, setCheckoutResult] = useState(null) // 'success' | 'canceled' | null
  const location = useLocation()

  // Guest mode
  useEffect(() => {
    const h = () => setGuestMode(true)
    window.addEventListener('guestMode', h)
    return () => window.removeEventListener('guestMode', h)
  }, [])

  // Detect Stripe checkout redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const result = params.get('checkout')
    if (result === 'success' || result === 'canceled') {
      setCheckoutResult(result)
      // Refresh subscription status after successful checkout
      if (result === 'success') refreshSubscription()
      // Clear query param from URL without reload
      window.history.replaceState({}, '', '/')
    }
  }, [location.search])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: '0.06em', color: 'var(--white)' }}>
        Grappling<span style={{ color: 'var(--red)' }}>OS</span>
      </div>
    </div>
  )

  if (!user && !guestMode) {
    return <Routes><Route path="*" element={<AuthPage />} /></Routes>
  }

  return (
    <>
      <ScrollToTop />
      <Nav onFeedback={() => setShowFeedback(true)} />
      {checkoutResult && (
        <CheckoutBanner type={checkoutResult} onDismiss={() => setCheckoutResult(null)} />
      )}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} userId={user?.id} />}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/technique/:id" element={<TechniquePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
