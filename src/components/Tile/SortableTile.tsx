import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { TileId } from '../../store/useTileStore'
import Tile from './index'

interface Props {
  id: TileId
  title: string
  children: React.ReactNode
}

const NO_PADDING_TILES: TileId[] = ['terminal', 'fastfetch']
const NO_OVERFLOW_TILES: TileId[] = ['fastfetch']

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
    // Source tile stays in place — overlay follows the cursor
    transform: isDragging ? undefined : CSS.Transform.toString(transform),
    transition: isDragging ? undefined : (transition ?? 'transform 200ms ease'),
    // Source tile fades out — overlay takes its visual place
    opacity: isDragging ? 0 : 1,
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
        noOverflow={NO_OVERFLOW_TILES.includes(id)}
      >
        {children}
      </Tile>
    </div>
  )
}
