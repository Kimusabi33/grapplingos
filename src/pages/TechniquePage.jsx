import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../lib/AuthContext'
import { getTechniqueById, getTechniques, upsertProgress, getTechniqueNote, upsertTechniqueNote } from '../lib/supabase'
import { UpgradeStrip, useUpgrade } from '../lib/premium'

const sportBadge = (sport) => {
  const cls = sport === 'judo' ? 'badge-judo' : sport === 'bjj' ? 'badge-bjj' : 'badge-both'
  const label = sport === 'both' ? 'Both' : sport.toUpperCase()
  return <span className={`badge ${cls}`}>{label}</span>
}

const STATUS_OPTIONS = [
  { value: 'none', label: 'Not started', color: 'var(--muted)' },
  { value: 'aware', label: 'Aware', color: 'var(--gold)' },
  { value: 'drilling', label: 'Drilling', color: 'var(--blue)' },
  { value: 'owned', label: 'Owned', color: 'var(--green)' },
]

function getEmbedId(url) {
  if (!url) return null
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0]
  if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0]
  if (url.includes('/embed/')) return url.split('/embed/')[1].split('?')[0]
  return null
}

function YouTubeEmbed({ url }) {
  const id = getEmbedId(url)
  if (!id) {
    return (
      <div style={{ background: 'var(--bg2)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center', marginBottom: 12 }}>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--red)' }}>Watch on YouTube →</a>
      </div>
    )
  }
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', marginBottom: 12 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
        title="Technique video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  )
}

export default function TechniquePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, progress, updateProgress, isPremium } = useAuth()
  const [t, setT] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const { handleUpgrade, upgrading } = useUpgrade()

  // Notes state
  const [note, setNote] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const [noteSaving, setNoteSaving] = useState(false)
  const noteTimeout = useRef(null)

  useEffect(() => {
    getTechniqueById(parseInt(id)).then(async (technique) => {
      setT(technique)
      if (technique?.relatedNames?.length) {
        const all = await getTechniques()
        setRelated(technique.relatedNames.map(name => all.find(x => x.name === name)).filter(Boolean))
      }
      setLoading(false)
    })
  }, [id])

  // Load note when user + technique both ready
  useEffect(() => {
    if (!user || !id) return
    getTechniqueNote(user.id, parseInt(id)).then(n => setNote(n || ''))
  }, [user, id])

  const saveNote = async (value) => {
    if (!user) return
    setNoteSaving(true)
    await upsertTechniqueNote(user.id, parseInt(id), value)
    setNoteSaving(false)
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 1500)
  }

  // Auto-save note after 1.2s of no typing
  const handleNoteChange = (value) => {
    setNote(value)
    setNoteSaved(false)
    clearTimeout(noteTimeout.current)
    noteTimeout.current = setTimeout(() => saveNote(value), 1200)
  }

  const handleBack = () => {
    // Try to go back to the library at the exact position the user came from
    const saved = sessionStorage.getItem('grapplingos_library_state')
    if (saved) {
      navigate('/library')
    } else {
      navigate(-1)
    }
  }

  if (loading) return (
    <div className="container page">
      <button className="back-btn" onClick={handleBack}>← Back to library</button>
      <p style={{ color: 'var(--muted)' }}>Loading…</p>
    </div>
  )

  if (!t) return (
    <div className="container page">
      <button className="back-btn" onClick={handleBack}>← Back to library</button>
      <p style={{ color: 'var(--muted)' }}>Technique not found.</p>
    </div>
  )

  const p = progress[t.id] || 'none'
  // Only aware/drilling count as "on dashboard" (training). Owned is a separate module.
  const isInTraining = p === 'aware' || p === 'drilling'

  const handleStatus = async (val) => {
    if (!isPremium) { setShowUpgradeModal(true); return }
    updateProgress(t.id, val)
    if (user) await upsertProgress(user.id, t.id, val)
  }

  const handlePin = async () => {
    if (!isPremium) { setShowUpgradeModal(true); return }
    // Toggle: if currently in training, remove; otherwise add as 'aware'
    // Don't overwrite 'owned' status — owned has its own module
    const newStatus = isInTraining ? 'none' : 'aware'
    updateProgress(t.id, newStatus)
    if (user) await upsertProgress(user.id, t.id, newStatus)
  }

  return (
    <div className="container page">
      {showUpgradeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowUpgradeModal(false) }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 360, padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: 24, color: 'var(--gold)', marginBottom: 8 }}>✦</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '.04em', color: 'var(--white)', marginBottom: 8 }}>Premium required</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Upgrade to track progress, add techniques to your dashboard, and log personal notes.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button onClick={handleUpgrade} disabled={upgrading} className="btn btn-primary" style={{ minWidth: 150, opacity: upgrading ? 0.7 : 1 }}>
                {upgrading ? 'Redirecting…' : 'Upgrade to Premium'}
              </button>
              <button onClick={() => setShowUpgradeModal(false)} className="btn btn-ghost">Later</button>
            </div>
          </div>
        </div>
      )}
      <button className="back-btn" onClick={handleBack}>← Back to library</button>

      {/* Hero */}
      <div className="detail-hero" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 4 }}>{t.cat}</div>
            <h1 className="detail-name">{t.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {sportBadge(t.sport)}
              <div className="diff-pips">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className={`pip ${i <= t.diff ? 'on' : ''}`} />)}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Difficulty {t.diff}/5</span>
            </div>
          </div>
          <button className={`pin-btn ${isInTraining ? 'pinned' : ''}`} onClick={handlePin} style={{ flexShrink: 0 }}>
            {isInTraining ? '★ On dashboard' : '☆ Add to dashboard'}
          </button>
        </div>
        {t.long && <p className="detail-long">{t.long}</p>}
        {!t.long && <p className="detail-long">{t.desc}</p>}
      </div>

      {t.vid && <YouTubeEmbed url={t.vid} />}
      {!t.vid && (
        <div style={{ background: 'var(--bg2)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Video coming soon</div>
        </div>
      )}

      {t.ai && (
        <div className="ai-strip">
          <div className="ai-label">Coach insight</div>
          <div className="ai-text">{t.ai}</div>
        </div>
      )}

      {(t.setup || t.key || t.entries?.length || t.counters?.length) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {t.setup && <div className="info-card">
            <div className="info-title">Setup</div>
            <p className="info-text">{t.setup}</p>
          </div>}
          {t.key && <div className="info-card">
            <div className="info-title">Key principle</div>
            <p className="info-text">{t.key}</p>
          </div>}
          {t.entries?.length > 0 && <div className="info-card">
            <div className="info-title">Entries</div>
            <div className="tag-list">{t.entries.map((e, i) => <span key={i} className="tag">{e}</span>)}</div>
          </div>}
          {t.counters?.length > 0 && <div className="info-card">
            <div className="info-title">Counters</div>
            <div className="tag-list">{t.counters.map((c, i) => <span key={i} className="tag">{c}</span>)}</div>
          </div>}
        </div>
      )}

      {related.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div className="section-label">Related techniques</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {related.map(r => (
              <div key={r.id} onClick={() => navigate(`/technique/${r.id}`)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '8px 14px', cursor: 'pointer',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: '.04em', color: 'var(--white)',
                transition: 'border-color .15s'
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--red)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {r.name} {sportBadge(r.sport)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress tracker */}
      <div className="progress-row" style={{ marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 6 }}>
            Track your progress on this technique:
          </div>
          {isInTraining && isPremium && <div style={{ fontSize: 11, color: 'var(--gold)' }}>★ Showing on your dashboard</div>}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATUS_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => handleStatus(opt.value)} style={{
              padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 500,
              cursor: 'pointer', border: '1px solid',
              fontFamily: "'DM Sans', sans-serif", transition: 'all .15s',
              borderColor: p === opt.value ? opt.color : 'var(--border)',
              background: p === opt.value ? `${opt.color}22` : 'transparent',
              color: p === opt.value ? opt.color : 'var(--muted)',
            }}>
              {p === opt.value ? '✓ ' : ''}{opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Personal notes */}
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', fontWeight: 600 }}>Personal notes</div>
          {isPremium && (
            <div style={{ fontSize: 11, color: noteSaved ? 'var(--green)' : noteSaving ? 'var(--muted)' : 'transparent', transition: 'color .3s' }}>
              {noteSaved ? '✓ Saved' : noteSaving ? 'Saving…' : '.'}
            </div>
          )}
        </div>
        {isPremium ? (
          <textarea
            value={note}
            onChange={e => handleNoteChange(e.target.value)}
            placeholder="Add private notes about this technique — drills, tips, when it clicks for you…"
            className="dash-textarea"
            style={{ minHeight: 90, marginBottom: 0 }}
          />
        ) : (
          <UpgradeStrip feature="Personal notes" />
        )}
      </div>
    </div>
  )
}
