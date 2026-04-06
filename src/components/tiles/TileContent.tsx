import type { TileId } from '../../store/useTileStore'
import FastfetchTile from './FastfetchTile'
import ProjectsTile from './ProjectsTile'
import ActivityTile from './ActivityTile'
import TerminalTile from './TerminalTile'
import AudioTile from './AudioTile'
import ThreeDTile from './ThreeDTile'
import BioTile from './BioTile'
import ContactTile from './ContactTile'

const MAP: Record<TileId, React.ComponentType> = {
  fastfetch: FastfetchTile,
  projects:  ProjectsTile,
  activity:  ActivityTile,
  terminal:  TerminalTile,
  audio:     AudioTile,
  threed:    ThreeDTile,
  bio:       BioTile,
  contact:   ContactTile,
}

export default function TileContent({ id }: { id: TileId }) {
  const Component = MAP[id]
  return <Component />
}
