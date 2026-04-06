import { useEffect, useState } from 'react'
import { useTileStore } from '../../store/useTileStore'
import { useThemeStore } from '../../store/useThemeStore'

const WS_LABELS: Record<number, string> = { 1: '1', 2: '2', 3: '3', 4: '4' }
const WS_NAMES: Record<number, string> = { 1: 'main', 2: 'projects', 3: '3d', 4: 'bio' }

export default function Waybar() {
  const { activeWorkspace, setWorkspace } = useTileStore()
  const { theme, toggleTheme } = useThemeStore()
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const n = new Date()
      setTime(`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      height: 32, background: 'var(--bg2)', borderBottom: '1px solid var(--bg3)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 14px', fontFamily: 'var(--font-mono)', fontSize: 12,
      color: 'var(--fg4)', flexShrink: 0, zIndex: 1000,
    }}>
      {/* Left — workspace buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[1,2,3,4].map(ws => (
          <button
            key={ws}
            onClick={() => setWorkspace(ws as 1|2|3|4)}
            style={{
              padding: '2px 10px', borderRadius: 4, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 12, transition: 'all 0.15s',
              background: activeWorkspace === ws ? 'var(--yellow)' : 'transparent',
              color: activeWorkspace === ws ? 'var(--bg0)' : 'var(--fg4)',
              fontWeight: activeWorkspace === ws ? 700 : 400,
            }}
          >
            {WS_LABELS[ws]}
          </button>
        ))}
        <span style={{ color: 'var(--bg3)', margin: '0 6px' }}>|</span>
        <span style={{ color: 'var(--purple)', fontSize: 11 }}>hyprland</span>
      </div>

      {/* Center — current path */}
      <div style={{ color: 'var(--byellow)', fontSize: 12 }}>
        ~/{WS_NAMES[activeWorkspace]}
      </div>

      {/* Right — system info */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ color: 'var(--aqua)' }}>arch</span>
        <span style={{ color: 'var(--yellow)' }}>87%</span>
        <button
          onClick={toggleTheme}
          title="Toggle theme (Ctrl+T)"
          style={{
            background: 'none', border: '1px solid var(--bg3)',
            borderRadius: 3, padding: '1px 8px',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--fg4)', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--yellow)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bg3)')}
        >
          {theme === 'light' ? 'dark' : 'light'}
        </button>
        <span style={{ color: 'var(--byellow)', fontWeight: 700 }}>{time}</span>
      </div>
    </div>
  )
}
