import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
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

// Workspace 1: tile → grid-area mapping (swapped on drop to make drag work with named areas)
const WS1_AREAS: Record<TileId, string> = {
  fastfetch:  'fastfetch',
  projects:   'projects',
  activity:   'activity',
  gameoflife: 'gameoflife',
  terminal:   'terminal',
  audio:      'audio',
} as Record<TileId, string>

export default function TileGrid({ workspaceId }: Props) {
  const { tileOrder, reorderTiles } = useTileStore()
  const [activeId, setActiveId] = useState<TileId | null>(null)

  // Workspace 1: swap grid-area assignments on drop (named areas + rectSortingStrategy
  // are incompatible — arrayMove on order has no visual effect when areas are hardcoded)
  const [areaMap, setAreaMap] = useState<Record<TileId, string>>(WS1_AREAS)

  const order = tileOrder[workspaceId] ?? []

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as TileId)
  }

  const handleDragOver = (_e: DragOverEvent) => {
    // No-op for ws1: live reorder via arrayMove doesn't work with named grid areas.
    // The visual swap happens on dragEnd via areaMap.
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (workspaceId === 1 && over && active.id !== over.id) {
      const activeKey = active.id as TileId
      const overKey = over.id as TileId
      setAreaMap(prev => ({
        ...prev,
        [activeKey]: prev[overKey],
        [overKey]:   prev[activeKey],
      }))
    } else if (workspaceId !== 1 && over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as TileId)
      const newIndex = order.indexOf(over.id as TileId)
      if (oldIndex !== newIndex) {
        reorderTiles(workspaceId, arrayMove(order, oldIndex, newIndex))
      }
    }
    setActiveId(null)
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

  if (workspaceId === 4) {
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
              gridTemplateColumns: '1fr 1fr 1.2fr',
              gridTemplateRows: '1fr 1fr 0.6fr',
              gridTemplateAreas: `
                "timeline   funfacts  resume"
                "timeline   interests resume"
                "philosophy contact   resume"
              `,
              gap: 8,
              padding: 8,
              boxSizing: 'border-box',
              overflow: 'hidden',
              touchAction: 'none',
            }}
          >
            <div style={{ gridArea: 'timeline',   minHeight: 0 }}>
              <SortableTile id="timeline" title="timeline">
                <TileContent id="timeline" />
              </SortableTile>
            </div>
            <div style={{ gridArea: 'funfacts',   minHeight: 0 }}>
              <SortableTile id="funfacts" title="fun facts">
                <TileContent id="funfacts" />
              </SortableTile>
            </div>
            <div style={{ gridArea: 'interests',  minHeight: 0 }}>
              <SortableTile id="interests" title="interests">
                <TileContent id="interests" />
              </SortableTile>
            </div>
            <div style={{ gridArea: 'philosophy', minHeight: 0 }}>
              <SortableTile id="philosophy" title="philosophy">
                <TileContent id="philosophy" />
              </SortableTile>
            </div>
            <div style={{ gridArea: 'contact',    minHeight: 0 }}>
              <SortableTile id="contact" title="contact">
                <TileContent id="contact" />
              </SortableTile>
            </div>
            <div style={{ gridArea: 'resume', minHeight: 0, minWidth: 0 }}>
              <SortableTile id="resume" title="resume">
                <TileContent id="resume" />
              </SortableTile>
            </div>
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          {activeId ? (
            <div style={{
              background: 'var(--bg1)', border: '1px solid var(--green)',
              borderRadius: 'var(--radius-md)', opacity: 0.9, minHeight: 120,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)', padding: '4px 10px',
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg4)',
            }}>
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  }

  if (workspaceId === 1) {
    const ws1Ids = Object.keys(areaMap) as TileId[]
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ws1Ids} strategy={rectSortingStrategy}>
          <div
            className="tile-grid"
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '48% 30% 21%',
              gridTemplateRows: '30% 40% 28%',
              gridTemplateAreas: `
                "fastfetch projects   projects"
                "fastfetch activity   gameoflife"
                "terminal  audio      audio"
              `,
              gap: 8,
              padding: 8,
              boxSizing: 'border-box',
              overflow: 'hidden',
              touchAction: 'none',
            }}
          >
            {(Object.keys(areaMap) as TileId[]).map(id => (
              <div key={id} style={{ gridArea: areaMap[id], minHeight: 0, minWidth: 0 }}>
                <SortableTile id={id} title={id === 'gameoflife' ? 'game of life' : id}>
                  <TileContent id={id} />
                </SortableTile>
              </div>
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          {activeId ? (
            <div style={{
              background: 'var(--bg1)',
              border: '1px solid var(--green)',
              borderRadius: 'var(--radius-md)',
              opacity: 0.9,
              minHeight: 80,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--fg4)',
            }}>
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
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
