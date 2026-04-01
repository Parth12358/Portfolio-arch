import { useTileStore } from '../../../store/useTileStore'

const PROJECTS = [
  { name: 'project-one',   desc: 'a CLI tool built with Rust',       tags: ['Rust', 'CLI'],        lang: 'var(--byellow)' },
  { name: 'project-two',   desc: 'python automation scripts',         tags: ['Python', 'scripting'], lang: 'var(--bgreen)' },
  { name: 'project-three', desc: 'hyprland dotfiles & rice configs',  tags: ['dotfiles', 'linux'],   lang: 'var(--bpurple)' },
]

export default function ProjectsTile() {
  const { setWorkspace } = useTileStore()

  return (
    <div>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 12 }}>
        PROJECTS
      </div>
      {PROJECTS.map(p => (
        <div key={p.name} style={{
          marginBottom: 12, paddingBottom: 12,
          borderBottom: '1px solid var(--bg3)',
        }}>
          <div style={{ color: p.lang, fontWeight: 700, fontSize: 12, marginBottom: 2 }}>
            › {p.name}
          </div>
          <div style={{ color: 'var(--fg4)', fontSize: 10, marginBottom: 6 }}>{p.desc}</div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontSize: 9, padding: '1px 6px', borderRadius: 2,
                border: '1px solid var(--bg3)', color: 'var(--fg4)',
              }}>{t}</span>
            ))}
          </div>
          <button
            onClick={() => setWorkspace(2)}
            style={{
              fontSize: 10, padding: '3px 10px', borderRadius: 3,
              border: '1px solid var(--blue)', color: 'var(--bblue)',
              background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--blue)'
              e.currentTarget.style.color = 'var(--bg0)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--bblue)'
            }}
          >
            view project →
          </button>
        </div>
      ))}
    </div>
  )
}
