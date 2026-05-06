'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const nodes = [
  { id: 'sql', label: 'SQL', x: 50, y: 50, type: 'skill', size: 12, color: '#8b5cf6' },
  { id: 'python', label: 'Python', x: 25, y: 30, type: 'skill', size: 10, color: '#8b5cf6' },
  { id: 'tableau', label: 'Tableau', x: 75, y: 30, type: 'skill', size: 10, color: '#06b6d4' },
  { id: 'powerbi', label: 'Power BI', x: 75, y: 70, type: 'skill', size: 9, color: '#06b6d4' },
  { id: 'aws', label: 'AWS', x: 15, y: 60, type: 'skill', size: 9, color: '#fb923c' },
  { id: 'azure', label: 'Azure', x: 85, y: 50, type: 'skill', size: 9, color: '#fb923c' },
  { id: 'amazon', label: 'Amazon', x: 25, y: 15, type: 'company', size: 14, color: '#FF9900' },
  { id: 'cvs', label: 'CVS', x: 75, y: 15, type: 'company', size: 14, color: '#CC0000' },
  { id: 'jpmc', label: 'JPMC', x: 50, y: 85, type: 'company', size: 14, color: '#005EB8' },
]

const edges = [
  { from: 'amazon', to: 'sql' },
  { from: 'amazon', to: 'python' },
  { from: 'amazon', to: 'tableau' },
  { from: 'amazon', to: 'aws' },
  { from: 'cvs', to: 'sql' },
  { from: 'cvs', to: 'python' },
  { from: 'cvs', to: 'powerbi' },
  { from: 'cvs', to: 'azure' },
  { from: 'jpmc', to: 'sql' },
  { from: 'jpmc', to: 'tableau' },
  { from: 'jpmc', to: 'azure' },
]

export default function SkillsNetwork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const isHighlighted = (id: string) => {
    if (!hoveredId) return true
    if (hoveredId === id) return true
    return edges.some(
      (e) => (e.from === hoveredId && e.to === id) || (e.to === hoveredId && e.from === id)
    )
  }

  const isEdgeHighlighted = (e: typeof edges[0]) => {
    if (!hoveredId) return true
    return e.from === hoveredId || e.to === hoveredId
  }

  return (
    <div ref={ref} className="mt-24">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Connection <span className="text-gradient">graph</span></h3>
          <p className="text-sm text-gray-500 mt-1">How skills connect across companies &mdash; hover to explore</p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400" style={{ boxShadow: '0 0 6px #8b5cf6' }} />
            <span className="text-gray-500">Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" style={{ boxShadow: '0 0 6px #fb923c' }} />
            <span className="text-gray-500">Company</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <svg viewBox="0 0 100 100" className="w-full aspect-[16/9] relative" preserveAspectRatio="xMidYMid meet">
          <defs>
            {edges.map((e, i) => {
              const fromNode = nodes.find((n) => n.id === e.from)!
              const toNode = nodes.find((n) => n.id === e.to)!
              return (
                <linearGradient key={i} id={`edge-${i}`} x1={`${fromNode.x}%`} y1={`${fromNode.y}%`} x2={`${toNode.x}%`} y2={`${toNode.y}%`} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={fromNode.color} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={toNode.color} stopOpacity="0.6" />
                </linearGradient>
              )
            })}
          </defs>

          {edges.map((e, i) => {
            const fromNode = nodes.find((n) => n.id === e.from)!
            const toNode = nodes.find((n) => n.id === e.to)!
            const highlighted = isEdgeHighlighted(e)
            return (
              <motion.line
                key={`${e.from}-${e.to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={`url(#edge-${i})`}
                strokeWidth={highlighted ? 0.4 : 0.15}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: highlighted ? 1 : 0.2 } : {}}
                transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}

          {nodes.map((n, i) => {
            const highlighted = isHighlighted(n.id)
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: highlighted ? 1 : 0.3, scale: 1 } : {}}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.size / 4}
                  fill={n.color}
                  fillOpacity={0.15}
                  animate={{ r: hoveredId === n.id ? n.size / 2.5 : n.size / 4 }}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.size / 6}
                  fill={n.color}
                  style={{ filter: `drop-shadow(0 0 ${highlighted ? '4px' : '1px'} ${n.color})` }}
                />
                <text
                  x={n.x}
                  y={n.y + n.size / 2.5 + 2.5}
                  textAnchor="middle"
                  fill={highlighted ? '#fff' : 'rgba(255,255,255,0.4)'}
                  fontSize="2"
                  fontFamily="ui-monospace, monospace"
                  style={{ userSelect: 'none' }}
                >
                  {n.label}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
