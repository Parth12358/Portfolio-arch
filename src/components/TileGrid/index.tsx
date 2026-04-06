import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  MeasuringStrategy,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { useTileStore } from '../../store/useTileStore'
import type { TileId } from '../../store/useTileStore'
import SortableTile from '../Tile/SortableTile'
import Tile from '../Tile'
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

  // KEY FIX: reorder the DOM array live during drag, not just on drop
  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = order.indexOf(active.id as TileId)
    const newIndex = order.indexOf(over.id as TileId)
    if (oldIndex !== newIndex) {
      reorderTiles(workspaceId, arrayMove(order, oldIndex, newIndex))
    }
  }

  const handleDragEnd = (e: DragEndEvent) => {
    // Order is already correct from onDragOver — just clear active
    setActiveId(null)
  }

  const measuring = {
    droppable: { strategy: MeasuringStrategy.Always },
  }

  const dropAnimation = {
    duration: 200,
    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
  }

  const dragOverlay = activeId ? (
    <div style={{
      width: '100%',
      height: '100%',
      opacity: 0.9,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      transform: 'scale(1.02) rotate(0.5deg)',
      transformOrigin: 'center center',
    }}>
      <Tile id={activeId} title={activeId} isDragging>
        <TileContent id={activeId} />
      </Tile>
    </div>
  ) : null

  // Workspace 1: positions driven by array index so drag-and-drop actually reorders tiles.
  // Index 0 always gets the 2-row left span — fastfetch starts there, but any tile can land there.
  // rectSortingStrategy measures fastfetch's full 2-row bounding box, so dragging it displaces 2 tiles.
  const W1_POSITIONS: React.CSSProperties[] = [
    { gridColumn: '1', gridRow: '1 / span 2' }, // 0 — double-height left slot
    { gridColumn: '2', gridRow: '1' },           // 1 — top right
    { gridColumn: '2', gridRow: '2' },           // 2 — bottom right
    { gridColumn: '1', gridRow: '3' },           // 3 — bottom left
    { gridColumn: '2', gridRow: '3' },           // 4 — bottom right
  ]

  if (workspaceId === 2) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        padding: 8,
        boxSizing: 'border-box',
      }}>
        <SortableTile id="projects-ws2" title="projects">
          <TileContent id="projects-ws2" />
        </SortableTile>
      </div>
    )
  }

  if (workspaceId === 1) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        measuring={measuring}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={rectSortingStrategy}>
          <div
            className="tile-grid"
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr 0.6fr',
              gap: 8,
              padding: 8,
              boxSizing: 'border-box',
              overflow: 'hidden',
              touchAction: 'none',
            }}
          >
            {order.map((id, i) => (
              <div key={id} style={{ ...W1_POSITIONS[i], minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
                <SortableTile id={id} title={id}>
                  <TileContent id={id} />
                </SortableTile>
              </div>
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={dropAnimation}>{dragOverlay}</DragOverlay>
      </DndContext>
    )
  }

  // All other workspaces — uniform sortable grid
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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

      <DragOverlay dropAnimation={dropAnimation}>{dragOverlay}</DragOverlay>
    </DndContext>
  )
}
