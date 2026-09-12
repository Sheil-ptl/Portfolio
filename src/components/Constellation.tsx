import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONSTELLATION_NODES, CONSTELLATION_LINES } from '../lib/constellation'

const NODE_CONTENT: Record<string, React.ReactNode> = {
  alnilam: <p className="text-sm text-gray-300">🎵 Spotify integration coming soon.</p>,
  saiph: <p className="text-sm text-gray-300">Training for: [tournament name here]</p>,
  rigel: <p className="text-sm text-gray-300">Next hike: [trail name / date here]</p>,
}

export default function Constellation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeNode = CONSTELLATION_NODES.find((n) => n.id === hoveredId)

  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {CONSTELLATION_LINES.map(([fromId, toId]) => {
          const from = CONSTELLATION_NODES.find((n) => n.id === fromId)!
          const to = CONSTELLATION_NODES.find((n) => n.id === toId)!
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="rgba(180,180,180,0.35)"
              strokeWidth={1}
            />
          )
        })}
      </svg>

      {CONSTELLATION_NODES.map((node) =>
        node.interactive ? (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute w-3 h-3 rounded-full bg-gray-300 hover:scale-150 transition-transform cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px 2px rgba(200,200,200,0.5)',
            }}
            aria-label={node.label}
          />
        ) : (
          <div
            key={node.id}
            className="absolute w-2 h-2 rounded-full bg-gray-400"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 5px 1px rgba(160,160,160,0.4)',
            }}
          />
        )
      )}

      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-black/80 border border-gray-600 rounded-lg p-4 max-w-xs backdrop-blur-sm pointer-events-none"
            style={{
              left: `${activeNode.x}%`,
              top: `${activeNode.y}%`,
              transform: 'translate(-50%, 20px)',
            }}
          >
            <p className="text-white font-semibold mb-1">{activeNode.label}</p>
            {NODE_CONTENT[activeNode.id]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}