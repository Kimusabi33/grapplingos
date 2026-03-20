import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/AuthContext'
import { signOut } from './lib/supabase'
import LibraryPage from './pages/LibraryPage'
import TechniquePage from './pages/TechniquePage'
import AuthPage from './pages/AuthPage'
import './index.css'

function Nav() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Grappling<span>OS</span>
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user">{user.email}</span>
            <button className="btn btn-outline" onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => navigate('/auth')}>Sign in</button>
        )}
      </div>
    </nav>
  )
}

function AppRoutes() {
  const { user, loading } = useAuth()
  const [guestMode, setGuestMode] = useState(false)

  useEffect(() => {
    const handler = () => setGuestMode(true)
    window.addEventListener('guestMode', handler)
    return () => window.removeEventListener('guestMode', handler)
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: '0.06em', color: 'var(--white)' }}>
        Grappling<span style={{ color: 'var(--red)' }}>OS</span>
      </div>
    </div>
  )

  if (!user && !guestMode) {
    return (
      <Routes>
        <Route path="*" element={<AuthPage />} />
      </Routes>
    )
  }

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LibraryPage />} />
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
