import { useState } from 'react'
import MobileHeader from './components/MobileHeader'
import MobileTabBar from './components/MobileTabBar'
import MobileCTA from './components/MobileCTA'
import HomeScreen from './screens/HomeScreen'
import ProjectsScreen from './screens/ProjectsScreen'
import ActivityScreen from './screens/ActivityScreen'
import BioScreen from './screens/BioScreen'

export type MobileTab = 'home' | 'projects' | 'activity' | 'bio'

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState<MobileTab>('home')

  const screens: Record<MobileTab, React.ReactNode> = {
    home:     <HomeScreen />,
    projects: <ProjectsScreen />,
    activity: <ActivityScreen />,
    bio:      <BioScreen />,
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg0)',
      fontFamily: 'var(--font-mono)',
      overflow: 'hidden',
    }}>
      <MobileHeader activeTab={activeTab} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {screens[activeTab]}
      </div>

      <MobileCTA />
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
