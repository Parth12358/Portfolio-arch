const FACTS = [
  { key: 'name',       val: 'Parth Kshirsagar',  color: 'var(--byellow)' },
  { key: 'age',        val: '21',                 color: 'var(--fg)' },
  { key: 'location',   val: 'State College, PA',  color: 'var(--bblue)' },
  { key: 'origin',     val: 'India 🇮🇳',           color: 'var(--borange)' },
  { key: 'degree',     val: 'CS @ Penn State',    color: 'var(--baqua)' },
  { key: 'gpa',        val: '3.54',               color: 'var(--bgreen)' },
  { key: 'hackathons', val: '7 wins',             color: 'var(--byellow)' },
  { key: 'editor',     val: 'neovim btw',         color: 'var(--borange)' },
  { key: 'os',         val: 'arch btw',           color: 'var(--bblue)' },
  { key: 'wm',         val: 'hyprland',           color: 'var(--bpurple)' },
  { key: 'shell',      val: 'zsh + starship',     color: 'var(--baqua)' },
  { key: 'terminal',   val: 'kitty',              color: 'var(--fg)' },
  { key: 'coffee',     val: 'yes, always',        color: 'var(--borange)' },
  { key: 'sleep',      val: 'what is that',       color: 'var(--fg4)' },
]

export default function FunFactsTile() {
  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 10 }}>
        FUN FACTS
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3px 12px',
      }}>
        {FACTS.map(({ key, val, color }) => (
          <div key={key} style={{ display: 'flex', gap: 6, fontSize: 11, lineHeight: 1.7 }}>
            <span style={{ color: 'var(--yellow)', fontWeight: 700, minWidth: 72, flexShrink: 0, fontSize: 10 }}>
              {key}
            </span>
            <span style={{ color }}>
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
