import { CONFIG } from '../../data/config'

export default function ProjectsScreen() {
  const hackathon    = CONFIG.projects.filter(p => p.type === 'hackathon')
  const professional = CONFIG.projects.filter(p => p.type === 'professional')
  const personal     = CONFIG.projects.filter(p => p.type === 'personal')

  const CardSection = ({ title, projects }: { title: string; projects: typeof CONFIG.projects }) => (
    <>
      <div style={{ fontSize: 10, color: 'var(--byellow)', marginBottom: 10, letterSpacing: 1 }}>
        {title}
      </div>
      {projects.map(p => (
        <div key={p.id} style={{
          background: 'var(--bg1)',
          border: '1px solid var(--bg3)',
          borderRadius: 10,
          padding: '14px',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.name}</span>
            <span style={{ fontSize: 9, color: 'var(--fg4)', flexShrink: 0, marginLeft: 8 }}>{p.date}</span>
          </div>
          {p.award && (
            <div style={{
              fontSize: 10, padding: '2px 7px', borderRadius: 3,
              border: `1px solid ${p.color}`, color: p.color,
              display: 'inline-block', marginBottom: 6,
            }}>
              {p.award}
            </div>
          )}
          <div style={{ fontSize: 11, color: 'var(--fg4)', fontStyle: 'italic', marginBottom: 6 }}>
            {p.competition}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg3)', lineHeight: 1.7, marginBottom: 10 }}>
            {p.desc}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
            {p.stack.map(tag => (
              <span key={tag} style={{
                fontSize: 10, padding: '2px 7px', borderRadius: 3,
                border: '1px solid var(--bg3)', color: 'var(--fg4)',
              }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {p.github && (
              <button onClick={() => window.open(p.github, '_blank')} style={{
                fontSize: 11, padding: '6px 14px', borderRadius: 6,
                border: `1px solid ${p.color}`, color: p.color,
                background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                minHeight: 36,
              }}>
                github ↗
              </button>
            )}
            {p.demo && (
              <button onClick={() => window.open(p.demo, '_blank')} style={{
                fontSize: 11, padding: '6px 14px', borderRadius: 6,
                border: '1px solid var(--bg3)', color: 'var(--fg4)',
                background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                minHeight: 36,
              }}>
                demo ↗
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div style={{ padding: '20px 16px 24px' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 16 }}>
        PROJECTS — {CONFIG.projects.length} total
      </div>
      <CardSection title="HACKATHON WINS" projects={hackathon} />
      {professional.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <CardSection title="PROFESSIONAL" projects={professional} />
        </div>
      )}
      {personal.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <CardSection title="PERSONAL" projects={personal} />
        </div>
      )}
    </div>
  )
}
