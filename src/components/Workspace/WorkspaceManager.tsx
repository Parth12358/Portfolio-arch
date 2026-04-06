import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTileStore } from '../../store/useTileStore'
import Workspace from './index'

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function WorkspaceManager() {
  const { activeWorkspace } = useTileStore()
  const prevWS = useRef(activeWorkspace)
  const direction = activeWorkspace - prevWS.current
  prevWS.current = activeWorkspace

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={activeWorkspace}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
          <Workspace id={activeWorkspace} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
