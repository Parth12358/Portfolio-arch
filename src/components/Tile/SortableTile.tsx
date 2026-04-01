import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { TileId } from '../../store/useTileStore'
import Tile from './index'

interface Props {
  id: TileId
  title: string
  children: React.ReactNode
}

const NO_PADDING_TILES: TileId[] = ['terminal']

export default function SortableTile({ id, title, children }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 200ms ease',
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 0 : 1,
    height: '100%',
    width: '100%',
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Tile
        id={id}
        title={title}
        dragListeners={listeners}
        dragAttributes={attributes}
        isDragging={isDragging}
        noPadding={NO_PADDING_TILES.includes(id)}
      >
        {children}
      </Tile>
    </div>
  )
}
