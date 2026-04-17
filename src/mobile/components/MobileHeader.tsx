import { useThemeStore } from '../../store/useThemeStore'
import type { MobileTab } from '../MobileApp'

const TAB_LABELS: Record<MobileTab, string> = {
  home:     '~/home',
  projects: '~/projects',
  activity: '~/activity',
  bio:      '~/bio',
}

export default function MobileHeader({ activeTab }: { activeTab: MobileTab }) {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div style={{
      height: 44,
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--bg3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 13, color: 'var(--byellow)', fontWeight: 700 }}>
        {TAB_LABELS[activeTab]}
      </span>
      <button
        onClick={toggleTheme}
        style={{
          background: 'none',
          border: '1px solid var(--bg3)',
          borderRadius: 6,
          padding: '4px 10px',
          fontSize: 11,
          color: 'var(--fg4)',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {theme === 'light' ? '◑ dark' : '◐ light'}
      </button>
    </div>
  )
}
