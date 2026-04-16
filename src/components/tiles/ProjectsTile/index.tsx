import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTileStore } from '../../../store/useTileStore'
import { CONFIG } from '../../../data/config'

const FEATURED = CONFIG.projects.filter(p => p.type === 'hackathon').slice(0, 3)

export default function ProjectsTile() {
  const { setWorkspace } = useTileStore()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf: number

    const tick = () => {
      if (!pausedRef.current && el) {
        el.scrollTop += 0.4
        // Reset by half when past the first copy — invisible since content repeats
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop -= el.scrollHeight / 2
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 8,
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1 }}>
          PROJECTS — hackathon wins
        </div>
        <div style={{ fontSize: 9, color: 'var(--fg4)' }}>
          {FEATURED.length} shown
        </div>
      </div>

      {/* Project cards */}
      <div
        ref={scrollRef}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          scrollbarWidth: 'none',
        }}
      >
        {[...FEATURED, ...FEATURED].map((project, i) => (
          <motion.div
            key={`${project.id}-${i}`}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            animate={{
              borderColor: hoveredId === project.id ? project.color : 'var(--bg3)',
            }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--bg3)',
              borderRadius: 6,
              padding: '10px 12px',
              cursor: 'default',
              flexShrink: 0,
            }}
          >
            {/* Top row — name + award + links + date */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 4,
            }}>
              {/* Left — badge + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                <span style={{
                  fontSize: 9,
                  padding: '2px 7px',
                  borderRadius: 3,
                  border: `1px solid ${project.color}`,
                  color: project.color,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)',
                }}>
                  🏆 {project.award}
                </span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: project.color,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {project.name}
                </span>
              </div>

              {/* Right — links + date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                {project.github && (
                  <button
                    onClick={e => { e.stopPropagation(); window.open(project.github, '_blank') }}
                    style={{
                      fontSize: 9, padding: '2px 7px', borderRadius: 3,
                      border: '1px solid var(--bg3)', color: 'var(--fg4)',
                      background: 'transparent', cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = project.color
                      e.currentTarget.style.color = project.color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--bg3)'
                      e.currentTarget.style.color = 'var(--fg4)'
                    }}
                  >
                    github ↗
                  </button>
                )}
                {project.demo && (
                  <button
                    onClick={e => { e.stopPropagation(); window.open(project.demo, '_blank') }}
                    style={{
                      fontSize: 9, padding: '2px 7px', borderRadius: 3,
                      border: '1px solid var(--bg3)', color: 'var(--fg4)',
                      background: 'transparent', cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = project.color
                      e.currentTarget.style.color = project.color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--bg3)'
                      e.currentTarget.style.color = 'var(--fg4)'
                    }}
                  >
                    demo ↗
                  </button>
                )}
                <span style={{ fontSize: 9, color: 'var(--fg4)' }}>{project.date}</span>
              </div>
            </div>

            {/* Competition */}
            <div style={{
              fontSize: 10,
              color: 'var(--fg4)',
              marginBottom: 6,
              fontStyle: 'italic',
            }}>
              {project.competition}
            </div>

            {/* Description — revealed on hover */}
            <AnimatePresence>
              {hoveredId === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    fontSize: 10,
                    color: 'var(--fg3)',
                    lineHeight: 1.7,
                    marginBottom: 8,
                  }}>
                    {project.desc}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stack pills */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
              {project.stack.map(tag => (
                <span key={tag} style={{
                  fontSize: 9,
                  padding: '1px 6px',
                  borderRadius: 2,
                  border: '1px solid var(--bg3)',
                  color: 'var(--fg4)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated "all projects" button */}
      <motion.button
        onClick={() => setWorkspace(2)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          flexShrink: 0,
          width: '100%',
          padding: '7px 0',
          borderRadius: 4,
          border: '1px solid var(--green)',
          background: 'transparent',
          color: 'var(--bgreen)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          cursor: 'pointer',
          letterSpacing: 1,
          transition: 'background 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--green)'
          e.currentTarget.style.color = 'var(--bg0)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--bgreen)'
        }}
      >
        view all projects →
      </motion.button>

    </div>
  )
}
