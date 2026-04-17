import { useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore'
import { useMobile } from './hooks/useMobile'
import Waybar from './components/Waybar'
import WorkspaceManager from './components/Workspace/WorkspaceManager'
import AudioProvider from './components/AudioProvider'
import MobileApp from './mobile/MobileApp'
import ContactCTA from './components/ContactCTA'
import './styles/globals.css'

export default function App() {
  const { setTheme } = useThemeStore()
  const isMobile = useMobile()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('portfolio-theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [setTheme])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault()
        useThemeStore.getState().toggleTheme()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (isMobile) return <MobileApp />

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', background: 'var(--bg0)',
    }}>
      <AudioProvider />
      <Waybar />
      <WorkspaceManager />
      <ContactCTA />
    </div>
  )
}
