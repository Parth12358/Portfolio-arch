import { CONFIG } from '../../../data/config'

const LINKS = [
  { key: 'github',   val: CONFIG.contact.github,   href: `https://${CONFIG.contact.github}`,   color: 'var(--fg)' },
  { key: 'linkedin', val: CONFIG.contact.linkedin,  href: `https://${CONFIG.contact.linkedin}`,  color: 'var(--bblue)' },
  { key: 'email',    val: CONFIG.contact.email,     href: `mailto:${CONFIG.contact.email}`,      color: 'var(--baqua)' },
  { key: 'website',  val: CONFIG.contact.website,   href: `https://${CONFIG.contact.website}`,   color: 'var(--bgreen)' },
  { key: 'phone',    val: '814-769-3914',           href: 'tel:8147693914',                      color: 'var(--fg3)' },
]

export default function ContactTile() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 4 }}>
        CONTACT
      </div>

      {LINKS.map(({ key, val, href, color }) => (
        <a
          key={key}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          style={{
            display: 'flex',
            gap: 8,
            fontSize: 11,
            textDecoration: 'none',
            padding: '5px 8px',
            borderRadius: 4,
            border: '1px solid var(--bg3)',
            background: 'var(--bg2)',
            transition: 'all 0.15s',
            alignItems: 'center',
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
          <span style={{ color: 'var(--yellow)', fontWeight: 700, minWidth: 64, fontSize: 10 }}>
            {key}
          </span>
          <span style={{ color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {val}
          </span>
          <span style={{ marginLeft: 'auto', color: 'var(--bg3)', fontSize: 10 }}>[ext]</span>
        </a>
      ))}
    </div>
  )
}
