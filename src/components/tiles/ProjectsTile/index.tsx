import { useState } from 'react'
import { useTileStore } from '../../../store/useTileStore'
import { CONFIG } from '../../../data/config'

export default function ProjectsTile() {
  const { setWorkspace } = useTileStore()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const PROJECTS = CONFIG.projects.filter(p => p.type === 'hackathon').slice(0, 3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>

      {/* Compact header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        flexShrink: 0, fontSize: 10, color: 'var(--fg4)', letterSpacing: 1,
      }}>
        <span>PROJECTS — hackathon wins</span>
        <span>{PROJECTS.length} shown</span>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              background: 'var(--bg2)',
              border: `1px solid ${hoveredId === project.id ? project.color : 'var(--bg3)'}`,
              borderRadius: 5,
              padding: '7px 10px',
              transition: 'border-color 0.15s',
              flexShrink: 0,
            }}
          >
            {/* Row 1: badge + name + links + date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'nowrap' }}>
              <span style={{
                fontSize: 8, padding: '1px 5px', borderRadius: 2,
                border: `1px solid ${project.color}`, color: project.color,
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {project.award}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, color: project.color,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
              }}>
                {project.name}
              </span>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0, alignItems: 'center' }}>
                {project.github && (
                  <button onClick={() => window.open(project.github, '_blank')} style={{
                    fontSize: 8, padding: '1px 6px', borderRadius: 2,
                    border: '1px solid var(--bg3)', color: 'var(--fg4)',
                    background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                  }}>github</button>
                )}
                {project.demo && (
                  <button onClick={() => window.open(project.demo, '_blank')} style={{
                    fontSize: 8, padding: '1px 6px', borderRadius: 2,
                    border: '1px solid var(--bg3)', color: 'var(--fg4)',
                    background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                  }}>demo</button>
                )}
                <span style={{ fontSize: 8, color: 'var(--fg4)' }}>{project.date}</span>
              </div>
            </div>

            {/* Row 2: competition */}
            <div style={{ fontSize: 9, color: 'var(--fg4)', fontStyle: 'italic', marginBottom: 4 }}>
              {project.competition}
            </div>

            {/* Row 3: stack tags */}
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {project.stack.map(tag => (
                <span key={tag} style={{
                  fontSize: 8, padding: '1px 5px', borderRadius: 2,
                  border: '1px solid var(--bg3)', color: 'var(--fg4)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      <button
        onClick={() => setWorkspace(2)}
        style={{
          flexShrink: 0, width: '100%', padding: '5px 0',
          borderRadius: 4, border: '1px solid var(--green)',
          background: 'transparent', color: 'var(--bgreen)',
          fontFamily: 'var(--font-mono)', fontSize: 10,
          cursor: 'pointer', letterSpacing: 1, transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.color = 'var(--bg0)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--bgreen)' }}
      >
        view all projects
      </button>
    </div>
  )
}
