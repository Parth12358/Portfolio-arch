import { useAudioStore } from '../../../store/useAudioStore'
import { CONFIG } from '../../../data/config'

const BAR_COUNT = 28

export default function AudioTile() {
  const { playing, muted, bars, currentTime, duration, togglePlay, toggleMute, seek } = useAudioStore()

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const barColor = !muted && playing ? 'var(--baqua)' : 'var(--bg4)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 8 }}>

      {/* Track info */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 2 }}>AUDIO</div>
        <div style={{ fontSize: 11, color: 'var(--fg)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {CONFIG.audio.title}
        </div>
        <div style={{ fontSize: 10, color: 'var(--fg4)' }}>{CONFIG.audio.artist}</div>
      </div>

      {/* Soundwave bars */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 2, minHeight: 0 }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: 1,
            borderRadius: '2px 2px 0 0',
            background: barColor,
            height: `${h}%`,
            transition: muted ? 'height 0.15s ease, background 0.3s ease' : 'height 0.05s ease, background 0.3s ease',
            minHeight: 2,
            opacity: playing ? 1 : 0.3,
          }} />
        ))}
      </div>

      {/* Seek bar */}
      {duration > 0 && (
        <div style={{ flexShrink: 0 }}>
          <input
            type="range" min={0} max={duration} value={currentTime} step={0.1}
            onChange={e => seek(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--baqua)', height: 3 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--fg4)', marginTop: 2 }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        <button
          onClick={togglePlay}
          style={{
            fontSize: 10, padding: '3px 10px', borderRadius: 3,
            border: '1px solid var(--baqua)', color: 'var(--baqua)',
            background: 'transparent', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--aqua)'; e.currentTarget.style.color = 'var(--bg0)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--baqua)' }}
        >
          {playing ? '⏸ pause' : '▶ play'}
        </button>

        <button
          onClick={toggleMute}
          style={{
            fontSize: 10, padding: '3px 8px', borderRadius: 3,
            border: `1px solid ${muted ? 'var(--red)' : 'var(--bg3)'}`,
            color: muted ? 'var(--red)' : 'var(--fg4)',
            background: 'transparent', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
          }}
        >
          {muted ? '🔇 muted' : '🔊 live'}
        </button>

        <div style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--fg4)' }}>
          {muted ? 'simulated' : 'live'}
        </div>
      </div>
    </div>
  )
}
