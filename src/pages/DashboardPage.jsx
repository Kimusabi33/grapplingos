import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import {
  getTechniques,
  getVisibilityPrefs, upsertVisibilityPrefs,
  getCompetitions, addCompetition, deleteCompetition, addMatch, deleteMatch,
  getPlannedSessions, addPlannedSession, updateSessionCompletion, deletePlannedSession,
  updatePlannedSessionNotes,
  submitFeedback,
} from '../lib/supabase'
import { useUpgrade, useManageBilling } from '../lib/premium'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SESSION_TYPES = ['Judo — randori', 'Judo — drilling', 'Judo — kata', 'BJJ — live rolling', 'BJJ — drilling', 'Open mat', 'Competition']
const DURATIONS = ['30 min', '45 min', '60 min', '90 min', '2 hr']
const FOCUSES = ['Throws — randori', 'Groundwork — newaza', 'Foot sweeps', 'Hip throws', 'Guard work', 'Submissions', 'Open drilling']
const BELTS_GI = ['White', 'Blue', 'Purple', 'Brown', 'Black']
const BELTS_JUDO = ['White (6th kyu)', 'Yellow (5th kyu)', 'Orange (4th kyu)', 'Green (3rd kyu)', 'Blue (2nd kyu)', 'Brown (1st kyu)', 'Black (1st dan)', 'Black (2nd dan)', 'Black (3rd dan+)']
const BELT_COLORS_BJJ = { White: '#d0cdc6', Blue: '#4a8fd4', Purple: '#7f77dd', Brown: '#8B5E3C', Black: '#f5f3ef' }
const BELT_COLORS_JUDO = { 'White (6th kyu)': '#d0cdc6', 'Yellow (5th kyu)': '#c9a84c', 'Orange (4th kyu)': '#D85A30', 'Green (3rd kyu)': '#4a9a5a', 'Blue (2nd kyu)': '#4a8fd4', 'Brown (1st kyu)': '#8B5E3C', 'Black (1st dan)': '#f5f3ef', 'Black (2nd dan)': '#f5f3ef', 'Black (3rd dan+)': '#f5f3ef' }
const IBJJF_WEIGHT = {
  Male: ['Rooster (57.5kg / 127lb)', 'Light Feather (64kg / 141lb)', 'Feather (70kg / 154.5lb)', 'Light (76kg / 167.5lb)', 'Middle (82.3kg / 181.5lb)', 'Medium Heavy (88.3kg / 194.5lb)', 'Heavy (94.3kg / 207.5lb)', 'Super Heavy (100.5kg / 221.5lb)', 'Ultra Heavy (100.5kg+ / 221.5lb+)'],
  Female: ['Light Feather (48.5kg / 107lb)', 'Feather (53.5kg / 118lb)', 'Light (58.5kg / 129lb)', 'Middle (64kg / 141lb)', 'Medium Heavy (69kg / 152lb)', 'Heavy (74kg / 163lb)', 'Super Heavy (74kg+ / 163lb+)']
}
const IBJJF_AGE = ['Juvenile 1 (15-16)', 'Juvenile 2 (16-17)', 'Adult (18-29)', 'Master 1 (30+)', 'Master 2 (36+)', 'Master 3 (41+)', 'Master 4 (46+)', 'Master 5 (51+)', 'Master 6 (56+)', 'Master 7 (61+)']
const JUDO_WEIGHT_M = ['-60kg / 132lb', '-66kg / 145lb', '-73kg / 161lb', '-81kg / 179lb', '-90kg / 198lb', '-100kg / 220lb', '+100kg / 220lb+']
const JUDO_WEIGHT_F = ['-48kg / 106lb', '-52kg / 115lb', '-57kg / 126lb', '-63kg / 139lb', '-70kg / 154lb', '-78kg / 172lb', '+78kg / 172lb+']
const DEFAULT_PROFILE = { name: '', school: '', style: 'Both', bjjBelt: 'White', judoBelt: 'White (6th kyu)', years: '', age: '', gender: 'Male', weightClassBJJ: '', weightClassJudo: '', ageDiv: 'Adult (18-29)', goals: '' }
const DEFAULT_VISIBILITY = { username: true, school: true, belt: true, weightClass: true, ageClass: true }
const MEDAL_COLORS = { gold: 'var(--gold)', silver: '#a0a0a8', bronze: '#c8793c', none: 'var(--muted)' }
const MEDAL_LABELS = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze', none: 'None' }

const load = (key, fallback) => {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback } catch { return fallback }
}
const save = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

// ── Eye Icon (only used inside edit form) ─────────────────────────────────────
function EyeToggle({ open, onClick }) {
  return (
    <button onClick={onClick} title={open ? 'Hide from header' : 'Show in header'} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: '0 3px', lineHeight: 1,
      color: open ? 'var(--muted2)' : 'rgba(255,255,255,0.15)', flexShrink: 0, display: 'inline-flex'
    }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {open ? (
          <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </>
        ) : (
          <>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </>
        )}
      </svg>
    </button>
  )
}

// ── Ring ──────────────────────────────────────────────────────────────────────
function Ring({ pct, color, size = 82, stroke = 7, label, value }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.min(100, Math.max(0, pct)) / 100) * circ
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset .6s ease' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size * 0.22, color: 'var(--white)', lineHeight: 1 }}>{value}</span>
          <span style={{ fontSize: size * 0.1, color: 'var(--muted)', textTransform: 'uppercase' }}>{Math.round(pct)}%</span>
        </div>
      </div>
      <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: 5 }}>{label}</span>
    </div>
  )
}

// ── Planned session card (shared between Schedule tab and DayModal) ────────────
function PlannedSessionCard({ s, expanded, onToggleExpand, onToggleCompletion, onDelete, onNoteChange, noteValue }) {
  return (
    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 6, border: '1px solid var(--border)', borderLeft: `2px solid ${s.completed ? 'var(--green)' : 'var(--gold)'}` }}>
      {/* Header row — clickable to expand notes */}
      <div
        onClick={onToggleExpand}
        style={{ padding: '10px 12px', background: 'var(--bg3)', display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--white)' }}>{s.planned_date}</span>
            {s.planned_time && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{s.planned_time}</span>}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--muted2)' }}>{s.focus}</span>
            {s.notes && !expanded && (
              <span style={{ fontSize: 10, color: 'var(--muted)', fontStyle: 'italic' }}>· has notes</span>
            )}
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onToggleCompletion(s.id, !s.completed) }}
          style={{
            fontSize: 11, padding: '3px 10px', borderRadius: 99, border: '1px solid', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all .15s', flexShrink: 0,
            background: s.completed ? 'rgba(61,186,111,0.15)' : 'transparent',
            borderColor: s.completed ? 'rgba(61,186,111,0.4)' : 'var(--border)',
            color: s.completed ? 'var(--green)' : 'var(--muted)'
          }}
        >
          {s.completed ? '✓' : 'Complete'}
        </button>
        <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
        <button
          onClick={e => { e.stopPropagation(); onDelete(s.id) }}
          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 15, lineHeight: 1, flexShrink: 0, padding: '0 2px' }}
        >✕</button>
      </div>

      {/* Expanded notes section */}
      {expanded && (
        <div style={{ background: 'var(--bg2)', padding: '10px 12px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 6 }}>Session notes</div>
          <textarea
            value={noteValue}
            onChange={e => onNoteChange(s.id, e.target.value)}
            placeholder="What did you work on? Goals, observations, wins, struggles…"
            className="dash-textarea"
            style={{ minHeight: 70, marginBottom: 0 }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

// ── DayModal ──────────────────────────────────────────────────────────────────
function DayModal({ day, sessions, plannedForDay, onClose, onPlanSession, onDeleteSession, onDeleteDay, onToggleCompletion, onDeletePlanned, onUpdateNote }) {
  // day is a full date string "YYYY-MM-DD"
  const [yy, mm, dd] = day.split('-').map(Number)
  const dateLabel = new Date(yy, mm - 1, dd).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })

  const [planTime, setPlanTime] = useState('')
  const [planFocus, setPlanFocus] = useState(FOCUSES[0])
  const [planNotes, setPlanNotes] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [localNotes, setLocalNotes] = useState(() => {
    const m = {}
    plannedForDay.forEach(s => { m[s.id] = s.notes || '' })
    return m
  })
  const noteTimeouts = useRef({})
  const existing = sessions[day] || []

  const handlePlan = () => {
    onPlanSession(day, planTime, planFocus, planNotes)
    setPlanTime('')
    setPlanFocus(FOCUSES[0])
    setPlanNotes('')
  }

  const handleNoteChange = (id, val) => {
    setLocalNotes(prev => ({ ...prev, [id]: val }))
    clearTimeout(noteTimeouts.current[id])
    noteTimeouts.current[id] = setTimeout(() => onUpdateNote(id, val), 1000)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', width: '100%', maxWidth: 600, padding: '1.5rem', maxHeight: '85vh', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '.04em', color: 'var(--white)' }}>{dateLabel}</div>
            <div style={{ fontSize: 12, color: plannedForDay.length > 0 ? 'var(--gold)' : 'var(--muted)' }}>
              {plannedForDay.length > 0 ? `${plannedForDay.length} planned` : 'No sessions planned yet'}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>✕</button>
        </div>

        {/* Plan a session form — same fields as Schedule tab, date pre-filled */}
        <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: plannedForDay.length > 0 ? 16 : 0 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', marginBottom: 12, fontWeight: 600 }}>Plan a session</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            <div>
              <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Date</label>
              <input type="date" value={day} readOnly className="dash-input" style={{ width: '100%', opacity: 0.6, cursor: 'default' }} />
            </div>
            <div>
              <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Time (optional)</label>
              <input type="time" value={planTime} onChange={e => setPlanTime(e.target.value)} className="dash-input" style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Focus</label>
            <select value={planFocus} onChange={e => setPlanFocus(e.target.value)} className="dash-select">
              {FOCUSES.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Notes (optional)</label>
            <textarea
              value={planNotes}
              onChange={e => setPlanNotes(e.target.value)}
              placeholder="Goals, techniques to drill, things to focus on…"
              className="dash-textarea"
              style={{ minHeight: 70, marginBottom: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handlePlan} className="btn btn-primary btn-sm">Plan session</button>
            <button onClick={onClose} className="btn btn-ghost btn-sm">Close</button>
          </div>
        </div>

        {/* Existing planned sessions for this day */}
        {plannedForDay.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 }}>Planned sessions — tap to expand</div>
            {plannedForDay.map(s => (
              <PlannedSessionCard
                key={s.id} s={s}
                expanded={expandedId === s.id}
                onToggleExpand={() => setExpandedId(id => id === s.id ? null : s.id)}
                onToggleCompletion={onToggleCompletion}
                onDelete={onDeletePlanned}
                onNoteChange={handleNoteChange}
                noteValue={localNotes[s.id] ?? (s.notes || '')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Calendar block (shared between Overview and Schedule) ─────────────────────
function CalendarBlock({ calSessions, plannedSessions, onDayClick, totalSessions }) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1) // 1-12

  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay() // 0=Sun
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const monthLabel = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' })

  const prevMonth = () => { if (month === 1) { setYear(y => y - 1); setMonth(12) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 12) { setYear(y => y + 1); setMonth(1) } else setMonth(m => m + 1) }

  const getColor = (dateStr) => {
    const planned = plannedSessions.filter(s => s.planned_date === dateStr)
    const hasLogged = calSessions[dateStr]?.length > 0
    const hasCompleted = planned.some(s => s.completed)
    const hasIncomplete = planned.some(s => !s.completed)
    if (hasLogged || hasCompleted) return 'var(--green)'
    if (hasIncomplete) return 'rgba(201,168,76,0.45)'
    return 'var(--bg3)'
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16, padding: '0 6px', lineHeight: 1 }}>‹</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="section-label" style={{ margin: 0 }}>{monthLabel}</div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{totalSessions} sessions</span>
        </div>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16, padding: '0 6px', lineHeight: 1 }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: 3, marginBottom: 4 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', paddingBottom: 2 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: 3 }}>
        {[...Array(firstDayOfWeek)].map((_, i) => <div key={'b' + i} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const d = i + 1
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
          const bg = getColor(dateStr)
          const count = (calSessions[dateStr]?.length || 0) + plannedSessions.filter(s => s.planned_date === dateStr).length
          const isToday = dateStr === todayStr
          return (
            <div key={d} onClick={() => onDayClick(dateStr)} style={{
              borderRadius: 6, cursor: 'pointer', transition: 'all .1s',
              background: bg,
              border: isToday ? '1.5px solid var(--gold)' : '1px solid transparent',
              padding: '4px 2px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', minHeight: 36,
            }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: bg !== 'var(--bg3)' ? 'white' : 'var(--muted)', lineHeight: 1 }}>{d}</span>
              {count > 0 && <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{count > 1 ? `${count}x` : '✓'}</span>}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--green)' }} /><span style={{ fontSize: 10, color: 'var(--muted)' }}>Completed</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(201,168,76,0.45)' }} /><span style={{ fontSize: 10, color: 'var(--muted)' }}>Planned</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--bg3)' }} /><span style={{ fontSize: 10, color: 'var(--muted)' }}>Rest</span></div>
      </div>
    </div>
  )
}

// ── Premium save modal — shown when free user tries to write data ─────────────
function PremiumSaveModal({ onClose }) {
  const { handleUpgrade, upgrading } = useUpgrade()
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 360, padding: '1.75rem', textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: 'var(--gold)', marginBottom: 8 }}>✦</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '.04em', color: 'var(--white)', marginBottom: 8 }}>Premium required</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>
          Saving data requires a Premium subscription. Upgrade to track progress, log sessions, plan competitions, and more.
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button onClick={handleUpgrade} disabled={upgrading} className="btn btn-primary" style={{ minWidth: 150, opacity: upgrading ? 0.7 : 1 }}>
            {upgrading ? 'Redirecting…' : 'Upgrade to Premium'}
          </button>
          <button onClick={onClose} className="btn btn-ghost">Later</button>
        </div>
      </div>
    </div>
  )
}

// ── Feedback modal ────────────────────────────────────────────────────────────
function FeedbackModal({ user, onClose }) {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle') // idle | saving | done | error

  const handleSubmit = async () => {
    if (!text.trim()) return
    setStatus('saving')
    const { error } = await submitFeedback(user?.id || null, text.trim())
    if (error) { setStatus('error'); return }
    setStatus('done')
    setTimeout(onClose, 1500)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 400, padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '.04em', color: 'var(--white)' }}>Send feedback</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 4px' }}>✕</button>
        </div>
        {status === 'done' ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--green)', fontSize: 14 }}>✓ Thanks for your feedback!</div>
        ) : (
          <>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="What's on your mind? Bugs, ideas, anything…"
              className="dash-textarea"
              style={{ minHeight: 110, marginBottom: 12 }}
              autoFocus
            />
            {status === 'error' && <div style={{ fontSize: 12, color: 'var(--red)', marginBottom: 8 }}>Something went wrong — please try again.</div>}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={onClose} className="btn btn-ghost">Cancel</button>
              <button onClick={handleSubmit} disabled={!text.trim() || status === 'saving'} className="btn btn-primary" style={{ opacity: status === 'saving' ? 0.7 : 1 }}>
                {status === 'saving' ? 'Sending…' : 'Send'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, progress, isPremium, subscription, subscriptionLoading } = useAuth()
  const { openPortal, loading: portalLoading } = useManageBilling()
  const navigate = useNavigate()

  // existing state
  const [tab, setTab] = useState('home')
  const [trainedDays, setTrainedDays] = useState(() => load('grapplingos_trainedDays', [0, 2, 4]))
  const [calSessions, setCalSessions] = useState(() => load('grapplingos_calSessions', {}))
  const [selectedDay, setSelectedDay] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [profile, setProfile] = useState(() => load('grapplingos_profile', DEFAULT_PROFILE))

  // new state
  const [visibility, setVisibility] = useState(DEFAULT_VISIBILITY)
  const [plannedSessions, setPlannedSessions] = useState([])
  const [sessionForm, setSessionForm] = useState({ planned_date: '', planned_time: '', focus: FOCUSES[0] })
  const [addingSession, setAddingSession] = useState(false)
  const [expandedSessionId, setExpandedSessionId] = useState(null)
  const [sessionNotes, setSessionNotes] = useState({})
  const [competitions, setCompetitions] = useState([])
  const [expandedComp, setExpandedComp] = useState(null)
  const [compForm, setCompForm] = useState({ name: '', date: '' })
  const [matchForm, setMatchForm] = useState({ result: 'win', medal: 'none', match_count: 1 })
  const [addingMatch, setAddingMatch] = useState(null)
  const [allTechniques, setAllTechniques] = useState([])
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showOwnedModal, setShowOwnedModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const visTimeout = useRef(null)
  const noteTimeouts = useRef({})

  // persist localStorage
  useEffect(() => { save('grapplingos_calSessions', calSessions) }, [calSessions])
  useEffect(() => { save('grapplingos_trainedDays', trainedDays) }, [trainedDays])

  // load techniques from Supabase so IDs match progress keys
  useEffect(() => { getTechniques().then(setAllTechniques) }, [])

  // load from Supabase
  useEffect(() => {
    if (!user) return
    getVisibilityPrefs(user.id).then(v => setVisibility(v))
    getPlannedSessions(user.id).then(sessions => {
      setPlannedSessions(sessions)
      const notes = {}
      sessions.forEach(s => { notes[s.id] = s.notes || '' })
      setSessionNotes(notes)
    })
    getCompetitions(user.id).then(c => setCompetitions(c))
  }, [user])

  // derived
  const aware = Object.values(progress).filter(v => v === 'aware').length
  const drilling = Object.values(progress).filter(v => v === 'drilling').length
  const owned = Object.values(progress).filter(v => v === 'owned').length
  const total = 86
  const completedPlanned = plannedSessions.filter(s => s.completed).length
  const totalSessions = Object.values(calSessions).reduce((a, b) => a + b.length, 0) + completedPlanned
  const streak = Math.min(7, Math.floor(totalSessions / 2))
  const currentlyTrainingTechs = allTechniques.filter(t => progress[t.id] === 'aware' || progress[t.id] === 'drilling')
  const ownedTechs = allTechniques.filter(t => progress[t.id] === 'owned')
  const statusColor = { aware: 'var(--gold)', drilling: 'var(--blue)', owned: 'var(--green)', none: 'var(--muted)' }
  const currentBeltColor = profile.style === 'Judo' ? (BELT_COLORS_JUDO[profile.judoBelt] || '#888') : (BELT_COLORS_BJJ[profile.bjjBelt] || '#888')
  const currentBelt = profile.style === 'Judo' ? profile.judoBelt : profile.bjjBelt
  const weightDisplay = profile.style === 'Judo' ? profile.weightClassJudo : profile.weightClassBJJ

  const plannedForDay = selectedDay
    ? plannedSessions.filter(s => s.planned_date === selectedDay && !s.completed)
    : []

  // handlers
  const toggleDay = (i) => setTrainedDays(prev => prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i])

  const saveSession = (day, session) => {
    if (!isPremium) { setShowSaveModal(true); return }
    setCalSessions(prev => ({ ...prev, [day]: [...(prev[day] || []), session] }))
  }
  const deleteSession = (day, index) => {
    setCalSessions(prev => {
      const updated = (prev[day] || []).filter((_, i) => i !== index)
      if (updated.length === 0) { const next = { ...prev }; delete next[day]; return next }
      return { ...prev, [day]: updated }
    })
  }
  const deleteDay = (day) => {
    setCalSessions(prev => { const next = { ...prev }; delete next[day]; return next })
  }

  const saveProfile = () => {
    save('grapplingos_profile', profile)
    setProfileSaved(true)
    setTimeout(() => { setProfileSaved(false); setProfileOpen(false) }, 1200)
  }

  const toggleVisibility = (field) => {
    const next = { ...visibility, [field]: !visibility[field] }
    setVisibility(next)
    if (user) {
      clearTimeout(visTimeout.current)
      visTimeout.current = setTimeout(() => upsertVisibilityPrefs(user.id, next), 600)
    }
  }

  // planned sessions
  const handleAddSession = async () => {
    if (!sessionForm.planned_date) return
    if (!isPremium) { setShowSaveModal(true); return }
    if (user) {
      const { data } = await addPlannedSession(user.id, { ...sessionForm, notes: '' })
      if (data) {
        setPlannedSessions(s => [...s, data])
        setSessionNotes(n => ({ ...n, [data.id]: '' }))
      }
    }
    setSessionForm({ planned_date: '', planned_time: '', focus: FOCUSES[0] })
    setAddingSession(false)
  }

  const handleAddSessionFromCalendar = async (planned_date, planned_time, focus, notes) => {
    if (!isPremium) { setShowSaveModal(true); return }
    if (!user) return
    const { data } = await addPlannedSession(user.id, { planned_date, planned_time, focus, notes: notes || '' })
    if (data) {
      setPlannedSessions(s => [...s, data])
      setSessionNotes(n => ({ ...n, [data.id]: notes || '' }))
    }
  }

  const handleToggleCompletion = async (id, completed) => {
    if (!isPremium) { setShowSaveModal(true); return }
    await updateSessionCompletion(id, completed)
    setPlannedSessions(s => s.map(x => x.id === id ? { ...x, completed } : x))
  }

  const handleDeletePlanned = async (id) => {
    if (!isPremium) { setShowSaveModal(true); return }
    await deletePlannedSession(id)
    setPlannedSessions(s => s.filter(x => x.id !== id))
    setSessionNotes(n => { const next = { ...n }; delete next[id]; return next })
  }

  const handleSessionNoteChange = (id, value) => {
    if (!isPremium) { setShowSaveModal(true); return }
    setSessionNotes(prev => ({ ...prev, [id]: value }))
    // Also update local plannedSessions so "has notes" hint works
    setPlannedSessions(s => s.map(x => x.id === id ? { ...x, notes: value } : x))
    clearTimeout(noteTimeouts.current[id])
    noteTimeouts.current[id] = setTimeout(() => updatePlannedSessionNotes(id, value), 1000)
  }

  // competitions
  const handleAddCompetition = async () => {
    if (!compForm.name.trim() || !user) return
    if (!isPremium) { setShowSaveModal(true); return }
    const { data } = await addCompetition(user.id, compForm.name.trim(), compForm.date || null)
    if (data) {
      setCompetitions(c => [{ ...data, competition_matches: [] }, ...c])
      setExpandedComp(data.id)
    }
    setCompForm({ name: '', date: '' })
  }

  const handleDeleteCompetition = async (id) => {
    if (!isPremium) { setShowSaveModal(true); return }
    await deleteCompetition(id)
    setCompetitions(c => c.filter(x => x.id !== id))
    if (expandedComp === id) setExpandedComp(null)
  }

  const handleAddMatch = async (compId) => {
    if (!user) return
    if (!isPremium) { setShowSaveModal(true); return }
    const { data } = await addMatch(user.id, compId, { ...matchForm, match_count: Number(matchForm.match_count) })
    if (data) {
      setCompetitions(c => c.map(x => x.id === compId ? { ...x, competition_matches: [...(x.competition_matches || []), data] } : x))
    }
    setMatchForm({ result: 'win', medal: 'none', match_count: 1 })
    setAddingMatch(null)
  }

  const handleDeleteMatch = async (compId, matchId) => {
    if (!isPremium) { setShowSaveModal(true); return }
    await deleteMatch(matchId)
    setCompetitions(c => c.map(x => x.id === compId ? { ...x, competition_matches: x.competition_matches.filter(m => m.id !== matchId) } : x))
  }

  // tabs
  const TABS = [
    { id: 'home', label: 'Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'log', label: 'Logs' },
    { id: 'comp', label: 'Competitions' },
  ]
  const tabStyle = (t) => ({
    padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: 'pointer',
    border: '1px solid', fontFamily: "'DM Sans', sans-serif", transition: 'all .15s',
    borderColor: tab === t ? 'var(--white)' : 'var(--border)',
    background: tab === t ? 'var(--white)' : 'transparent',
    color: tab === t ? '#111' : 'var(--muted)',
  })

  // form helpers (for profile edit)
  const fl = (label, content, visField) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)' }}>{label}</label>
        {visField && (
          <>
            <EyeToggle open={visibility[visField]} onClick={() => toggleVisibility(visField)} />
            <span style={{ fontSize: 9, color: visibility[visField] ? 'var(--muted)' : 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {visibility[visField] ? 'shown' : 'hidden'}
            </span>
          </>
        )}
      </div>
      {content}
    </div>
  )
  const inp = (field, placeholder, type = 'text', extra = {}) => (
    <input value={profile[field]} onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
      placeholder={placeholder} type={type} className="dash-input" style={{ width: '100%' }} {...extra} />
  )
  const sel = (field, options) => (
    <select value={profile[field]} onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))} className="dash-select">
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  )

  return (
    <div className="container page">
      {showSaveModal && <PremiumSaveModal onClose={() => setShowSaveModal(false)} />}

      {/* Owned techniques modal */}
      {showOwnedModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) setShowOwnedModal(false) }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 480, padding: '1.5rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '.04em', color: 'var(--white)' }}>Owned techniques</div>
                <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 2 }}>{ownedTechs.length} technique{ownedTechs.length !== 1 ? 's' : ''} mastered</div>
              </div>
              <button onClick={() => setShowOwnedModal(false)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 4px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {ownedTechs.map(t => (
                <div key={t.id} onClick={() => { setShowOwnedModal(false); navigate(`/technique/${t.id}`) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color .15s' }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--green)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: '.04em', color: 'var(--white)', flex: 1 }}>{t.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{t.cat}</span>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', padding: '2px 7px', borderRadius: 99, border: '1px solid', borderColor: t.sport === 'judo' ? 'var(--gold)' : t.sport === 'bjj' ? 'var(--blue)' : 'var(--border)', color: t.sport === 'judo' ? 'var(--gold)' : t.sport === 'bjj' ? 'var(--blue)' : 'var(--muted2)' }}>{t.sport === 'both' ? 'Both' : t.sport.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedback modal */}
      {showFeedbackModal && <FeedbackModal user={user} onClose={() => setShowFeedbackModal(false)} />}
      {selectedDay && (
        <DayModal
          day={selectedDay} sessions={calSessions} plannedForDay={plannedForDay}
          onClose={() => setSelectedDay(null)}
          onPlanSession={handleAddSessionFromCalendar}
          onDeleteSession={deleteSession} onDeleteDay={deleteDay}
          onToggleCompletion={handleToggleCompletion}
          onDeletePlanned={handleDeletePlanned}
          onUpdateNote={handleSessionNoteChange}
        />
      )}

      {!user && (
        <div style={{ background: 'rgba(200,55,45,0.1)', border: '1px solid rgba(200,55,45,0.3)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted2)' }}><strong style={{ color: 'var(--white)' }}>Browsing as guest</strong> — progress won't save</span>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/auth')}>Sign up free</button>
        </div>
      )}

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={tabStyle(t.id)}>{t.label}</button>)}
        <button onClick={() => navigate('/library')} style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: '1px solid var(--red)', background: 'var(--red)', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>Library →</button>
      </div>

      {/* ═══ OVERVIEW TAB ═══ */}
      {tab === 'home' && (<>

        {/* Profile header — no eye icons here, only visible fields shown */}
        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, background: currentBeltColor, border: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: currentBeltColor === '#f5f3ef' ? '#111' : 'rgba(0,0,0,0.4)' }}>
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'G'}
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Username */}
              {visibility.username && (
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--white)', marginBottom: 4 }}>
                  {profile.name || 'Set up your profile'}
                </div>
              )}
              {/* Field row — only show visible fields, no toggles */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--muted2)' }}>
                {visibility.school && profile.school && <span>{profile.school}</span>}
                {visibility.school && profile.school && visibility.belt && <span style={{ color: 'var(--bg4)' }}>·</span>}
                {visibility.belt && <span>{currentBelt}</span>}
                {visibility.weightClass && weightDisplay && <><span style={{ color: 'var(--bg4)' }}>·</span><span>{weightDisplay}</span></>}
                {visibility.ageClass && profile.ageDiv && <><span style={{ color: 'var(--bg4)' }}>·</span><span>{profile.ageDiv}</span></>}
                {!visibility.username && !visibility.school && !visibility.belt && !visibility.weightClass && !visibility.ageClass && (
                  <span style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: 11 }}>All fields hidden — edit to show</span>
                )}
              </div>
            </div>

            <button onClick={() => setProfileOpen(o => !o)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '5px 12px', fontSize: 12, color: 'var(--muted2)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
              {profileOpen ? 'Close' : 'Edit'}
            </button>
          </div>

          {/* Edit form — eye toggles appear here next to each field label */}
          {profileOpen && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)' }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
                Toggle the eye icons to show or hide each field in your header
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {fl('Full name', inp('name', 'Your name'), 'username')}
                  {fl('School / Dojo', inp('school', 'Club or dojo name'), 'school')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  {fl('Style', sel('style', ['Both', 'BJJ', 'Judo']))}
                  {fl('Years training', inp('years', 'e.g. 3', 'number', { min: 0, max: 50 }))}
                  {fl('Age', inp('age', 'e.g. 28', 'number', { min: 10, max: 80 }))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {(profile.style === 'Both' || profile.style === 'BJJ') && fl('BJJ belt', sel('bjjBelt', BELTS_GI), 'belt')}
                  {(profile.style === 'Both' || profile.style === 'Judo') && fl('Judo belt', sel('judoBelt', BELTS_JUDO), 'belt')}
                </div>
                <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', marginBottom: 10, fontWeight: 600 }}>Competition info</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                    {fl('Gender', sel('gender', ['Male', 'Female']))}
                    {fl('Age division (IBJJF)', sel('ageDiv', IBJJF_AGE), 'ageClass')}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {(profile.style === 'Both' || profile.style === 'BJJ') && fl('BJJ weight (IBJJF)',
                      <select value={profile.weightClassBJJ} onChange={e => setProfile(p => ({ ...p, weightClassBJJ: e.target.value }))} className="dash-select">
                        <option value="">Select weight</option>
                        {(IBJJF_WEIGHT[profile.gender] || IBJJF_WEIGHT.Male).map(w => <option key={w}>{w}</option>)}
                      </select>, 'weightClass'
                    )}
                    {(profile.style === 'Both' || profile.style === 'Judo') && fl('Judo weight (IJF)',
                      <select value={profile.weightClassJudo} onChange={e => setProfile(p => ({ ...p, weightClassJudo: e.target.value }))} className="dash-select">
                        <option value="">Select weight</option>
                        {(profile.gender === 'Female' ? JUDO_WEIGHT_F : JUDO_WEIGHT_M).map(w => <option key={w}>{w}</option>)}
                      </select>, 'weightClass'
                    )}
                  </div>
                </div>
                {fl('Goals', <textarea value={profile.goals} onChange={e => setProfile(p => ({ ...p, goals: e.target.value }))} placeholder="Competition goals, belt promotion targets..." className="dash-textarea" style={{ minHeight: 70 }} />)}
                <button onClick={saveProfile} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  {profileSaved ? '✓ Saved' : 'Save profile'}
                </button>

                {/* Subscription status in profile edit */}
                {user && (
                  <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', marginBottom: 3 }}>Subscription</div>
                      {subscriptionLoading ? (
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>Loading…</div>
                      ) : subscription ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em',
                            color: isPremium ? 'var(--green)' : subscription.status === 'past_due' ? 'var(--gold)' : 'var(--muted)',
                          }}>
                            {subscription.status === 'active' ? '✓ Active' : subscription.status === 'trialing' ? '✓ Trial' : subscription.status === 'past_due' ? '⚠ Past due' : subscription.status === 'canceled' ? 'Canceled' : subscription.status}
                          </span>
                          {subscription.current_period_end && (
                            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                              · {isPremium ? 'Renews' : 'Ends'} {new Date(subscription.current_period_end).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>No active subscription</div>
                      )}
                    </div>
                    {isPremium && (
                      <button
                        onClick={openPortal}
                        disabled={portalLoading}
                        style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '5px 12px', fontSize: 11, color: 'var(--muted2)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: portalLoading ? 0.6 : 1 }}
                      >
                        {portalLoading ? '…' : 'Manage billing →'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Currently training (aware + drilling only) */}
          <div className="card" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div className="section-label" style={{ margin: 0 }}>Currently training</div>
              <button onClick={() => navigate('/library')} style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--red)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>+ Add from library</button>
            </div>
            {currentlyTrainingTechs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--muted)', fontSize: 13 }}>
                No techniques in training.{' '}
                <button onClick={() => navigate('/library')} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Browse library →</button>
              </div>
            ) : (
              <div className="pinned-list">
                {currentlyTrainingTechs.map(t => (
                  <div key={t.id} className="pinned-chip" onClick={() => navigate(`/technique/${t.id}`)}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[progress[t.id]] || 'var(--muted)', flexShrink: 0 }} />
                    <span className="pinned-chip-name">{t.name}</span>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: statusColor[progress[t.id]] }}>{progress[t.id]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress rings */}
          <div className="card" style={{ marginBottom: 10 }}>
            <div className="section-label">Technique progress</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 0 8px' }}>
              <Ring pct={(aware / total) * 100} color="var(--gold)" label="Aware" value={aware} />
              <Ring pct={(drilling / total) * 100} color="var(--blue)" label="Drilling" value={drilling} />
              <div onClick={() => owned > 0 && setShowOwnedModal(true)} style={{ cursor: owned > 0 ? 'pointer' : 'default' }} title={owned > 0 ? 'View owned techniques' : ''}>
                <Ring pct={(owned / total) * 100} color="var(--green)" label="Owned ↗" value={owned} />
              </div>
              <Ring pct={((aware + drilling + owned) / total) * 100} color="var(--purple)" label="Total" value={aware + drilling + owned} />
            </div>
          </div>

          {/* Stats row */}
          <div className="stats-row" style={{ marginBottom: 10 }}>
            <div className="stat-box"><div className="stat-big gold">{streak}</div><div className="stat-label">Week streak</div></div>
            <div className="stat-box" onClick={() => setTab('log')} style={{ cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--border2)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div className="stat-big" style={{ color: 'var(--white)' }}>{totalSessions}</div>
              <div className="stat-label">Sessions ↗</div>
            </div>
            <div className="stat-box"><div className="stat-big green">{owned}</div><div className="stat-label">Owned</div></div>
          </div>

          {/* Calendar */}
          <CalendarBlock calSessions={calSessions} plannedSessions={plannedSessions} onDayClick={setSelectedDay} totalSessions={totalSessions} />
      </>)}

      {/* ═══ SCHEDULE TAB ═══ */}
      {tab === 'schedule' && (<>
        <div className="card" style={{ marginBottom: 10 }}>
          <div className="section-label">Training days this week</div>
          <div className="week-row">
            {DAYS.map((d, i) => (
              <button key={d} onClick={() => toggleDay(i)} className={`week-day ${trainedDays.includes(i) ? 'active' : ''}`}>{d}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>{trainedDays.length} training day{trainedDays.length !== 1 ? 's' : ''} per week</div>
        </div>

        {/* Weekly Sessions planner (replaces Focus by Day) */}
        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div className="section-label" style={{ margin: 0 }}>Planned sessions</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Tap a session to add notes</div>
            </div>
            {user && (
              <button onClick={() => setAddingSession(a => !a)} className="btn btn-outline btn-sm">
                {addingSession ? 'Cancel' : '+ Plan session'}
              </button>
            )}
          </div>

          {/* Add session form */}
          {addingSession && (
            <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div>
                  <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Date</label>
                  <input type="date" value={sessionForm.planned_date} onChange={e => setSessionForm(f => ({ ...f, planned_date: e.target.value }))} className="dash-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Time (optional)</label>
                  <input type="time" value={sessionForm.planned_time} onChange={e => setSessionForm(f => ({ ...f, planned_time: e.target.value }))} className="dash-input" style={{ width: '100%' }} />
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Focus</label>
                <select value={sessionForm.focus} onChange={e => setSessionForm(f => ({ ...f, focus: e.target.value }))} className="dash-select">
                  {FOCUSES.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <button onClick={handleAddSession} disabled={!sessionForm.planned_date} className="btn btn-primary btn-sm" style={{ opacity: sessionForm.planned_date ? 1 : 0.5 }}>
                Add to calendar
              </button>
            </div>
          )}

          {!user && <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: '1rem' }}>Sign in to plan sessions.</p>}
          {user && plannedSessions.filter(s => !s.completed).length === 0 && !addingSession && (
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>No planned sessions yet.</p>
          )}

          {plannedSessions.filter(s => !s.completed).map(s => (
            <PlannedSessionCard
              key={s.id} s={s}
              expanded={expandedSessionId === s.id}
              onToggleExpand={() => setExpandedSessionId(id => id === s.id ? null : s.id)}
              onToggleCompletion={handleToggleCompletion}
              onDelete={handleDeletePlanned}
              onNoteChange={handleSessionNoteChange}
              noteValue={sessionNotes[s.id] ?? (s.notes || '')}
            />
          ))}
        </div>

        <CalendarBlock calSessions={calSessions} plannedSessions={plannedSessions} onDayClick={setSelectedDay} totalSessions={totalSessions} />
      </>)}

      {/* ═══ LOGS TAB ═══ */}
      {tab === 'log' && (
        <div className="card">
          <div className="section-label">Session log</div>
          {Object.keys(calSessions).length === 0 && completedPlanned === 0 && (
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>No sessions logged yet. Tap any day on the calendar to log.</p>
          )}
          {Object.entries(calSessions)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([dateStr, daySessions]) =>
              daySessions.map((s, i) => {
                const [y, mo, d] = dateStr.split('-').map(Number)
                const label = new Date(y, mo - 1, d).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })
                return (
                <div key={`${dateStr}-${i}`} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--border)', display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{label} · {s.duration}</span>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(74,143,212,.15)', color: 'var(--blue)', border: '1px solid rgba(74,143,212,.2)' }}>{s.type}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted2)', lineHeight: 1.5 }}>{s.notes}</div>
                  </div>
                  <button onClick={() => deleteSession(dateStr, i)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16, padding: '0 4px', flexShrink: 0, alignSelf: 'flex-start' }}>✕</button>
                </div>
                )
              })
            )}
          {/* Completed planned sessions */}
          {plannedSessions.filter(s => s.completed).sort((a, b) => b.planned_date.localeCompare(a.planned_date)).map(s => (
            <div key={s.id} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{s.planned_date}{s.planned_time ? ` · ${s.planned_time}` : ''}</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(61,186,111,.15)', color: 'var(--green)', border: '1px solid rgba(61,186,111,.2)' }}>{s.focus}</span>
              </div>
              {s.notes && <div style={{ fontSize: 13, color: 'var(--muted2)', lineHeight: 1.5 }}>{s.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ═══ COMPETITIONS TAB ═══ */}
      {tab === 'comp' && (<>
        <div className="card" style={{ marginBottom: 10 }}>
          <div className="section-label">Add Competition</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            <input value={compForm.name} onChange={e => setCompForm(f => ({ ...f, name: e.target.value }))} placeholder="Competition name" className="dash-input" style={{ width: '100%' }} />
            <input type="date" value={compForm.date} onChange={e => setCompForm(f => ({ ...f, date: e.target.value }))} className="dash-input" style={{ width: '100%' }} />
          </div>
          <button onClick={handleAddCompetition} disabled={!compForm.name.trim() || !user} className="btn btn-primary btn-sm" style={{ opacity: (compForm.name.trim() && user) ? 1 : 0.5 }}>
            {user ? 'Add Competition' : 'Sign in to track'}
          </button>
        </div>

        {competitions.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: 13 }}>No competitions tracked yet.</div>
          </div>
        )}

        {competitions.map(comp => {
          const matches = comp.competition_matches || []
          const wins = matches.filter(m => m.result === 'win').length
          const losses = matches.filter(m => m.result === 'loss').length
          const isExpanded = expandedComp === comp.id
          return (
            <div key={comp.id} className="card" style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setExpandedComp(isExpanded ? null : comp.id)}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '.04em', color: 'var(--white)' }}>{comp.name}</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 3 }}>
                    {comp.date && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{comp.date}</span>}
                    {matches.length > 0 && (
                      <>
                        <span style={{ fontSize: 10, color: 'var(--muted)' }}>·</span>
                        <span style={{ fontSize: 11, color: 'var(--green)' }}>{wins}W</span>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>–</span>
                        <span style={{ fontSize: 11, color: 'var(--red)' }}>{losses}L</span>
                        {matches.some(m => m.medal !== 'none') && (
                          <span style={{ fontSize: 11, color: MEDAL_COLORS[matches.find(m => m.medal !== 'none')?.medal] }}>
                            · {MEDAL_LABELS[matches.find(m => m.medal !== 'none')?.medal]}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <button onClick={() => setExpandedComp(isExpanded ? null : comp.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, cursor: 'pointer' }}>
                  {isExpanded ? '▲' : '▼'}
                </button>
                <button onClick={() => handleDeleteCompetition(comp.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 15 }}>✕</button>
              </div>

              {isExpanded && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                  {matches.length === 0 && <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>No matches recorded yet.</p>}
                  {matches.map((m, i) => (
                    <div key={m.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, padding: '8px 10px', borderRadius: 'var(--radius-md)', background: 'var(--bg3)', borderLeft: `2px solid ${m.result === 'win' ? 'var(--green)' : 'var(--red)'}` }}>
                      <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>Match {i + 1}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: m.result === 'win' ? 'var(--green)' : 'var(--red)', textTransform: 'uppercase' }}>{m.result}</span>
                      {m.medal !== 'none' && (
                        <span style={{ fontSize: 11, padding: '1px 8px', borderRadius: 99, background: `${MEDAL_COLORS[m.medal]}22`, color: MEDAL_COLORS[m.medal], border: `1px solid ${MEDAL_COLORS[m.medal]}44` }}>
                          {MEDAL_LABELS[m.medal]}
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>{m.match_count} in bracket</span>
                      <button onClick={() => handleDeleteMatch(comp.id, m.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 14 }}>✕</button>
                    </div>
                  ))}
                  {addingMatch === comp.id ? (
                    <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius-md)', padding: '12px', marginTop: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
                        <div>
                          <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Result</label>
                          <select value={matchForm.result} onChange={e => setMatchForm(f => ({ ...f, result: e.target.value }))} className="dash-select">
                            <option value="win">Win</option>
                            <option value="loss">Loss</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Medal</label>
                          <select value={matchForm.medal} onChange={e => setMatchForm(f => ({ ...f, medal: e.target.value }))} className="dash-select">
                            <option value="none">None</option>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="bronze">Bronze</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Matches in bracket</label>
                          <input type="number" min={1} max={20} value={matchForm.match_count} onChange={e => setMatchForm(f => ({ ...f, match_count: e.target.value }))} className="dash-input" style={{ width: '100%' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleAddMatch(comp.id)} className="btn btn-primary btn-sm">Save match</button>
                        <button onClick={() => setAddingMatch(null)} className="btn btn-ghost btn-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAddingMatch(comp.id)} style={{ marginTop: 8, background: 'none', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '7px 14px', fontSize: 12, color: 'var(--muted)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", width: '100%' }}>
                      + Add match
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </>)}

      {/* Bottom bar — Manage billing + Feedback */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
        {isPremium ? (
          <button
            onClick={openPortal}
            disabled={portalLoading}
            className="btn btn-ghost"
            style={{ fontSize: 12, opacity: portalLoading ? 0.6 : 1 }}
          >
            {portalLoading ? 'Opening…' : 'Manage billing'}
          </button>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--muted)' }} />
        )}
        <button
          onClick={() => setShowFeedbackModal(true)}
          style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--muted)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", padding: 0 }}
        >
          Send feedback →
        </button>
      </div>
    </div>
  )
}
