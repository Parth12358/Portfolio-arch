import { create } from 'zustand'
import { CONFIG } from '../data/config'

const BAR_COUNT = 28

function generateFakeBars(time: number): number[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const wave1 = Math.sin(time * 1.2 + i * 0.4) * 0.3 + 0.5
    const wave2 = Math.sin(time * 2.1 + i * 0.7) * 0.2 + 0.3
    const wave3 = Math.sin(time * 0.8 + i * 1.1) * 0.15 + 0.2
    return Math.max(4, ((wave1 + wave2 + wave3) / 1.4) * 85)
  })
}

interface AudioStore {
  playing: boolean
  muted: boolean
  currentTime: number
  duration: number
  bars: number[]

  audio: HTMLAudioElement | null
  ctx: AudioContext | null
  analyser: AnalyserNode | null
  source: MediaElementAudioSourceNode | null
  rafId: number
  fakeRafId: number
  fakeStartTime: number

  init: () => void
  togglePlay: () => void
  toggleMute: () => void
  seek: (time: number) => void
  setBars: (bars: number[]) => void
  setCurrentTime: (t: number) => void
  setDuration: (t: number) => void
  setPlaying: (v: boolean) => void
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  playing: false,
  muted: true,
  currentTime: 0,
  duration: 0,
  bars: Array(BAR_COUNT).fill(4),

  audio: null,
  ctx: null,
  analyser: null,
  source: null,
  rafId: 0,
  fakeRafId: 0,
  fakeStartTime: 0,

  setBars: (bars) => set({ bars }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setPlaying: (playing) => set({ playing }),

  init: () => {
    if (get().audio) return

    const audio = new Audio(CONFIG.audio.src)
    audio.muted = true
    audio.loop = true

    audio.addEventListener('loadedmetadata', () => get().setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => get().setCurrentTime(audio.currentTime))

    const startFake = () => {
      set({ playing: true, fakeStartTime: Date.now() })
      const tick = () => {
        const elapsed = (Date.now() - get().fakeStartTime) / 1000
        get().setBars(generateFakeBars(elapsed))
        set({ fakeRafId: requestAnimationFrame(tick) })
      }
      tick()
    }

    set({ audio })

    // Start fake visualizer immediately — don't wait for play() promise
    startFake()

    // Attempt autoplay (allowed by browsers when muted)
    audio.play().catch(() => {
      // If blocked, retry on first user interaction
      const resume = () => {
        audio.play().catch(() => {})
        document.removeEventListener('click', resume)
        document.removeEventListener('keydown', resume)
      }
      document.addEventListener('click', resume)
      document.addEventListener('keydown', resume)
    })
  },

  togglePlay: () => {
    const { audio, playing, muted } = get()
    if (!audio) return

    if (playing) {
      audio.pause()
      cancelAnimationFrame(get().fakeRafId)
      cancelAnimationFrame(get().rafId)
      set({ playing: false, bars: Array(BAR_COUNT).fill(4) })
    } else {
      let { ctx, analyser, source } = get()
      if (!source) {
        ctx = new AudioContext()
        analyser = ctx.createAnalyser()
        analyser.fftSize = 64
        source = ctx.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(ctx.destination)
        set({ ctx, analyser, source })
      }
      ctx?.resume()
      audio.play()
      set({ playing: true, fakeStartTime: Date.now() })
      if (muted) {
        const tick = () => {
          const elapsed = (Date.now() - get().fakeStartTime) / 1000
          get().setBars(generateFakeBars(elapsed))
          set({ fakeRafId: requestAnimationFrame(tick) })
        }
        tick()
      } else {
        const tick = () => {
          if (!get().analyser) return
          const data = new Uint8Array(get().analyser!.frequencyBinCount)
          get().analyser!.getByteFrequencyData(data)
          get().setBars(Array.from(data.slice(0, BAR_COUNT)).map(v => Math.max(4, (v / 255) * 100)))
          set({ rafId: requestAnimationFrame(tick) })
        }
        tick()
      }
    }
  },

  toggleMute: () => {
    const { audio, muted, playing } = get()
    if (!audio) return

    const newMuted = !muted
    audio.muted = newMuted
    set({ muted: newMuted })

    if (!playing) return

    if (newMuted) {
      cancelAnimationFrame(get().rafId)
      set({ fakeStartTime: Date.now() })
      const tick = () => {
        const elapsed = (Date.now() - get().fakeStartTime) / 1000
        get().setBars(generateFakeBars(elapsed))
        set({ fakeRafId: requestAnimationFrame(tick) })
      }
      tick()
    } else {
      cancelAnimationFrame(get().fakeRafId)
      let { ctx, analyser, source } = get()
      if (!source) {
        ctx = new AudioContext()
        analyser = ctx.createAnalyser()
        analyser.fftSize = 64
        source = ctx.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(ctx.destination)
        set({ ctx, analyser, source })
      }
      ctx?.resume()
      const tick = () => {
        if (!get().analyser) return
        const data = new Uint8Array(get().analyser!.frequencyBinCount)
        get().analyser!.getByteFrequencyData(data)
        get().setBars(Array.from(data.slice(0, BAR_COUNT)).map(v => Math.max(4, (v / 255) * 100)))
        set({ rafId: requestAnimationFrame(tick) })
      }
      tick()
    }
  },

  seek: (time) => {
    const { audio } = get()
    if (!audio) return
    audio.currentTime = time
    set({ currentTime: time })
  },
}))
