import { create } from 'zustand'

export type TileId =
  | 'fastfetch'
  | 'skills'
  | 'projects'
  | 'activity'
  | 'terminal'
  | 'audio'
  | 'threed'
  | 'bio'
  | 'contact'

export type Zone =
  | 'top-left' | 'top-right'
  | 'mid-left' | 'mid-right'
  | 'bottom-left' | 'bottom-right'
  | 'full-width' | 'full-height'

export interface TileState {
  id: TileId
  zone: Zone
  workspace: 1 | 2 | 3 | 4
  open: boolean
  focused: boolean
}

interface TileStore {
  tiles: TileState[]
  activeWorkspace: 1 | 2 | 3 | 4
  setWorkspace: (ws: 1 | 2 | 3 | 4) => void
  focusTile: (id: TileId) => void
  closeTile: (id: TileId) => void
  moveTile: (id: TileId, zone: Zone) => void
}

export const useTileStore = create<TileStore>((set) => ({
  activeWorkspace: 1,
  tiles: [
    { id: 'fastfetch', zone: 'top-left',     workspace: 1, open: true, focused: false },
    { id: 'skills',    zone: 'top-right',    workspace: 1, open: true, focused: false },
    { id: 'projects',  zone: 'mid-left',     workspace: 1, open: true, focused: false },
    { id: 'activity',  zone: 'mid-right',    workspace: 1, open: true, focused: false },
    { id: 'terminal',  zone: 'bottom-left',  workspace: 1, open: true, focused: false },
    { id: 'audio',     zone: 'bottom-right', workspace: 1, open: true, focused: false },
    { id: 'bio',       zone: 'top-left',     workspace: 4, open: true, focused: false },
    { id: 'contact',   zone: 'bottom-left',  workspace: 4, open: true, focused: false },
  ],
  setWorkspace: (ws) => set({ activeWorkspace: ws }),
  focusTile: (id) =>
    set((s) => ({
      tiles: s.tiles.map((t) => ({ ...t, focused: t.id === id })),
    })),
  closeTile: (id) =>
    set((s) => ({
      tiles: s.tiles.map((t) => (t.id === id ? { ...t, open: false } : t)),
    })),
  moveTile: (id, zone) =>
    set((s) => ({
      tiles: s.tiles.map((t) => (t.id === id ? { ...t, zone } : t)),
    })),
}))
