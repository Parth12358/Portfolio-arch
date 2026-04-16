interface Props {
  tags: string[]
  color: string
  label: string
  reverse?: boolean
  speed?: number
}

export default function MarqueeRow({ tags, color, label, reverse = false, speed = 30 }: Props) {
  const doubled = [...tags, ...tags]

  return (
    <div style={{ marginBottom: 7, overflow: 'hidden', minWidth: 0 }}>
      <div style={{
        fontSize: 9, color: 'var(--fg4)', letterSpacing: 1.5,
        marginBottom: 3, textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
      }}>
        {label}
      </div>

      <div
        className="marquee-track"
        style={{
          overflow: 'hidden',
          minWidth: 0,
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div style={{
          display: 'flex',
          gap: 5,
          width: 'max-content',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        }}>
          {doubled.map((tag, i) => {
            const filled = i % 3 === 0
            const large = i % 5 === 0
            return (
              <span key={i} style={{
                fontSize: large ? 11 : 10,
                padding: filled ? '2px 9px' : '2px 8px',
                borderRadius: filled ? 4 : 3,
                border: `1px solid ${color}`,
                color: filled ? 'var(--bg0)' : color,
                background: filled ? color : 'transparent',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)',
                fontWeight: filled ? 700 : 400,
                opacity: filled ? 1 : 0.75,
              }}>
                {tag}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
