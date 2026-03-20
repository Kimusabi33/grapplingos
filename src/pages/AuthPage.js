import { useState } from 'react'
import { signIn, signUp } from '../lib/supabase'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    } else {
      const { error } = await signUp(email, password)
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account, then log in.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Grappling<span>OS</span></div>
          <div className="auth-tagline">Your complete grappling reference</div>
        </div>
        <div className="auth-body">
          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError(''); setMessage('') }}>Log in</button>
            <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => { setMode('signup'); setError(''); setMessage('') }}>Sign up</button>
          </div>

          <form onSubmit={handle}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            {error && <div className="form-error">{error}</div>}
            {message && <div style={{ fontSize: 13, color: '#2d8a4e', marginTop: 8 }}>{message}</div>}
            <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} type="submit" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('guestMode'))} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--gray-400)', cursor: 'pointer', textDecoration: 'underline' }}>
              Browse as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
