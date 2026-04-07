import type { TileId } from '../../store/useTileStore'
import FastfetchTile from './FastfetchTile'
import ProjectsTile from './ProjectsTile'
import ActivityTile from './ActivityTile'
import TerminalTile from './TerminalTile'
import AudioTile from './AudioTile'
import ProjectsWorkspaceTile from './ProjectsWorkspaceTile'
import TimelineTile from './TimelineTile'
import FunFactsTile from './FunFactsTile'
import InterestsTile from './InterestsTile'
import PhilosophyTile from './PhilosophyTile'
import ContactTile from './ContactTile'

const MAP: Record<TileId, React.ComponentType> = {
  fastfetch:      FastfetchTile,
  projects:       ProjectsTile,
  activity:       ActivityTile,
  terminal:       TerminalTile,
  audio:          AudioTile,
  'projects-ws2': ProjectsWorkspaceTile,
  timeline:       TimelineTile,
  funfacts:       FunFactsTile,
  interests:      InterestsTile,
  philosophy:     PhilosophyTile,
  contact:        ContactTile,
}

export default function TileContent({ id }: { id: TileId }) {
  const Component = MAP[id]
  return <Component />
}
