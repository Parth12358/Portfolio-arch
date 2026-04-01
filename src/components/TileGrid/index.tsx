import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { useTileStore } from '../../store/useTileStore'
import type { TileId } from '../../store/useTileStore'
import SortableTile from '../Tile/SortableTile'
import TileContent from '../tiles/TileContent'

interface Props { workspaceId: number }

export default function TileGrid({ workspaceId }: Props) {
  const { tileOrder, reorderTiles } = useTileStore()
  const [activeId, setActiveId] = useState<TileId | null>(null)

  const order = tileOrder[workspaceId] ?? []

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as TileId)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as TileId)
      const newIndex = order.indexOf(over.id as TileId)
      reorderTiles(workspaceId, arrayMove(order, oldIndex, newIndex))
    }
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div
          className="tile-grid"
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridAutoRows: '1fr',
            gap: 8,
            padding: 8,
            touchAction: 'none',
          }}
        >
          {order.map(id => (
            <SortableTile key={id} id={id} title={id}>
              <TileContent id={id} />
            </SortableTile>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--bg1)',
            border: '1px solid var(--yellow)',
            borderRadius: 'var(--radius-md)',
            opacity: 0.85,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            transform: 'rotate(1deg) scale(1.02)',
          }}>
            <div style={{
              padding: '4px 10px',
              background: 'var(--bg2)',
              borderBottom: '1px solid var(--bg3)',
              fontSize: 10,
              color: 'var(--fg4)',
              fontFamily: 'var(--font-mono)',
            }}>
              {activeId}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
