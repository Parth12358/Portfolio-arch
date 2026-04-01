import { useEffect, useState } from 'react'
import { CONFIG } from '../data/config'

interface GitHubEvent {
  type: string
  created_at: string
  payload: { commits?: { message: string }[] }
  repo: { name: string }
}

interface GitHubProfile {
  public_repos: number
  followers: number
  login: string
}

export function useGitHub() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const base = `https://api.github.com/users/${CONFIG.github.username}`
    Promise.all([
      fetch(base).then(r => r.json()),
      fetch(`${base}/events?per_page=100`).then(r => r.json()),
    ])
      .then(([prof, evts]) => {
        setProfile(prof)
        setEvents(Array.isArray(evts) ? evts : [])
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return { events, profile, loading, error }
}
