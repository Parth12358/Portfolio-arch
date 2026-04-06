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

async function fetchAllEvents(username: string): Promise<GitHubEvent[]> {
  const all: GitHubEvent[] = []
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100&page=${page}`
    )
    if (!res.ok) break
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) break
    all.push(...data)
  }
  return all
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
      fetchAllEvents(CONFIG.github.username),
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
