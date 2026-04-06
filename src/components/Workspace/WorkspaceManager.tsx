import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTileStore } from '../../store/useTileStore'
import Workspace from './index'

export default function WorkspaceManager() {
  const { activeWorkspace } = useTileStore()
  const prevWS = useRef(activeWorkspace)
  const direction = activeWorkspace - prevWS.current
  prevWS.current = activeWorkspace

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={activeWorkspace}
          custom={direction}
          initial={{ x: direction >= 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction >= 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{
            x: { type: 'tween', duration: 0.2, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.15 },
          }}
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform',
          }}
        >
          <Workspace id={activeWorkspace} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
