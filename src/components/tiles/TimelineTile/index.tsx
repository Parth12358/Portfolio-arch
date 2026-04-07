const TIMELINE = [
  {
    year: 'Aug 2022',
    title: 'Started at Penn State',
    desc: 'Enrolled in B.S. Computer Science with Minor in Entrepreneurship & Innovation. University Park, PA.',
    color: 'var(--bblue)',
    icon: '🎓',
  },
  {
    year: 'Oct 2023',
    title: 'HackHarvard — Likhit',
    desc: 'Built AI-powered handwriting platform at Harvard. Recognition among 600+ participants.',
    color: 'var(--baqua)',
    icon: '🏆',
  },
  {
    year: 'Jan 2024',
    title: 'Cofounded Technocrats',
    desc: 'Launched AI startup. Multi-modal content generation, TechCrunch Disrupt 2024.',
    color: 'var(--byellow)',
    icon: '🚀',
  },
  {
    year: 'Apr 2024',
    title: 'Bitcamp — The Moth Challenge',
    desc: '1st place cybersecurity track at University of Maryland. 550+ competitors.',
    color: 'var(--borange)',
    icon: '🏆',
  },
  {
    year: 'Nov 2024',
    title: 'HackUMass — VR Circuit Simulator',
    desc: 'Best VR Hack at UMass Amherst. 500+ competitors.',
    color: 'var(--bpurple)',
    icon: '🏆',
  },
  {
    year: 'Mar 2025',
    title: 'Compiled-6 — WarGames',
    desc: '3rd place ($500) at Penn State. Multi-agent AI accountability simulation.',
    color: 'var(--byellow)',
    icon: '🏆',
  },
  {
    year: 'May 2025',
    title: 'Detail Connect — Intern',
    desc: 'Mobile App Developer Intern. Flutter, Node.js, MongoDB. 30% UI improvement.',
    color: 'var(--baqua)',
    icon: '💼',
  },
  {
    year: 'May 2026',
    title: 'Penn State Graduation',
    desc: 'Expected graduation. B.S. Computer Science, GPA 3.54.',
    color: 'var(--bgreen)',
    icon: '🎓',
  },
]

export default function TimelineTile() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingRight: 4 }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 12, flexShrink: 0 }}>
        TIMELINE
      </div>

      <div style={{ position: 'relative', paddingLeft: 20 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 6, top: 6,
          bottom: 6, width: 1,
          background: 'var(--bg3)',
        }} />

        {TIMELINE.map((item, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 16 }}>
            {/* Dot */}
            <div style={{
              position: 'absolute', left: -17, top: 3,
              width: 9, height: 9, borderRadius: '50%',
              background: item.color,
              border: '2px solid var(--bg1)',
              flexShrink: 0,
            }} />

            {/* Content */}
            <div style={{ fontSize: 9, color: 'var(--fg4)', marginBottom: 2 }}>
              {item.year}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: item.color, marginBottom: 2,
            }}>
              {item.icon} {item.title}
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg3)', lineHeight: 1.6 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
