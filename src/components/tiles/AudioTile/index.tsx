import { useRef, useState, useEffect } from 'react'

export default function AudioTile() {
  const [file, setFile] = useState<File | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [bars, setBars] = useState<number[]>(Array(24).fill(2))
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const rafRef = useRef<number>(0)

  const setupAudio = (audio: HTMLAudioElement) => {
    if (sourceRef.current) return
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64
    const source = ctx.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    ctxRef.current = ctx
    analyserRef.current = analyser
    sourceRef.current = source
  }

  const tick = () => {
    if (!analyserRef.current) return
    const data = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(data)
    setBars(Array.from(data.slice(0, 24)).map(v => Math.max(2, (v / 255) * 100)))
    rafRef.current = requestAnimationFrame(tick)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    const url = URL.createObjectURL(f)
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.muted = muted
    }
  }

  const togglePlay = () => {
    if (!audioRef.current || !file) return
    setupAudio(audioRef.current)
    if (playing) {
      audioRef.current.pause()
      cancelAnimationFrame(rafRef.current)
      setBars(Array(24).fill(2))
    } else {
      ctxRef.current?.resume()
      audioRef.current.play()
      tick()
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted
    setMuted(!muted)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1 }}>AUDIO</div>

      {/* Bar visualizer */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 60, flex: 1 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1, borderRadius: '2px 2px 0 0',
              background: playing && !muted ? 'var(--green)' : 'var(--bg3)',
              height: `${h}%`,
              transition: 'height 0.05s ease, background 0.3s ease',
              minHeight: 2,
            }}
          />
        ))}
      </div>

      {/* Filename */}
      <div style={{ fontSize: 10, color: 'var(--fg4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {file ? file.name : 'no file loaded'}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button
          onClick={togglePlay}
          disabled={!file}
          style={{
            fontSize: 10, padding: '3px 10px', borderRadius: 3,
            border: `1px solid ${file ? 'var(--green)' : 'var(--bg3)'}`,
            color: file ? 'var(--bgreen)' : 'var(--fg4)',
            background: 'transparent', cursor: file ? 'pointer' : 'default',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {playing ? '⏸ pause' : '▶ play'}
        </button>

        <button
          onClick={toggleMute}
          style={{
            fontSize: 10, padding: '3px 8px', borderRadius: 3,
            border: '1px solid var(--bg3)', color: muted ? 'var(--red)' : 'var(--fg4)',
            background: 'transparent', cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {muted ? '🔇' : '🔊'}
        </button>

        <label style={{
          fontSize: 10, padding: '3px 8px', borderRadius: 3,
          border: '1px solid var(--bg3)', color: 'var(--fg4)',
          cursor: 'pointer', fontFamily: 'var(--font-mono)',
        }}>
          upload
          <input type="file" accept="audio/*" onChange={handleFile} style={{ display: 'none' }} />
        </label>
      </div>

      <audio ref={audioRef} muted={muted} />
    </div>
  )
}
