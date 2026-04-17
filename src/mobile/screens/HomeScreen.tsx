import { CONFIG } from '../../data/config'

const INFO_ROWS = [
  { key: 'name',     val: CONFIG.user.name,       color: 'var(--fg)' },
  { key: 'role',     val: CONFIG.user.role,        color: 'var(--baqua)' },
  { key: 'edu',      val: CONFIG.user.university,  color: 'var(--bblue)' },
  { key: 'gpa',      val: CONFIG.user.gpa,         color: 'var(--bgreen)' },
  { key: 'location', val: CONFIG.user.location,    color: 'var(--fg2)' },
  { key: 'os',       val: CONFIG.user.os,          color: 'var(--bblue)' },
  { key: 'wm',       val: CONFIG.user.wm,          color: 'var(--bpurple)' },
  { key: 'editor',   val: CONFIG.user.editor,      color: 'var(--borange)' },
  { key: 'shell',    val: CONFIG.user.shell,       color: 'var(--fg)' },
  { key: 'website',  val: CONFIG.user.website,     color: 'var(--bblue)' },
]

const SWATCHES = [
  'var(--red)', 'var(--green)', 'var(--yellow)', 'var(--blue)',
  'var(--purple)', 'var(--aqua)', 'var(--fg4)', 'var(--fg)',
]

const SKILL_ROWS = [
  { label: 'languages',  tags: CONFIG.skills.languages,  color: 'var(--byellow)' },
  { label: 'frameworks', tags: CONFIG.skills.frameworks, color: 'var(--bgreen)' },
  { label: 'tools',      tags: CONFIG.skills.tools,      color: 'var(--bpurple)' },
]

export default function HomeScreen() {
  return (
    <div style={{ padding: '20px 16px 24px' }}>

      {/* Avatar */}
      <div style={{
        width: 100, height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--bg2)',
        border: '1px solid var(--bg3)',
        marginBottom: 16,
      }}>
        <img
          src="/avatar.gif"
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* user@host */}
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
        <span style={{ color: 'var(--byellow)' }}>{CONFIG.user.handle}</span>
        <span style={{ color: 'var(--fg4)' }}>@</span>
        <span style={{ color: 'var(--baqua)' }}>{CONFIG.user.host}</span>
      </div>

      {/* Seeking badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        margin: '8px 0 12px',
        padding: '5px 12px',
        borderRadius: 6,
        border: '1px solid var(--bgreen)',
        background: 'color-mix(in srgb, var(--green) 12%, transparent)',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--bgreen)', display: 'inline-block',
          animation: 'pulse-dot 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: 12, color: 'var(--bgreen)', fontFamily: 'var(--font-mono)' }}>
          {CONFIG.user.seeking}
        </span>
      </div>

      {/* Divider */}
      <div style={{ color: 'var(--bg3)', marginBottom: 14, fontSize: 12 }}>
        {'─'.repeat(30)}
      </div>

      {/* Info rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
        {INFO_ROWS.map(({ key, val, color }) => (
          <div key={key} style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--yellow)', fontWeight: 700, minWidth: 72, flexShrink: 0 }}>
              {key}
            </span>
            <span style={{ color: 'var(--fg4)', marginRight: 6 }}>~</span>
            <span style={{ color }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Swatches */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {SWATCHES.map((c, i) => (
          <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: c, border: '1px solid var(--bg3)' }} />
        ))}
      </div>

      {/* Skills */}
      <div style={{ color: 'var(--bg3)', marginBottom: 12, fontSize: 12 }}>{'─'.repeat(30)}</div>
      {SKILL_ROWS.map(({ label, tags, color }) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>
            {label}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: '3px 8px', borderRadius: 4,
                border: `1px solid ${color}`, color,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Blinking prompt */}
      <div style={{ marginTop: 16, color: 'var(--bgreen)', fontSize: 14 }}>
        ❯{' '}
        <span style={{
          display: 'inline-block', width: 8, height: 14,
          background: 'var(--byellow)', verticalAlign: 'middle',
          animation: 'blink 1.1s step-end infinite',
        }} />
      </div>
    </div>
  )
}
