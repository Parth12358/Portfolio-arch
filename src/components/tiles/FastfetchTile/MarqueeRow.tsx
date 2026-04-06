interface Props {
  tags: string[]
  color: string
  label: string
  reverse?: boolean
  speed?: number
}

export default function MarqueeRow({ tags, color, label, reverse = false, speed = 30 }: Props) {
  const doubled = [...tags, ...tags]
  const duration = `${speed}s`

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{
        fontSize: 9,
        color: 'var(--fg4)',
        letterSpacing: 1,
        marginBottom: 4,
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
      }}>
        {label}
      </div>

      <div
        className="marquee-track"
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
        }}
      >
        <div style={{
          display: 'flex',
          gap: 6,
          width: 'max-content',
          transform: reverse ? 'translateX(-50%)' : 'translateX(0)',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration} linear infinite`,
        }}>
          {doubled.map((tag, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 3,
                border: `1px solid ${color}`,
                color,
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)',
                opacity: 0.85,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
