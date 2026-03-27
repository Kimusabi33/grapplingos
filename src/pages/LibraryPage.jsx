import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { techniques, categories } from '../data/techniques'
import { useAuth } from '../lib/AuthContext'
import { upsertProgress } from '../lib/supabase'

const sportBadge = (sport) => {
  const cls = sport === 'judo' ? 'badge-judo' : sport === 'bjj' ? 'badge-bjj' : 'badge-both'
  const label = sport === 'both' ? 'Both' : sport === 'judo' ? 'Judo' : 'BJJ'
  return <span className={`sport-badge ${cls}`}>{label}</span>
}

const statusLabel = (s) => {
  if (!s || s === 'none') return null
  return <span className={`status-badge ${s}`}>{s}</span>
}

export default function LibraryPage() {
  const navigate = useNavigate()
  const { user, progress, updateProgress } = useAuth()
  const [sport, setSport] = useState('all')
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = techniques.filter(t => {
    if (sport === 'judo' && t.sport !== 'judo' && t.sport !== 'both') return false
    if (sport === 'bjj' && t.sport !== 'bjj' && t.sport !== 'both') return false
    if (sport === 'mine' && !progress[t.id]) return false
    if (cat !== 'All' && t.cat !== cat) return false
    const q = search.toLowerCase()
    if (q && !t.name.toLowerCase().includes(q) && !t.desc.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q)) return false
    return true
  })

  const counts = {
    total: techniques.length,
    aware: Object.values(progress).filter(v => v === 'aware').length,
    drilling: Object.values(progress).filter(v => v === 'drilling').length,
    owned: Object.values(progress).filter(v => v === 'owned').length,
  }

  const handleStatusChange = async (e, id) => {
    e.stopPropagation()
    const status = e.target.value
    updateProgress(id, status)
    if (user) await upsertProgress(user.id, id, status)
  }

  return (
    <div className="container page">
      {!user && (
        <div className="guest-banner">
          <p><strong>Browsing as guest.</strong> Progress won't be saved between sessions.</p>
          <button className="btn btn-primary" onClick={() => navigate('/auth')}>Sign up free</button>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title">Technique Library</h1>
        <span style={{ fontSize: 12, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {techniques.length} techniques · Judo + BJJ
        </span>
      </div>

      <div className="stats-bar">
        <div className="stat-cell">
          <div className="stat-num">{counts.total}</div>
          <div className="stat-label">Techniques</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num gold">{counts.aware}</div>
          <div className="stat-label">Aware</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num blue">{counts.drilling}</div>
          <div className="stat-label">Drilling</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num red">{counts.owned}</div>
          <div className="stat-label">Owned</div>
        </div>
      </div>

      <div className="filter-bar">
        <input className="search-input" placeholder="Search techniques..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="sport-tabs">
          {['all', 'judo', 'bjj', 'mine'].map(s => (
            <button key={s} className={`sport-tab ${sport === s ? 'active' : ''}`} onClick={() => setSport(s)}>
              {s === 'all' ? 'All' : s === 'mine' ? 'My progress' : s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="cat-row">
        {categories.map(c => (
          <button key={c} className={`cat-pill ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="results-meta">{filtered.length} technique{filtered.length !== 1 ? 's' : ''}</div>

      {filtered.length === 0 ? (
        <div className="empty">
          <h3>No techniques found</h3>
          <p>Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(t => {
            const p = progress[t.id] || 'none'
            return (
              <div key={t.id} className={`card status-${p}`} onClick={() => navigate(`/technique/${t.id}`)}>
                <div className="card-header">
                  <div className="card-name">{t.name}</div>
                  {sportBadge(t.sport)}
                </div>
                <div className="card-cat">{t.cat}</div>
                <div className="card-desc">{t.desc}</div>
                <div className="card-footer">
                  {statusLabel(p) || <span className="status-badge">—</span>}
                  <span className="view-link">View →</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
