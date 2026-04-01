import { CONFIG } from '../../../data/config'

export default function FastfetchTile() {
  return (
    <div style={{ display: 'flex', gap: 16, height: '100%', alignItems: 'flex-start' }}>

      {/* Avatar */}
      <div style={{
        flexShrink: 0,
        width: 110,
        border: '1px solid var(--bg3)',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'var(--bg2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
      }}>
        <img
          src="/avatar.gif"
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, fontSize: 11, lineHeight: 1.8 }}>
        {/* User line */}
        <div style={{ marginBottom: 6 }}>
          <span style={{ color: 'var(--byellow)', fontWeight: 700 }}>{CONFIG.user.handle}</span>
          <span style={{ color: 'var(--fg4)' }}>@</span>
          <span style={{ color: 'var(--baqua)', fontWeight: 700 }}>{CONFIG.user.host}</span>
        </div>

        {/* Divider */}
        <div style={{ color: 'var(--bg3)', marginBottom: 8, fontSize: 10 }}>
          {'─'.repeat(28)}
        </div>

        {/* Info rows */}
        {[
          { key: 'os',       val: CONFIG.user.os,       color: 'var(--bblue)' },
          { key: 'wm',       val: CONFIG.user.wm,       color: 'var(--bpurple)' },
          { key: 'editor',   val: CONFIG.user.editor,   color: 'var(--borange)' },
          { key: 'shell',    val: CONFIG.user.shell,    color: 'var(--fg)' },
          { key: 'terminal', val: CONFIG.user.terminal, color: 'var(--fg)' },
          { key: 'theme',    val: CONFIG.user.theme,    color: 'var(--bgreen)' },
        ].map(({ key, val, color }) => (
          <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
            <span style={{ color: 'var(--yellow)', fontWeight: 700, minWidth: 64 }}>{key}</span>
            <span style={{ color }}>{val}</span>
          </div>
        ))}

        {/* Color swatches */}
        <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
          {['var(--red)','var(--green)','var(--yellow)','var(--blue)','var(--purple)','var(--aqua)','var(--fg4)','var(--fg)'].map((c, i) => (
            <div key={i} style={{ width: 13, height: 13, borderRadius: 2, background: c }} />
          ))}
        </div>

        {/* Prompt */}
        <div style={{ marginTop: 12, color: 'var(--bgreen)', fontSize: 12 }}>
          ❯ <span style={{
            display: 'inline-block', width: 7, height: 13,
            background: 'var(--byellow)', verticalAlign: 'middle',
            animation: 'blink 1.1s step-end infinite',
          }} />
        </div>
      </div>
    </div>
  )
}
