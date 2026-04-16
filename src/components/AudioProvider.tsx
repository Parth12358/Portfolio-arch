import { useEffect } from 'react'
import { useAudioStore } from '../store/useAudioStore'

export default function AudioProvider() {
  const init = useAudioStore(s => s.init)

  useEffect(() => {
    init()
  }, [])

  return null
}
