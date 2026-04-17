import { CONFIG } from '../../data/config'

const TIMELINE = [
  { year: 'Aug 2022', title: 'Started at Penn State',      desc: 'B.S. Computer Science + Entrepreneurship',         color: 'var(--bblue)',   icon: '🎓' },
  { year: 'Oct 2023', title: 'HackHarvard — Likhit',       desc: 'Recognition among 600+ participants',              color: 'var(--baqua)',   icon: '🏆' },
  { year: 'Jan 2024', title: 'Cofounded Technocrats',       desc: 'AI startup, TechCrunch Disrupt 2024',             color: 'var(--byellow)', icon: '🚀' },
  { year: 'Apr 2024', title: 'Bitcamp — The Moth Challenge',desc: '1st place cybersecurity, 550+ competitors',       color: 'var(--borange)', icon: '🏆' },
  { year: 'Nov 2024', title: 'HackUMass — VR Circuit',     desc: 'Best VR Hack, 500+ competitors',                  color: 'var(--bpurple)', icon: '🏆' },
  { year: 'Mar 2025', title: 'WarGames — 3rd Place',        desc: '$500 prize at Compiled-6, Penn State',            color: 'var(--byellow)', icon: '🏆' },
  { year: 'May 2025', title: 'Detail Connect Intern',       desc: 'Mobile App Developer, Flutter + Node.js',         color: 'var(--baqua)',   icon: '💼' },
  { year: 'Apr 2026', title: 'Bitcamp — ThatsMyEcho',       desc: 'Best Domain Name (MLH/GoDaddy)',                  color: 'var(--baqua)',   icon: '🏆' },
  { year: 'May 2026', title: 'Penn State Graduation',       desc: 'B.S. CS, GPA 3.54',                              color: 'var(--bgreen)',  icon: '🎓' },
]

const INTERESTS = [
  '🐧 Linux', '🪟 Hyprland', '📝 Neovim', '🎮 Gaming',
  '🎌 Anime', '🎵 Music', '⚡ Hackathons', '🤖 AI/ML', '🔓 Open Source',
]

const CONTACT = [
  { key: 'github',   val: CONFIG.contact.github,   href: `https://${CONFIG.contact.github}` },
  { key: 'email',    val: CONFIG.contact.email,     href: `mailto:${CONFIG.contact.email}` },
  { key: 'linkedin', val: CONFIG.contact.linkedin,  href: `https://${CONFIG.contact.linkedin}` },
  { key: 'website',  val: CONFIG.contact.website,   href: `https://${CONFIG.contact.website}` },
]

export default function BioScreen() {
  return (
    <div style={{ padding: '20px 16px 24px' }}>

      {/* Timeline */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 16 }}>TIMELINE</div>
      <div style={{ position: 'relative', paddingLeft: 20, marginBottom: 28 }}>
        <div style={{ position: 'absolute', left: 6, top: 6, bottom: 6, width: 1, background: 'var(--bg3)' }} />
        {TIMELINE.map((item, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 18 }}>
            <div style={{
              position: 'absolute', left: -17, top: 4,
              width: 9, height: 9, borderRadius: '50%',
              background: item.color, border: '2px solid var(--bg0)',
            }} />
            <div style={{ fontSize: 9, color: 'var(--fg4)', marginBottom: 1 }}>{item.year}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 2 }}>
              {item.icon} {item.title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 12 }}>INTERESTS</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {INTERESTS.map(item => (
          <span key={item} style={{
            fontSize: 12, padding: '6px 12px', borderRadius: 8,
            border: '1px solid var(--bg3)', color: 'var(--fg3)',
            background: 'var(--bg1)', minHeight: 36,
            display: 'flex', alignItems: 'center',
          }}>
            {item}
          </span>
        ))}
      </div>

      {/* Contact */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 12 }}>CONTACT</div>
      {CONTACT.map(({ key, val, href }) => (
        <a key={key} href={href} target="_blank" rel="noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', marginBottom: 8,
          background: 'var(--bg1)', border: '1px solid var(--bg3)',
          borderRadius: 10, textDecoration: 'none', minHeight: 52,
        }}>
          <span style={{ color: 'var(--yellow)', fontWeight: 700, minWidth: 70, fontSize: 12 }}>{key}</span>
          <span style={{
            color: 'var(--bblue)', fontSize: 11,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {val}
          </span>
          <span style={{ marginLeft: 'auto', color: 'var(--fg4)', fontSize: 12 }}>↗</span>
        </a>
      ))}

      {/* Resume */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, margin: '24px 0 12px' }}>
        RESUME
      </div>

      <a
        href="/resume.pdf"
        download="Parth_Kshirsagar_Resume.pdf"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, width: '100%', padding: '14px 0',
          borderRadius: 10, marginBottom: 12,
          border: '1px solid var(--bgreen)',
          color: 'var(--bgreen)', fontSize: 14,
          textDecoration: 'none', fontFamily: 'var(--font-mono)',
          fontWeight: 700, minHeight: 52,
          background: 'color-mix(in srgb, var(--green) 8%, transparent)',
        }}
      >
        ↓ download resume
      </a>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, width: '100%', padding: '12px 0',
          borderRadius: 10, marginBottom: 24,
          border: '1px solid var(--bg3)',
          color: 'var(--fg4)', fontSize: 13,
          textDecoration: 'none', fontFamily: 'var(--font-mono)',
          minHeight: 44,
        }}
      >
        view in browser ↗
      </a>
    </div>
  )
}
