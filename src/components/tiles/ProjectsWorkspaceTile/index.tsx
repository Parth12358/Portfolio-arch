import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../../../data/config'
import { useTileStore } from '../../../store/useTileStore'

export default function ProjectsWorkspaceTile() {
  const { setWorkspace } = useTileStore()
  const [activeId, setActiveId] = useState(CONFIG.projects[0].id)
  const [filter, setFilter] = useState<'all' | 'hackathon' | 'professional'>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const hasClicked = useRef(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filtered = CONFIG.projects.filter(p => filter === 'all' || p.type === filter)
  const active = CONFIG.projects.find(p => p.id === activeId) ?? CONFIG.projects[0]

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      gap: 0,
      fontFamily: 'var(--font-mono)',
    }}>

      {/* ── LEFT: project tab list ── */}
      <div style={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid var(--bg3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Filter tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--bg3)',
          flexShrink: 0,
        }}>
          {(['all', 'hackathon', 'professional'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flex: 1,
                padding: '6px 0',
                fontSize: 9,
                border: 'none',
                borderBottom: filter === f ? `2px solid var(--green)` : '2px solid transparent',
                background: 'transparent',
                color: filter === f ? 'var(--bgreen)' : 'var(--fg4)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: 0.5,
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tab list */}
        <div
          style={{ flex: 1, overflowY: 'auto' }}
          onMouseLeave={() => {
            hasClicked.current = false
            if (hoverTimer.current) {
              clearTimeout(hoverTimer.current)
              hoverTimer.current = null
            }
            setHoveredId(null)
          }}
        >
          {filtered.map(project => (
            <div
              key={project.id}
              onClick={() => {
                hasClicked.current = true
                setActiveId(project.id)
              }}
              onMouseEnter={() => {
                setHoveredId(project.id)
                if (!hasClicked.current) {
                  if (hoverTimer.current) clearTimeout(hoverTimer.current)
                  hoverTimer.current = setTimeout(() => {
                    if (!hasClicked.current) {
                      setActiveId(project.id)
                    }
                  }, 600)
                }
              }}
              onMouseLeave={() => {
                setHoveredId(null)
                if (hoverTimer.current) {
                  clearTimeout(hoverTimer.current)
                  hoverTimer.current = null
                }
              }}
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid var(--bg3)',
                cursor: 'pointer',
                background: activeId === project.id
                  ? 'var(--bg2)'
                  : hoveredId === project.id
                  ? 'color-mix(in srgb, var(--bg2) 60%, transparent)'
                  : 'transparent',
                borderLeft: activeId === project.id
                  ? `2px solid ${project.color}`
                  : hoveredId === project.id
                  ? `2px solid color-mix(in srgb, ${project.color} 40%, transparent)`
                  : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: activeId === project.id
                  ? project.color
                  : hoveredId === project.id
                  ? 'var(--fg)'
                  : 'var(--fg2)',
                marginBottom: 2,
                transition: 'color 0.15s',
              }}>
                {project.name}
              </div>
              <div style={{ fontSize: 9, color: 'var(--fg4)', marginBottom: 4 }}>
                {project.competition}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  display: 'inline-block',
                  fontSize: 8,
                  padding: '1px 6px',
                  borderRadius: 2,
                  border: `1px solid ${project.color}`,
                  color: project.color,
                  opacity: 0.8,
                }}>
                  {project.award}
                </div>

                {hoveredId === project.id && activeId !== project.id && !hasClicked.current && (
                  <div style={{
                    width: 20,
                    height: 2,
                    background: 'var(--bg3)',
                    borderRadius: 1,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      height: '100%',
                      background: project.color,
                      borderRadius: 1,
                      animation: 'hover-progress 600ms linear forwards',
                    }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => setWorkspace(1)}
          style={{
            padding: '8px 12px',
            borderTop: '1px solid var(--bg3)',
            border: 'none',
            background: 'transparent',
            color: 'var(--fg4)',
            fontSize: 10,
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            textAlign: 'left',
            flexShrink: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg4)')}
        >
          ← back to main
        </button>
      </div>

      {/* ── RIGHT: media viewer ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h2 style={{
                fontSize: 18,
                fontWeight: 700,
                color: active.color,
                fontFamily: 'var(--font-mono)',
                margin: 0,
              }}>
                {active.name}
              </h2>
              <span style={{
                fontSize: 9,
                padding: '2px 8px',
                borderRadius: 3,
                border: `1px solid ${active.color}`,
                color: active.color,
              }}>
                {active.award}
              </span>
            </div>

            {/* Competition + date + links on one row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              gap: 12,
            }}>
              <div style={{ fontSize: 11, color: 'var(--fg4)' }}>
                {active.competition} · {active.date}
              </div>

              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {active.github && (
                  <button
                    onClick={() => window.open(active.github, '_blank')}
                    style={{
                      fontSize: 10, padding: '3px 10px', borderRadius: 3,
                      border: `1px solid ${active.color}`, color: active.color,
                      background: 'transparent', cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = active.color
                      e.currentTarget.style.color = 'var(--bg0)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = active.color
                    }}
                  >
                    github
                  </button>
                )}
                {active.demo && (
                  <button
                    onClick={() => window.open(active.demo, '_blank')}
                    style={{
                      fontSize: 10, padding: '3px 10px', borderRadius: 3,
                      border: '1px solid var(--bg3)', color: 'var(--fg4)',
                      background: 'transparent', cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = active.color
                      e.currentTarget.style.color = active.color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--bg3)'
                      e.currentTarget.style.color = 'var(--fg4)'
                    }}
                  >
                    live demo
                  </button>
                )}
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--fg3)', lineHeight: 1.8 }}>
              {active.desc}
            </div>
          </div>

          {/* Bullet points */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 8 }}>
              KEY ACHIEVEMENTS
            </div>
            {active.bullets.map((b, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, marginBottom: 6,
                fontSize: 11, color: 'var(--fg2)', lineHeight: 1.7,
              }}>
                <span style={{ color: active.color, flexShrink: 0 }}>-</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Media placeholders */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 8 }}>
              MEDIA
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}>
              {[1, 2, 3, 4].map(n => (
                <div
                  key={n}
                  style={{
                    aspectRatio: '16/9',
                    background: 'var(--bg2)',
                    border: '1px dashed var(--bg3)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: 'var(--fg4)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  screenshot {n}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: 'var(--bg4)', marginTop: 6, fontStyle: 'italic' }}>
              drop images into /public/projects/{active.id}/ to populate
            </div>
          </div>

          {/* Stack */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 8 }}>
              STACK
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {active.stack.map(tag => (
                <span key={tag} style={{
                  fontSize: 10,
                  padding: '3px 10px',
                  borderRadius: 3,
                  border: `1px solid ${active.color}`,
                  color: active.color,
                  opacity: 0.8,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  )
}
