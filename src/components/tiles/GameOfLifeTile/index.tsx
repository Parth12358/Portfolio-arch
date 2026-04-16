import { useEffect, useRef, useState, useCallback } from 'react'

const CELL = 10

function createEmpty(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(false))
}

function createRandom(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < 0.3)
  )
}

function nextGen(grid: boolean[][], rows: number, cols: number): boolean[][] {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      let neighbors = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = (r + dr + rows) % rows
          const nc = (c + dc + cols) % cols
          if (grid[nr][nc]) neighbors++
        }
      }
      return neighbors === 3 || (cell && neighbors === 2)
    })
  )
}

export default function GameOfLifeTile() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<boolean[][]>([])
  const rafRef = useRef(0)
  const rowsRef = useRef(0)
  const colsRef = useRef(0)

  const [running, setRunning] = useState(false)
  const [generation, setGeneration] = useState(0)
  const [population, setPopulation] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const isDrawing = useRef(false)

  const MULTIPLIERS = [1, 2, 4, 8]
  const BASE_MS = 200
  const speed = BASE_MS / multiplier

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const grid = gridRef.current
    const rows = rowsRef.current
    const cols = colsRef.current

    ctx.fillStyle = '#0d1e1c'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#1a3330'
    ctx.lineWidth = 0.5
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(cols * CELL, r * CELL); ctx.stroke()
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, rows * CELL); ctx.stroke()
    }

    let pop = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r]?.[c]) {
          pop++
          ctx.fillStyle = '#427b58'
          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 1, CELL - 1)
        }
      }
    }
    setPopulation(pop)
  }, [])

  const init = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const controlsHeight = 36
    const w = container.offsetWidth
    const h = container.offsetHeight - controlsHeight
    const cols = Math.floor(w / CELL)
    const rows = Math.floor(h / CELL)
    canvas.width = cols * CELL
    canvas.height = rows * CELL
    rowsRef.current = rows
    colsRef.current = cols
    gridRef.current = createRandom(rows, cols)
    setGeneration(0)
    draw()
  }, [draw])

  useEffect(() => {
    init()
    const observer = new ResizeObserver(init)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [init])

  useEffect(() => {
    if (!running) { cancelAnimationFrame(rafRef.current); return }
    let last = 0
    const tick = (ts: number) => {
      if (ts - last >= speed) {
        gridRef.current = nextGen(gridRef.current, rowsRef.current, colsRef.current)
        setGeneration(g => g + 1)
        draw()
        last = ts
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, speed, draw])

  const getCellFromEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const c = Math.floor((e.clientX - rect.left) / CELL)
    const r = Math.floor((e.clientY - rect.top) / CELL)
    return { r, c }
  }

  const toggleCell = (r: number, c: number) => {
    const rows = rowsRef.current; const cols = colsRef.current
    if (r < 0 || r >= rows || c < 0 || c >= cols) return
    const newGrid = gridRef.current.map(row => [...row])
    newGrid[r][c] = !newGrid[r][c]
    gridRef.current = newGrid
    draw()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true
    const { r, c } = getCellFromEvent(e)
    toggleCell(r, c)
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return
    const { r, c } = getCellFromEvent(e)
    const rows = rowsRef.current; const cols = colsRef.current
    if (r < 0 || r >= rows || c < 0 || c >= cols) return
    if (!gridRef.current[r][c]) {
      const newGrid = gridRef.current.map(row => [...row])
      newGrid[r][c] = true
      gridRef.current = newGrid
      draw()
    }
  }
  const handleMouseUp = () => { isDrawing.current = false }

  const btnStyle = (active = false): React.CSSProperties => ({
    fontSize: 9, padding: '3px 8px', borderRadius: 3,
    border: `1px solid ${active ? 'var(--baqua)' : 'var(--bg3)'}`,
    color: active ? 'var(--baqua)' : 'var(--fg4)',
    background: 'transparent', cursor: 'pointer',
    fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
  })

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>

      {/* Canvas */}
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, cursor: 'crosshair' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ display: 'block' }}
        />
      </div>

      {/* Controls */}
      <div style={{
        flexShrink: 0, padding: '4px 8px',
        borderTop: '1px solid var(--bg3)',
        display: 'flex', alignItems: 'center', gap: 5,
        flexWrap: 'wrap',
      }}>
        <button style={btnStyle(running)} onClick={() => setRunning(r => !r)}>
          {running ? '|| pause' : '> play'}
        </button>
        <button style={btnStyle()} onClick={() => {
          gridRef.current = createRandom(rowsRef.current, colsRef.current)
          setGeneration(0); draw()
        }}>
          random
        </button>
        <button style={btnStyle()} onClick={() => {
          gridRef.current = createEmpty(rowsRef.current, colsRef.current)
          setGeneration(0); setRunning(false); draw()
        }}>
          clear
        </button>

        <button
          style={btnStyle(multiplier > 1)}
          onClick={() => setMultiplier(m => MULTIPLIERS[(MULTIPLIERS.indexOf(m) + 1) % MULTIPLIERS.length])}
        >
          {multiplier}x
        </button>

        <div style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--fg4)', display: 'flex', gap: 10 }}>
          <span>gen <span style={{ color: 'var(--baqua)' }}>{generation}</span></span>
          <span>pop <span style={{ color: 'var(--baqua)' }}>{population}</span></span>
        </div>
      </div>
    </div>
  )
}
