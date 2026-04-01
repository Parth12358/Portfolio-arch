import { useRef, useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useTerminal } from '../../../hooks/useTerminal'

export default function TerminalTile() {
  const { history, cwd, run } = useTerminal()
  const [input, setInput] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    }
  }

  const lineColor = (type: string) => {
    if (type === 'input')  return 'var(--fg4)'
    if (type === 'error')  return 'var(--red)'
    if (type === 'dir')    return 'var(--bblue)'
    return 'var(--fg)'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Output */}
      <div
        ref={outputRef}
        style={{
          flex: 1, overflowY: 'auto', fontSize: 11,
          lineHeight: 1.7, padding: '8px 12px',
        }}
      >
        {history.map((line, i) => (
          <div key={i} style={{ color: lineColor(line.type), whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderTop: '1px solid var(--bg3)',
        flexShrink: 0,
      }}>
        <span style={{ color: 'var(--bgreen)', fontSize: 11, whiteSpace: 'nowrap' }}>
          {cwd} ❯
        </span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
          spellCheck={false}
          style={{
            flex: 1, background: 'transparent', border: 'none',
            outline: 'none', color: 'var(--fg)', fontFamily: 'var(--font-mono)',
            fontSize: 11, caretColor: 'var(--byellow)',
          }}
        />
      </div>
    </div>
  )
}
