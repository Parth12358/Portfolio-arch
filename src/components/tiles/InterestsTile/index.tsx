const INTERESTS = [
  { label: 'Linux',       icon: '🐧', color: 'var(--bblue)' },
  { label: 'Hyprland',    icon: '🪟', color: 'var(--bpurple)' },
  { label: 'Neovim',      icon: '📝', color: 'var(--bgreen)' },
  { label: 'Gaming',      icon: '🎮', color: 'var(--borange)' },
  { label: 'Anime',       icon: '🎌', color: 'var(--bred)' },
  { label: 'Music',       icon: '🎵', color: 'var(--byellow)' },
  { label: 'Hackathons',  icon: '⚡', color: 'var(--byellow)' },
  { label: 'AI / ML',     icon: '🤖', color: 'var(--baqua)' },
  { label: 'Open Source', icon: '🔓', color: 'var(--bgreen)' },
  { label: 'VR / AR',     icon: '🥽', color: 'var(--bpurple)' },
  { label: 'Robotics',    icon: '🦾', color: 'var(--bblue)' },
  { label: 'Coffee',      icon: '☕', color: 'var(--borange)' },
]

export default function InterestsTile() {
  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 10 }}>
        INTERESTS & HOBBIES
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6,
      }}>
        {INTERESTS.map(({ label, icon, color }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 8px',
              borderRadius: 4,
              border: '1px solid var(--bg3)',
              background: 'var(--bg2)',
              fontSize: 10,
              color,
              transition: 'border-color 0.15s, background 0.15s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = color
              e.currentTarget.style.background = 'var(--bg0)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--bg3)'
              e.currentTarget.style.background = 'var(--bg2)'
            }}
          >
            <span style={{ fontSize: 14 }}>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
