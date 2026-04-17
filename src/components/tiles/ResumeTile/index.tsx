import { useState } from 'react'

export default function ResumeTile() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0, marginBottom: 8,
      }}>
        <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1 }}>
          RESUME
        </div>
        <a
          href="/resume.pdf"
          download="Parth_Kshirsagar_Resume.pdf"
          style={{
            fontSize: 10, padding: '3px 10px', borderRadius: 3,
            border: '1px solid var(--bgreen)', color: 'var(--bgreen)',
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
          download ↓
        </a>
      </div>

      <div style={{
        flex: 1, position: 'relative',
        border: '1px solid var(--bg3)',
        borderRadius: 4, overflow: 'hidden',
        background: 'var(--bg2)',
      }}>
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11, color: 'var(--fg4)',
            fontFamily: 'var(--font-mono)',
          }}>
            loading resume...
          </div>
        )}
        <iframe
          src="/resume.pdf"
          style={{
            width: '100%', height: '100%',
            border: 'none',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setLoaded(true)}
          title="Parth Kshirsagar Resume"
        />
      </div>
    </div>
  )
}
