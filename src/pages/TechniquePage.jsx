import { useParams, useNavigate } from 'react-router-dom'
import { techniques } from '../data/techniques'
import { useAuth } from '../lib/AuthContext'
import { upsertProgress } from '../lib/supabase'

const sportBadge = (sport) => {
  const cls = sport === 'judo' ? 'badge-judo' : sport === 'bjj' ? 'badge-bjj' : 'badge-both'
  const label = sport === 'both' ? 'Both' : sport === 'judo' ? 'Judo' : 'BJJ'
  return <span className={`sport-badge ${cls}`}>{label}</span>
}

export default function TechniquePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, progress, updateProgress } = useAuth()
  const t = techniques.find(x => x.id === parseInt(id))

  if (!t) return (
    <div className="container page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to library</button>
      <p>Technique not found.</p>
    </div>
  )

  const p = progress[t.id] || 'none'
  const related = (t.related || []).map(rid => techniques.find(x => x.id === rid)).filter(Boolean)

  const handleStatus = async (e) => {
    const status = e.target.value
    updateProgress(t.id, status)
    if (user) await upsertProgress(user.id, t.id, status)
  }

  return (
    <div className="container page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to library</button>

      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-top">
          <div>
            <div className="detail-cat">{t.cat}</div>
            <h1 className="detail-name">{t.name}</h1>
            <div className="detail-meta">
              {sportBadge(t.sport)}
              <div className="diff-pips" title={`Difficulty: ${t.diff}/5`}>
                {[1,2,3,4,5].map(i => <div key={i} className={`pip ${i <= t.diff ? 'on' : ''}`} />)}
              </div>
              <span style={{ fontSize: 11, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Difficulty {t.diff}/5
              </span>
            </div>
          </div>
          {t.vid ? (
            <a className="watch-btn" href={t.vid} target="_blank" rel="noopener noreferrer">
              <span className="play-icon" />
              Watch
            </a>
          ) : (
            <span className="watch-btn disabled">
              <span className="play-icon" />
              Video coming
            </span>
          )}
        </div>
        <p className="detail-long">{t.long}</p>
      </div>

      {/* AI insight */}
      <div className="ai-card">
        <div className="ai-label">Coach insight</div>
        <div className="ai-text">{t.ai}</div>
      </div>

      {/* Detail cards */}
      <div className="detail-body">
        <div className="detail-card">
          <div className="detail-card-title">Setup</div>
          <p className="detail-card-text">{t.setup}</p>
        </div>
        <div className="detail-card">
          <div className="detail-card-title">Key principle</div>
          <p className="detail-card-text">{t.key}</p>
        </div>
        <div className="detail-card">
          <div className="detail-card-title">Common entries</div>
          <div className="tag-list">
            {t.entries.map((e, i) => <span key={i} className="tag">{e}</span>)}
          </div>
        </div>
        <div className="detail-card">
          <div className="detail-card-title">Counters</div>
          <div className="tag-list">
            {t.counters.map((c, i) => <span key={i} className="tag">{c}</span>)}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray-400)', fontWeight: 600, marginBottom: 10 }}>Related techniques</div>
          <div className="related-grid">
            {related.map(r => (
              <div key={r.id} className="related-card" onClick={() => navigate(`/technique/${r.id}`)}>
                {r.name}
                {sportBadge(r.sport)}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Progress */}
      <div className="progress-section">
        <span className="progress-label">
          {user ? 'Track your progress:' : 'Sign in to save your progress'}
        </span>
        <select className="progress-select" value={p} onChange={handleStatus} disabled={!user}>
          <option value="none">Not started</option>
          <option value="aware">Aware</option>
          <option value="drilling">Drilling</option>
          <option value="owned">Owned</option>
        </select>
      </div>
    </div>
  )
}
