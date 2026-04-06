import { useGitHub } from '../../../hooks/useGitHub'
import { useThemeStore } from '../../../store/useThemeStore'
import { CONFIG } from '../../../data/config'

interface DayCell {
  date: string
  count: number
}

function buildWeekGrid(events: any[]): DayCell[][] {
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

  const weeks: DayCell[][] = []

  for (let w = 0; w < 5; w++) {
    const week: DayCell[] = []
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

function getMonthLabels(weeks: DayCell[][]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = []
  let lastMonth = ''
  weeks.forEach((week, i) => {
    const month = new Date(week[0].date).toLocaleString('default', { month: 'short' })
    if (month !== lastMonth) {
      labels.push({ label: month, col: i })
      lastMonth = month
    }
  })
  return labels
}

function cellColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? '#1a3330' : 'var(--bg2)'
  if (count === 1) return isDark ? '#285A48' : 'var(--bg3)'
  if (count === 2) return isDark ? '#408A71' : 'var(--aqua)'
  if (count === 3) return isDark ? '#5aad96' : 'var(--green)'
  return isDark ? '#B0E4CC' : 'var(--bgreen)'
}

export default function ActivityTile() {
  const { events, profile, loading, error } = useGitHub()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const weeks = buildWeekGrid(events)
  const monthLabels = getMonthLabels(weeks)
  const pushEvents = events.filter(e => e.type === 'PushEvent').slice(0, 4)

  if (loading) return <div style={{ color: 'var(--fg4)', fontSize: 11 }}>fetching activity...</div>
  if (error)   return <div style={{ color: 'var(--red)', fontSize: 11 }}>failed to load github data</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 8 }}>

      {/* Header */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, flexShrink: 0 }}>
        ACTIVITY — github.com/{profile?.login ?? CONFIG.github.username}
      </div>

      {/* Two columns */}
      <div style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden' }}>

        {/* LEFT — contribution graph */}
        <div style={{ flexShrink: 0 }}>
          <div>

            {/* Month labels */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `40px repeat(${weeks.length}, 20px)`,
              gap: '0 px',
              marginBottom: 2,
              fontSize: 10,
              color: 'var(--fg4)',
              fontFamily: 'var(--font-mono)',
            }}>
              <div />
              {weeks.map((_, i) => {
                const label = monthLabels.find(m => m.col === i)
                return <div key={i}>{label?.label ?? ''}</div>
              })}
            </div>

            {/* Day rows */}
            {[0,1,2,3,4,5,6].map(day => (
              <div
                key={day}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `24px repeat(${weeks.length}, 12px)`,
                  gap: '0 10px',
                  marginBottom: 4,
                  alignItems: 'center',
                }}
              >
                <div style={{
                  fontSize: 10, color: 'var(--fg4)',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'right', paddingRight: 4,
                }}>
                  {day === 1 ? 'Mon' : day === 3 ? 'Wed' : day === 5 ? 'Fri' : ''}
                </div>
                {weeks.map((week, wi) => (
                  <div
                    key={wi}
                    title={`${week[day].date}: ${week[day].count} contributions`}
                    style={{
                      width: 20, height: 20,
                      borderRadius: 2,
                      background: cellColor(week[day].count, isDark),
                      transition: 'background 0.3s ease',
                      cursor: 'default',
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Legend */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              marginTop: 6, justifyContent: 'flex-end',
              fontSize: 10, color: 'var(--fg4)', fontFamily: 'var(--font-mono)',
            }}>
              <span>less</span>
              {[0,1,2,3,4].map(l => (
                <div key={l} style={{
                  width: 20, height: 20, borderRadius: 2,
                  background: cellColor(l, isDark),
                }} />
              ))}
              <span>more</span>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, background: 'var(--bg3)', flexShrink: 0 }} />

        {/* RIGHT — recent repos + button */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
          <div style={{ fontSize: 10, color: 'var(--fg4)', marginBottom: 4 }}>recent commits</div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {pushEvents.length === 0
              ? <div style={{ fontSize: 11, color: 'var(--fg4)' }}>no recent push events</div>
              : pushEvents.map((e, i) => (
                <div key={i} style={{ fontSize: 11, color: 'var(--fg3)', marginBottom: 6, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--byellow)', flexShrink: 0 }}>›</span>
                  <div>
                    <div style={{ color: 'var(--bblue)', fontSize: 10, marginBottom: 1 }}>{e.repo.name}</div>
                    <div style={{ color: 'var(--fg4)', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {e.payload?.commits?.[0]?.message?.slice(0, 40) ?? 'push event'}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* View GitHub button pinned to bottom */}
          <button
            onClick={() => window.open(`https://github.com/${CONFIG.github.username}`, '_blank')}
            style={{
              marginTop: 'auto', fontSize: 10, padding: '3px 10px',
              borderRadius: 3, border: '1px solid var(--green)',
              color: 'var(--bgreen)', background: 'transparent',
              cursor: 'pointer', fontFamily: 'var(--font-mono)',
              transition: 'all 0.15s', flexShrink: 0, alignSelf: 'flex-start',
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
            view github ↗
          </button>
        </div>
      </div>
    </div>
  )
}
