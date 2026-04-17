import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../data/config'

export default function ContactCTA() {
  const [visible, setVisible] = useState(true)

  const dismiss = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
            background: 'var(--bg1)',
            border: '1px solid var(--bgreen)',
            borderRadius: 10,
            padding: '14px 16px',
            fontFamily: 'var(--font-mono)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            minWidth: 240,
            maxWidth: 280,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--bgreen)',
                animation: 'pulse-dot 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              <span style={{ fontSize: 11, color: 'var(--bgreen)', fontWeight: 700 }}>
                open to work
              </span>
            </div>
            <button
              onClick={dismiss}
              style={{
                background: 'none', border: 'none',
                color: 'var(--fg4)', cursor: 'pointer',
                fontSize: 14, padding: '0 2px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              ×
            </button>
          </div>

          <div style={{ fontSize: 11, color: 'var(--fg3)', lineHeight: 1.7, marginBottom: 12 }}>
            seeking SWE / AI roles — May 2026 grad from Penn State. let's talk.
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={`mailto:${CONFIG.contact.email}`}
              style={{
                flex: 1, textAlign: 'center',
                padding: '6px 0', borderRadius: 6,
                border: '1px solid var(--bgreen)',
                color: 'var(--bgreen)', fontSize: 10,
                textDecoration: 'none', fontFamily: 'var(--font-mono)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--green)'
                e.currentTarget.style.color = 'var(--bg0)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--bgreen)'
              }}
            >
              email ↗
            </a>
            <a
              href={`https://${CONFIG.contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1, textAlign: 'center',
                padding: '6px 0', borderRadius: 6,
                border: '1px solid var(--bg3)',
                color: 'var(--fg4)', fontSize: 10,
                textDecoration: 'none', fontFamily: 'var(--font-mono)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--bblue)'
                e.currentTarget.style.color = 'var(--bblue)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--bg3)'
                e.currentTarget.style.color = 'var(--fg4)'
              }}
            >
              linkedin ↗
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
