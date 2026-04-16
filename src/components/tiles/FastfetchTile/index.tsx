import { CONFIG } from '../../../data/config'
import MarqueeRow from './MarqueeRow'

const INFO_ROWS = [
  { key: 'name',       val: CONFIG.user.name,       color: 'var(--fg)' },
  { key: 'role',       val: CONFIG.user.role,        color: 'var(--baqua)' },
  { key: 'edu',        val: CONFIG.user.university,  color: 'var(--bblue)' },
  { key: 'gpa',        val: CONFIG.user.gpa,         color: 'var(--bgreen)' },
  { key: 'location',   val: CONFIG.user.location,    color: 'var(--fg2)' },
  { key: 'os',         val: CONFIG.user.os,          color: 'var(--bblue)' },
  { key: 'wm',         val: CONFIG.user.wm,          color: 'var(--bpurple)' },
  { key: 'editor',     val: CONFIG.user.editor,      color: 'var(--borange)' },
  { key: 'shell',      val: CONFIG.user.shell,       color: 'var(--fg)' },
  { key: 'terminal',   val: CONFIG.user.terminal,    color: 'var(--fg)' },
  { key: 'theme',      val: CONFIG.user.theme,       color: 'var(--bgreen)' },
  { key: 'website',    val: CONFIG.user.website,     color: 'var(--bblue)' },
  { key: 'email',      val: CONFIG.user.email,       color: 'var(--fg3)' },
  { key: 'linkedin',   val: CONFIG.user.linkedin,    color: 'var(--bblue)' },
]

const SWATCHES = [
  'var(--red)', 'var(--green)', 'var(--yellow)', 'var(--blue)',
  'var(--purple)', 'var(--aqua)', 'var(--fg4)', 'var(--fg)',
]

export default function FastfetchTile() {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      height: '100%',
      overflow: 'hidden',
      minWidth: 0,
      alignItems: 'flex-start',
    }}>

      {/* Avatar */}
      <div style={{
        flexShrink: 0,
        width: 90,
        height: 180,
        border: '1px solid var(--bg3)',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'var(--bg2)',
        alignSelf: 'flex-start',
        marginTop: 2,
      }}>
        <img
          src="/avatar.gif"
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Info */}
      <div style={{
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>

        {/* user@host */}
        <div style={{ marginBottom: 6, fontSize: 15, letterSpacing: 0.5, flexShrink: 0 }}>
          <span style={{ color: 'var(--byellow)', fontWeight: 700 }}>{CONFIG.user.handle}</span>
          <span style={{ color: 'var(--bg4)' }}>@</span>
          <span style={{ color: 'var(--baqua)', fontWeight: 700 }}>{CONFIG.user.host}</span>
        </div>

        {/* Divider */}
        <div style={{ color: 'var(--bg3)', marginBottom: 10, fontSize: 10, userSelect: 'none' }}>
          ------------------------------------
        </div>

        {/* Info rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0 }}>
          {INFO_ROWS.map(({ key, val, color }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'baseline', fontSize: 11, lineHeight: 1.65, gap: 0 }}>
              <span style={{
                color: 'var(--byellow)',
                fontWeight: 700,
                minWidth: key.length > 7 ? 86 : 72,
                flexShrink: 0,
                fontSize: 10.5,
                letterSpacing: 0.3,
              }}>
                {key}
              </span>
              <span style={{ color: 'var(--fg4)', marginRight: 8, fontSize: 11 }}>~</span>
              <span style={{
                color,
                fontSize: 11,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ color: 'var(--bg3)', margin: '10px 0', fontSize: 10, userSelect: 'none' }}>
          ------------------------------------
        </div>

        {/* Color swatches */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 12, flexShrink: 0, alignItems: 'center' }}>
          {SWATCHES.map((c, i) => (
            <div key={i} style={{
              width: i === 0 || i === 7 ? 18 : 14,
              height: i === 0 || i === 7 ? 18 : 14,
              borderRadius: 3,
              background: c,
              border: '1px solid var(--bg3)',
              alignSelf: 'center',
            }} />
          ))}
        </div>

        {/* Skills — fills remaining height */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'var(--bg3)', margin: '8px 0 6px', fontSize: 10, userSelect: 'none', flexShrink: 0 }}>
            ------------------------------------
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <MarqueeRow label="skills"     tags={CONFIG.skills.areas}      color="var(--baqua)"   speed={35} />
            <MarqueeRow label="languages"  tags={CONFIG.skills.languages}  color="var(--byellow)" speed={28} reverse />
            <MarqueeRow label="frameworks" tags={CONFIG.skills.frameworks} color="var(--bgreen)"  speed={40} />
            <MarqueeRow label="tools"      tags={CONFIG.skills.tools}      color="var(--bpurple)" speed={32} reverse />
            <MarqueeRow label="platforms"  tags={CONFIG.skills.platforms}  color="var(--borange)" speed={25} />
          </div>
          
        </div>
      </div>
    </div>
  )
}
