import { useState } from 'react'
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core'
import type { TileId } from '../../store/useTileStore'

interface Props {
  id: TileId
  title: string
  children: React.ReactNode
  dragListeners?: DraggableSyntheticListeners
  dragAttributes?: DraggableAttributes
  isDragging?: boolean
  noPadding?: boolean
  noOverflow?: boolean
}

export default function Tile({ id: _id, title, children, dragListeners, dragAttributes, isDragging, noPadding, noOverflow }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="tile-wrapper"
      style={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        background: 'var(--bg1)',
        border: hovered ? '1px solid var(--green)' : 'var(--win-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered
          ? '0 0 0 2px color-mix(in srgb, var(--green) 25%, transparent), var(--win-shadow)'
          : 'var(--win-shadow)',
        transition: 'border 0.15s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Titlebar — drag handle */}
      <div
        {...dragListeners}
        {...dragAttributes}
        style={{
          background: 'var(--bg2)',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          flexShrink: 0,
          borderBottom: '1px solid var(--bg3)',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        <span style={{
          fontSize: 10,
          color: hovered ? 'var(--green)' : 'var(--fg4)',
          fontFamily: 'var(--font-mono)',
          transition: 'color 0.2s ease',
        }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        overflow: noOverflow ? 'hidden' : 'auto',
        padding: noPadding ? 0 : '12px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        minHeight: 0,
      }}>
        {children}
      </div>
    </div>
  )
}
