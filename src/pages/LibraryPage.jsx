import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { getTechniques } from '../lib/supabase'

const ALL_CATEGORIES = ['All', 'Throws', 'Guards', 'Chokes', 'Armlocks', 'Leg locks', 'Pins', 'Escapes', 'Positions']
const LS_KEY = 'grapplingos_library_state'

const sportBadge = (sport) => {
  const cls = sport === 'judo' ? 'badge-judo' : sport === 'bjj' ? 'badge-bjj' : 'badge-both'
  const label = sport === 'both' ? 'Both' : sport.toUpperCase()
  return <span className={`badge ${cls}`}>{label}</span>
}

export default function LibraryPage() {
  const navigate = useNavigate()
  const { user, progress } = useAuth()
  const [sport, setSport] = useState('all')
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)
  const restoreScrollRef = useRef(null)
  const didRestoreRef = useRef(false)

  // On mount: restore filter state + scroll position if navigating back from technique
  useEffect(() => {
    const saved = sessionStorage.getItem(LS_KEY)
    if (saved) {
      try {
        const { sport: s, cat: c, search: q, scrollY } = JSON.parse(saved)
        setSport(s || 'all')
        setCat(c || 'All')
        setSearch(q || '')
        restoreScrollRef.current = scrollY || 0
        sessionStorage.removeItem(LS_KEY)
      } catch {}
    }
  }, [])

  useEffect(() => {
    getTechniques().then(data => {
      setTechniques(data)
      setLoading(false)
    })
  }, [])

  // Restore scroll after techniques load
  useEffect(() => {
    if (!loading && restoreScrollRef.current !== null && !didRestoreRef.current) {
      didRestoreRef.current = true
      const y = restoreScrollRef.current
      restoreScrollRef.current = null
      requestAnimationFrame(() => window.scrollTo(0, y))
    }
  }, [loading])

  const handleTechClick = (id) => {
    // Save current state for restoration
    sessionStorage.setItem(LS_KEY, JSON.stringify({ sport, cat, search, scrollY: window.scrollY }))
    navigate(`/technique/${id}`)
  }

  const filtered = techniques.filter(t => {
    if (sport === 'judo' && t.sport !== 'judo' && t.sport !== 'both') return false
    if (sport === 'bjj' && t.sport !== 'bjj' && t.sport !== 'both') return false
    if (sport === 'mine' && !progress[t.id]) return false
    if (cat !== 'All' && t.cat !== cat) return false
    const q = search.toLowerCase()
    if (q && !t.name.toLowerCase().includes(q) && !t.desc?.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q)) return false
    return true
  })

  const statusColor = { aware: 'var(--gold)', drilling: 'var(--blue)', owned: 'var(--green)' }

  return (
    <div className="container page">
      <div className="page-header">
        <h1 className="page-title">Technique library</h1>
        <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{loading ? '…' : techniques.length} techniques · Judo + BJJ</span>
      </div>

      <input className="search-bar" placeholder="Search techniques..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="sport-row">
        {['all', 'judo', 'bjj', 'mine'].map(s => (
          <button key={s} className={`sport-btn ${sport === s ? 'active' : ''}`} onClick={() => setSport(s)}>
            {s === 'all' ? 'All' : s === 'mine' ? 'My progress' : s.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="pill-row">
        {ALL_CATEGORIES.map(c => (
          <button key={c} className={`pill ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="results-meta">{filtered.length} technique{filtered.length !== 1 ? 's' : ''}</div>

      {loading ? (
        <div className="empty"><p>Loading techniques…</p></div>
      ) : filtered.length === 0 ? (
        <div className="empty"><p>No techniques match your filters.</p></div>
      ) : (
        <div className="tech-grid">
          {filtered.map(t => {
            const p = progress[t.id] || 'none'
            return (
              <div key={t.id} className={`tech-card status-${p}`} onClick={() => handleTechClick(t.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                  <div className="tech-name">{t.name}</div>
                  {sportBadge(t.sport)}
                </div>
                <div className="tech-cat">{t.cat}</div>
                <div className="tech-desc">{t.desc}</div>
                <div className="tech-footer">
                  <span className={`status-pill ${p}`}>{p === 'none' ? '—' : p}</span>
                  <span style={{ fontSize: 11, color: 'var(--red)' }}>View →</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
