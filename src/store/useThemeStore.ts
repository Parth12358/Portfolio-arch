import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('portfolio-theme')
  if (stored === 'dark' || stored === 'light') return stored as Theme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '')
  localStorage.setItem('portfolio-theme', theme)
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    set({ theme: next })
  },
}))

// Init on import
const initial = getInitialTheme()
applyTheme(initial)
useThemeStore.setState({ theme: initial })
