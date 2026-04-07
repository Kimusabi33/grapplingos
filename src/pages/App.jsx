import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/AuthContext'
import { signOut } from './lib/supabase'
import DashboardPage from './pages/DashboardPage'
import LibraryPage from './pages/LibraryPage'
import TechniquePage from './pages/TechniquePage'
import AuthPage from './pages/AuthPage'
import './index.css'

function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isLib = location.pathname.startsWith('/library') || location.pathname.startsWith('/technique')
  const isDash = location.pathname === '/'

  return (
    <nav className="nav">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
          <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Grappling<span>OS</span>
          </div>
          {user ? (
            <button className="btn btn-outline btn-sm" onClick={() => { signOut(); navigate('/') }}>Sign out</button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/auth')}>Sign in</button>
          )}
        </div>
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)', margin: '0 -1.25rem', padding: '0 1.25rem' }}>
          {[{ path: '/', label: 'Dashboard', active: isDash }, { path: '/library', label: 'Library', active: isLib }].map(({ path, label, active }) => (
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

function AppRoutes() {
  const { user, loading } = useAuth()
  const [guestMode, setGuestMode] = useState(false)

  useEffect(() => {
    const h = () => setGuestMode(true)
    window.addEventListener('guestMode', h)
    return () => window.removeEventListener('guestMode', h)
  }, [])

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
      <Nav />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/technique/:id" element={<TechniquePage />} />
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
