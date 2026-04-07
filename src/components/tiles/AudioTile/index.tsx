import { useRef, useState, useEffect, useCallback } from 'react'
import { CONFIG } from '../../../data/config'

const BAR_COUNT = 28

function generateFakeBars(time: number): number[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const wave1 = Math.sin(time * 1.2 + i * 0.4) * 0.3 + 0.5
    const wave2 = Math.sin(time * 2.1 + i * 0.7) * 0.2 + 0.3
    const wave3 = Math.sin(time * 0.8 + i * 1.1) * 0.15 + 0.2
    const combined = (wave1 + wave2 + wave3) / 1.4
    return Math.max(4, combined * 85)
  })
}

export default function AudioTile() {
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(4))
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const rafRef = useRef<number>(0)
  const fakeRafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const setupAudio = useCallback(() => {
    if (sourceRef.current || !audioRef.current) return
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64
    const source = ctx.createMediaElementSource(audioRef.current)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    ctxRef.current = ctx
    analyserRef.current = analyser
    sourceRef.current = source
  }, [])

  const stopFake = useCallback(() => {
    cancelAnimationFrame(fakeRafRef.current)
  }, [])

  const stopReal = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
  }, [])

  const tickReal = useCallback(() => {
    if (!analyserRef.current) return
    const data = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(data)
    setBars(Array.from(data.slice(0, BAR_COUNT)).map(v => Math.max(4, (v / 255) * 100)))
    rafRef.current = requestAnimationFrame(tickReal)
  }, [])

  const tickFake = useCallback(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    setBars(generateFakeBars(elapsed))
    fakeRafRef.current = requestAnimationFrame(tickFake)
  }, [])

  useEffect(() => {
    const audio = new Audio(CONFIG.audio.src)
    audio.muted = true
    audio.loop = true
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))

    audio.play().then(() => {
      setPlaying(true)
      startTimeRef.current = Date.now()
      tickFake()
    }).catch(() => {
      // Autoplay blocked — user must click play
    })

    return () => {
      audio.pause()
      stopFake()
      stopReal()
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return
    const newMuted = !muted
    audioRef.current.muted = newMuted
    setMuted(newMuted)

    if (newMuted) {
      stopReal()
      startTimeRef.current = Date.now()
      tickFake()
    } else {
      stopFake()
      setupAudio()
      ctxRef.current?.resume()
      tickReal()
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      stopFake()
      stopReal()
      setBars(Array(BAR_COUNT).fill(4))
    } else {
      setupAudio()
      ctxRef.current?.resume()
      audioRef.current.play()
      startTimeRef.current = Date.now()
      if (muted) tickFake()
      else tickReal()
    }
    setPlaying(!playing)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

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
        <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 2 }}>
          AUDIO
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {CONFIG.audio.title}
        </div>
        <div style={{ fontSize: 10, color: 'var(--fg4)' }}>
          {CONFIG.audio.artist}
        </div>
      </div>

      {/* Soundwave bars */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 2, minHeight: 0 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: '2px 2px 0 0',
              background: barColor,
              height: `${h}%`,
              transition: muted
                ? 'height 0.15s ease, background 0.3s ease'
                : 'height 0.05s ease, background 0.3s ease',
              minHeight: 2,
              opacity: playing ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Seek bar */}
      {duration > 0 && (
        <div style={{ flexShrink: 0 }}>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            step={0.1}
            onChange={handleSeek}
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
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--aqua)'
            e.currentTarget.style.color = 'var(--bg0)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--baqua)'
          }}
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
