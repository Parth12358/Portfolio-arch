import { useGitHub } from '../../hooks/useGitHub'
import { useThemeStore } from '../../store/useThemeStore'
import { CONFIG } from '../../data/config'

function cellColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? '#1a3330' : 'var(--bg2)'
  if (count === 1) return isDark ? '#285A48' : 'var(--bg3)'
  if (count === 2) return isDark ? '#408A71' : 'var(--aqua)'
  if (count === 3) return isDark ? '#5aad96' : 'var(--green)'
  return isDark ? '#B0E4CC' : 'var(--bgreen)'
}

function buildWeekGrid(events: any[]): { date: string; count: number }[][] {
  const counts: Record<string, number> = {}
  events.forEach(e => {
    const date = e.created_at?.slice(0, 10)
    if (date) counts[date] = (counts[date] ?? 0) + 1
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const endSunday = new Date(today)
  endSunday.setDate(today.getDate() - today.getDay())
  const startSunday = new Date(endSunday)
  startSunday.setDate(endSunday.getDate() - 4 * 7)

  const weeks: { date: string; count: number }[][] = []
  for (let w = 0; w < 5; w++) {
    const week: { date: string; count: number }[] = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(startSunday)
      date.setDate(startSunday.getDate() + w * 7 + d)
      const key = date.toISOString().slice(0, 10)
      week.push({ date: key, count: counts[key] ?? 0 })
    }
    weeks.push(week)
  }
  return weeks
}

export default function ActivityScreen() {
  const { events, profile, loading } = useGitHub()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const commits = events
    .filter((e: any) => e.type === 'PushEvent')
    .flatMap((e: any) => (e.payload?.commits ?? []).map((c: any) => ({
      repo:    e.repo.name.replace(`${CONFIG.github.username}/`, ''),
      message: c.message?.split('\n')[0]?.slice(0, 60) ?? 'push',
      date:    e.created_at?.slice(0, 10) ?? '',
    })))
    .slice(0, 20)

  const weeks = buildWeekGrid(events)

  if (loading) return (
    <div style={{ padding: 24, fontSize: 12, color: 'var(--fg4)' }}>
      fetching activity...
    </div>
  )

  return (
    <div style={{ padding: '20px 16px 24px' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 16 }}>
        ACTIVITY — github.com/{profile?.login ?? CONFIG.github.username}
      </div>

      {/* Contribution graph */}
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 2, paddingBottom: 4 }}>
          {weeks.map((week, w) => (
            <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {week.map(cell => (
                <div key={cell.date} style={{
                  width: 12, height: 12, borderRadius: 2,
                  background: cellColor(cell.count, isDark),
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Commits */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 12 }}>
        RECENT COMMITS
      </div>
      {commits.length === 0 ? (
        <div style={{ fontSize: 11, color: 'var(--fg4)' }}>no push events found</div>
      ) : commits.map((c, i) => (
        <div key={i} style={{
          padding: '10px 12px',
          background: 'var(--bg1)',
          border: '1px solid var(--bg3)',
          borderRadius: 8,
          marginBottom: 8,
        }}>
          <div style={{ fontSize: 12, color: 'var(--bblue)', marginBottom: 2, fontWeight: 700 }}>{c.repo}</div>
          <div style={{ fontSize: 11, color: 'var(--fg3)', marginBottom: 4 }}>{c.message}</div>
          <div style={{ fontSize: 9, color: 'var(--fg4)' }}>{c.date}</div>
        </div>
      ))}

      <button
        onClick={() => window.open(`https://github.com/${CONFIG.github.username}`, '_blank')}
        style={{
          width: '100%', padding: '12px 0', borderRadius: 8, marginTop: 8,
          border: '1px solid var(--green)', color: 'var(--bgreen)',
          background: 'transparent', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 13, minHeight: 44,
        }}
      >
        view github ↗
      </button>
    </div>
  )
}
