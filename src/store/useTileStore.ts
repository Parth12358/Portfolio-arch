import { create } from 'zustand'

export type TileId =
  | 'fastfetch'
  | 'projects'
  | 'activity'
  | 'terminal'
  | 'audio'
  | 'gameoflife'
  | 'projects-ws2'
  | 'timeline'
  | 'funfacts'
  | 'interests'
  | 'philosophy'
  | 'contact'
  | 'resume'

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
    { id: 'fastfetch',   workspace: 1 },
    { id: 'projects',    workspace: 1 },
    { id: 'activity',    workspace: 1 },
    { id: 'terminal',    workspace: 1 },
    { id: 'audio',       workspace: 1 },
    { id: 'gameoflife',  workspace: 1 },
    { id: 'timeline',    workspace: 4 },
    { id: 'funfacts',    workspace: 4 },
    { id: 'interests',   workspace: 4 },
    { id: 'philosophy',  workspace: 4 },
    { id: 'contact',     workspace: 4 },
    { id: 'resume',      workspace: 4 },
  ],
  tileOrder: {
    1: ['fastfetch', 'projects', 'activity', 'terminal', 'audio', 'gameoflife'],
    2: ['projects-ws2'],
    3: [],
    4: ['timeline', 'funfacts', 'interests', 'philosophy', 'contact', 'resume'],
  },
  setWorkspace: (ws) => set((state) => {
    if (state.activeWorkspace === ws) return state
    return { activeWorkspace: ws }
  }),
  reorderTiles: (workspaceId, newOrder) =>
    set((s) => ({
      tileOrder: { ...s.tileOrder, [workspaceId]: newOrder },
    })),
}))
