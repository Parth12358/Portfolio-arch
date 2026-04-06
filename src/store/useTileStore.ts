import { create } from 'zustand'

export type TileId =
  | 'fastfetch'
  | 'projects'
  | 'activity'
  | 'terminal'
  | 'audio'
  | 'threed'
  | 'bio'
  | 'contact'

export interface TileState {
  id: TileId
  workspace: 1 | 2 | 3 | 4
}

interface TileStore {
  tiles: TileState[]
  tileOrder: Record<number, TileId[]>
  activeWorkspace: 1 | 2 | 3 | 4
  setWorkspace: (ws: 1 | 2 | 3 | 4) => void
  reorderTiles: (workspaceId: number, newOrder: TileId[]) => void
}

export const useTileStore = create<TileStore>((set) => ({
  activeWorkspace: 1,
  tiles: [
    { id: 'fastfetch', workspace: 1 },
    { id: 'projects',  workspace: 1 },
    { id: 'activity',  workspace: 1 },
    { id: 'terminal',  workspace: 1 },
    { id: 'audio',     workspace: 1 },
    { id: 'bio',       workspace: 4 },
    { id: 'contact',   workspace: 4 },
  ],
  tileOrder: {
    1: ['fastfetch', 'projects', 'activity', 'terminal', 'audio'],
    2: [],
    3: [],
    4: ['bio', 'contact'],
  },
  setWorkspace: (ws) => set({ activeWorkspace: ws }),
  reorderTiles: (workspaceId, newOrder) =>
    set((s) => ({
      tileOrder: { ...s.tileOrder, [workspaceId]: newOrder },
    })),
}))
