import { motion, AnimatePresence } from 'framer-motion'
import type { MobileTab } from '../MobileApp'

const TABS: { id: MobileTab; label: string; icon: string }[] = [
  { id: 'home',     label: 'home',     icon: '⌂' },
  { id: 'projects', label: 'projects', icon: '◈' },
  { id: 'activity', label: 'activity', icon: '⬡' },
  { id: 'bio',      label: 'bio',      icon: '○' },
]

interface Props {
  activeTab: MobileTab
  setActiveTab: (tab: MobileTab) => void
}

export default function MobileTabBar({ activeTab, setActiveTab }: Props) {
  return (
    <div style={{
      height: 64,
      background: 'var(--bg2)',
      borderTop: '1px solid var(--bg3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexShrink: 0,
      paddingBottom: 8,
      position: 'relative',
    }}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.88 }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0',
              fontFamily: 'var(--font-mono)',
              position: 'relative',
            }}
          >
            <span style={{
              fontSize: 18,
              color: isActive ? 'var(--byellow)' : 'var(--fg4)',
              transition: 'color 0.15s',
            }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: 9,
              color: isActive ? 'var(--byellow)' : 'var(--fg4)',
              letterSpacing: 0.5,
              transition: 'color 0.15s',
            }}>
              {tab.label}
            </span>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    width: 24,
                    height: 2,
                    background: 'var(--byellow)',
                    borderRadius: 1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
