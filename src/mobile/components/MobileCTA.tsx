import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../../data/config'

export default function MobileCTA() {
  const [visible, setVisible] = useState(true)

  const dismiss = () => setVisible(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            flexShrink: 0,
            background: 'var(--bg1)',
            borderTop: '1px solid var(--bgreen)',
            padding: '12px 16px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--bgreen)', display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 13, color: 'var(--bgreen)', fontWeight: 700 }}>
                open to work
              </span>
            </div>
            <button
              onClick={dismiss}
              style={{
                background: 'none', border: 'none',
                color: 'var(--fg4)', cursor: 'pointer',
                fontSize: 18, padding: '0 4px',
                fontFamily: 'var(--font-mono)',
                minHeight: 36, minWidth: 36,
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            fontSize: 12, color: 'var(--fg3)',
            lineHeight: 1.7, marginBottom: 12,
          }}>
            seeking SWE / AI roles — May 2026 grad from Penn State. let's talk.
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={`mailto:${CONFIG.contact.email}`}
              style={{
                flex: 1, textAlign: 'center',
                padding: '10px 0', borderRadius: 8,
                border: '1px solid var(--bgreen)',
                color: 'var(--bgreen)', fontSize: 13,
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                minHeight: 44, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
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
                padding: '10px 0', borderRadius: 8,
                border: '1px solid var(--bg3)',
                color: 'var(--fg4)', fontSize: 13,
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                minHeight: 44, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              linkedin ↗
            </a>
            <a
              href="/resume.pdf"
              download="Parth_Kshirsagar_Resume.pdf"
              style={{
                flex: 1, textAlign: 'center',
                padding: '10px 0', borderRadius: 8,
                border: '1px solid var(--bg3)',
                color: 'var(--fg4)', fontSize: 13,
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                minHeight: 44, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              resume ↓
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
