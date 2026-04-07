import { useState, useEffect } from 'react'
import { getHistoryCache, saveHistoryCache } from '../lib/supabase'
import { PremiumGate } from '../lib/premium'

const CACHE_KEY_PREFIX = 'grapplingos_history_'

const STATIC_CONTENT = {
  bjj: `Brazilian Jiu-Jitsu traces its origins to the ancient Japanese martial art of judo and jujutsu, brought to Brazil in the early twentieth century by Mitsuyo Maeda, a world-class judoka and student of Jigoro Kano. Maeda emigrated to Brazil in 1914 and settled in Belém do Pará, where he taught his art to several students. Among his most devoted pupils was Carlos Gracie, a young man from a prominent Brazilian family who began training with Maeda around 1917.

Carlos Gracie and his brothers — most notably Hélio Gracie — took Maeda's teachings and transformed them into something uniquely Brazilian. Hélio, who was smaller and physically weaker than his brothers, was forced to adapt the techniques so that leverage and positioning could overcome size and strength. This evolution became the cornerstone philosophy of Brazilian Jiu-Jitsu: a smaller, weaker person can defeat a larger, stronger opponent through superior technique and positional strategy on the ground.

The Gracie family promoted their art through a practice known as the "Gracie Challenge," in which family members would publicly challenge practitioners of other martial arts to open matches. These bouts, held from the 1920s through the late twentieth century, gave BJJ credibility and helped establish its reputation as one of the most effective combat sports in the world. Hélio Gracie fought legendary bouts against judoka and capoeira masters, and the family's record in these matches was remarkable.

Brazilian Jiu-Jitsu's expansion beyond Brazil accelerated when members of the Gracie family emigrated to the United States in the late 1980s and early 1990s. Rorion Gracie, one of Hélio's sons, moved to Los Angeles and began teaching BJJ from his garage in Torrance, California. Recognizing the need for a definitive platform to showcase the art's effectiveness, Rorion co-founded the Ultimate Fighting Championship in 1993. The inaugural event, UFC 1, held on November 12, 1993 in Denver, Colorado, featured Royce Gracie — a slender, unassuming fighter — defeating opponents from boxing, wrestling, and karate to become the first UFC champion.

Royce Gracie's dominant performance at UFC 1 shocked the martial arts world and ignited a revolution in how combat sports were understood. His victories demonstrated conclusively that ground fighting and submission grappling could neutralize virtually any stand-up striking art. The event sparked a global surge of interest in BJJ and submission grappling. Within a decade, BJJ became a mandatory component of training for any serious mixed martial artist.

Today, Brazilian Jiu-Jitsu has grown into one of the world's most popular martial arts, with millions of practitioners across every continent. Major competition organizations like the International Brazilian Jiu-Jitsu Federation host hundreds of tournaments worldwide each year. The sport has produced legendary champions including Marcelo Garcia, Roger Gracie, and Gordon Ryan, each of whom has pushed the technical boundaries of the art. BJJ's emphasis on continuous learning, problem-solving, and the principle that technique conquers strength continues to attract practitioners of all ages, backgrounds, and athletic abilities.`,

  judo: `Judo was founded in 1882 by Jigoro Kano, a Japanese educator and martial artist who sought to create a modern combat sport from the classical techniques of jujutsu. Kano studied multiple schools of jujutsu — most notably Tenshin Shin'yo-ryu and Kito-ryu — and synthesized their most effective techniques into a new system based on the principle of maximum efficiency with minimum effort (seiryoku zenyo) and mutual welfare and benefit (jita kyoei). He established the Kodokan Judo Institute in Tokyo in 1882, which became the founding institution of the sport.

Unlike the secretive jujutsu schools of the feudal era, Kano's Kodokan welcomed students of all backgrounds and emphasized randori (free practice) and shiai (competition) as core elements of training. This open, scientific approach allowed judo to develop rapidly. The Kodokan's methods were proven in a famous 1886 tournament organized by the Tokyo Metropolitan Police, in which Kodokan judoka defeated representatives from the rival Totsuka-ha school of jujutsu, cementing judo's reputation as Japan's preeminent grappling art.

Judo spread internationally with remarkable speed. Kano sent his students abroad as cultural ambassadors, and demonstrations of judo captivated audiences in Europe and North America. By the early twentieth century, judo was being practiced across three continents. Theodore Roosevelt, the twenty-sixth President of the United States, famously practiced judo in the White House after being introduced to it by a Kodokan instructor. The art's growth was interrupted by World War II but resumed with even greater momentum in the postwar era.

Perhaps the most significant milestone in judo's international expansion was its inclusion in the Olympic Games. Judo debuted at the 1964 Tokyo Games — a profound moment as Japan hosted the Olympics for the first time. Dutch judoka Anton Geesink shocked the Japanese public by defeating Akio Kaminaga to win the open weight gold medal, demonstrating that judo had become truly global. Since then, judo has been a permanent fixture on the Olympic program, with women's judo added at the 1992 Barcelona Games.

The competitive ruleset of judo has undergone significant evolution since Kano's era. Early judo embraced a wide range of techniques, including leg locks and groundwork submissions now restricted or banned in modern competition. The International Judo Federation has progressively tightened rules to emphasize powerful throwing techniques and reduce stalling. These changes, while sometimes controversial among traditionalists, have shaped judo into a dynamic, explosive sport that rewards athleticism and technical throwing ability.

Among judo's all-time greatest competitors are Yasuhiro Yamashita of Japan, who won 203 consecutive matches over nine years and four world championships; Driulis González of Cuba, a multiple world and Olympic champion; and Teddy Riner of France, widely considered the greatest judoka of the modern era with ten world championship titles and three Olympic gold medals. The global spread of judo has produced champions from Japan, France, Cuba, Russia, Georgia, Brazil, and beyond, reflecting the sport's transformation from a Japanese cultural export to a truly universal athletic discipline with approximately forty million practitioners worldwide.`
}

const PROMPTS = {
  bjj: `Write a comprehensive 4-6 paragraph history of Brazilian Jiu-Jitsu. Cover: its origins in Japanese Jiu-Jitsu and judo, Mitsuyo Maeda's arrival in Brazil, the Gracie family (Carlos and Hélio) developing the art, the Gracie Challenge matches, key figures and lineage, the spread to the United States, and its mainstream rise culminating in UFC 1 in 1993 with Royce Gracie. Include relevant dates, famous names, and notable moments. Write in a clear, informative, engaging style suitable for martial arts practitioners.`,
  judo: `Write a comprehensive 4-6 paragraph history of Judo. Cover: its founding by Jigoro Kano in 1882, the Kodokan principles (seiryoku zenyo and jita kyoei), the 1886 Tokyo police tournament, the spread of judo globally through Kano's students, notable early practitioners (including Mitsuyo Maeda who later influenced BJJ), Olympic inclusion in 1964, Anton Geesink's historic win, the evolution of the ruleset by the IJF, and notable modern champions like Yasuhiro Yamashita, Driulis González, and Teddy Riner. Include relevant dates and notable matches.`
}

async function generateWithAPI(sport) {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!key) return null
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{ role: 'user', content: PROMPTS[sport] }]
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.content?.[0]?.text || null
  } catch {
    return null
  }
}

export default function HistoryPage() {
  const [tab, setTab] = useState('bjj')
  const [content, setContent] = useState({ bjj: null, judo: null })
  const [loading, setLoading] = useState({ bjj: false, judo: false })

  const loadContent = async (sport) => {
    if (content[sport]) return

    // Check localStorage cache first
    const lsKey = CACHE_KEY_PREFIX + sport
    const cached = localStorage.getItem(lsKey)
    if (cached) {
      setContent(c => ({ ...c, [sport]: cached }))
      return
    }

    // Try Supabase cache
    setLoading(l => ({ ...l, [sport]: true }))
    const dbCached = await getHistoryCache(sport)
    if (dbCached) {
      localStorage.setItem(lsKey, dbCached)
      setContent(c => ({ ...c, [sport]: dbCached }))
      setLoading(l => ({ ...l, [sport]: false }))
      return
    }

    // Try Anthropic API
    const apiContent = await generateWithAPI(sport)
    if (apiContent) {
      localStorage.setItem(lsKey, apiContent)
      saveHistoryCache(sport, apiContent)
      setContent(c => ({ ...c, [sport]: apiContent }))
    } else {
      // Fall back to static content
      const fallback = STATIC_CONTENT[sport]
      localStorage.setItem(lsKey, fallback)
      setContent(c => ({ ...c, [sport]: fallback }))
    }
    setLoading(l => ({ ...l, [sport]: false }))
  }

  useEffect(() => { loadContent(tab) }, [tab])

  const tabStyle = (t) => ({
    padding: '6px 18px', borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: 'pointer',
    border: '1px solid', fontFamily: "'DM Sans', sans-serif", transition: 'all .15s',
    borderColor: tab === t ? 'var(--white)' : 'var(--border)',
    background: tab === t ? 'var(--white)' : 'transparent',
    color: tab === t ? '#111' : 'var(--muted)',
  })

  const paragraphs = (content[tab] || '').split('\n\n').filter(Boolean)

  return (
    <div className="container page">
      <div className="page-header">
        <h1 className="page-title">History</h1>
        <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Origins & Lineage</span>
      </div>

      <PremiumGate feature="History">
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        <button onClick={() => setTab('bjj')} style={tabStyle('bjj')}>Brazilian Jiu-Jitsu</button>
        <button onClick={() => setTab('judo')} style={tabStyle('judo')}>Judo</button>
      </div>

      {loading[tab] ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '.06em', marginBottom: 8 }}>Loading history…</div>
          <div style={{ fontSize: 12 }}>Generating content</div>
        </div>
      ) : (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 3, height: 24, borderRadius: 2, background: tab === 'bjj' ? 'var(--red)' : 'var(--gold)' }} />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '.04em', color: 'var(--white)' }}>
              {tab === 'bjj' ? 'Brazilian Jiu-Jitsu' : 'Judo'}
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>Origins &amp; History</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 14, color: i === 0 ? 'var(--muted2)' : 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
                {p}
              </p>
            ))}
          </div>

          {!import.meta.env.VITE_ANTHROPIC_API_KEY && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
              Add <code style={{ background: 'var(--bg3)', padding: '1px 5px', borderRadius: 3, fontStyle: 'normal' }}>VITE_ANTHROPIC_API_KEY</code> to your .env.local to generate fresh AI content.
            </div>
          )}
        </div>
      )}
      </PremiumGate>
    </div>
  )
}
