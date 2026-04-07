const LINES = [
  { type: 'comment', text: '# tech philosophy' },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '## on building' },
  { type: 'text',    text: 'I build things to understand them. Every hackathon, every side project,' },
  { type: 'text',    text: 'every late-night debugging session is a chance to go deeper.' },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '## on tools' },
  { type: 'text',    text: 'Use the right tool. But learn the wrong ones too —' },
  { type: 'text',    text: 'constraints teach you more than convenience ever will.' },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '## on AI' },
  { type: 'text',    text: 'AI is the most interesting problem space of our generation.' },
  { type: 'text',    text: 'The real work is accountability, safety, and making it actually useful.' },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '## on linux' },
  { type: 'text',    text: 'If you understand your tools, you own them.' },
  { type: 'text',    text: 'That is why I run arch.' },
  { type: 'blank',   text: '' },
  { type: 'prompt',  text: '❯ _' },
]

export default function PhilosophyTile() {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 10 }}>
        PHILOSOPHY
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.8 }}>
        {LINES.map((line, i) => (
          <div key={i} style={{
            color: line.type === 'comment' ? 'var(--byellow)'
                 : line.type === 'prompt'  ? 'var(--bgreen)'
                 : line.type === 'blank'   ? 'transparent'
                 : 'var(--fg3)',
            fontWeight: line.type === 'comment' ? 700 : 400,
            minHeight: line.type === 'blank' ? 8 : 'auto',
          }}>
            {line.text || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  )
}
