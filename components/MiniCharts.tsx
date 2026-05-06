'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Sparkline({ data, color = '#8b5cf6', height = 40, animate = true }: {
  data: number[]
  color?: string
  height?: number
  animate?: boolean
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const areaPath = `M0,${height} L${points.split(' ').join(' L')} L${width},${height} Z`
  const linePath = `M${points.split(' ').join(' L')}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#spark-${color})`}
        initial={animate ? { opacity: 0 } : undefined}
        whileInView={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0 } : undefined}
        whileInView={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  )
}

export function MiniBars({ data, color = '#8b5cf6', height = 40 }: {
  data: number[]
  color?: string
  height?: number
}) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 w-full" style={{ height }}>
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 rounded-sm"
          style={{
            background: `linear-gradient(180deg, ${color}, ${color}40)`,
            boxShadow: `0 0 4px ${color}80`,
          }}
        />
      ))}
    </div>
  )
}

export function Donut({ value, color = '#8b5cf6', size = 60, label }: {
  value: number
  color?: string
  size?: number
  label?: string
}) {
  const radius = size / 2 - 6
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - (value / 100) * circumference }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold" style={{ color }}>{value}%</span>
        {label && <span className="text-[8px] uppercase tracking-wider text-gray-500">{label}</span>}
      </div>
    </div>
  )
}

export function Scatter({ points, color = '#8b5cf6', height = 80 }: {
  points: { x: number; y: number; r?: number }[]
  color?: string
  height?: number
}) {
  return (
    <svg viewBox="0 0 100 100" className="w-full" style={{ height }} preserveAspectRatio="none">
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
      ))}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={100 - p.y}
          initial={{ r: 0, opacity: 0 }}
          whileInView={{ r: p.r || 2, opacity: 0.8 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          viewport={{ once: true }}
          fill={color}
          style={{ filter: `drop-shadow(0 0 2px ${color})` }}
        />
      ))}
    </svg>
  )
}

export function CountUp({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start: number | null = null
    let raf: number
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(to * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
      else setVal(to)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <span>{val}{suffix}</span>
}

export function LiveBars({ color = '#8b5cf6' }: { color?: string }) {
  const [heights, setHeights] = useState([60, 40, 80, 50, 70, 90, 45])
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => 30 + Math.random() * 70))
    }, 1500)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex items-end gap-1 h-full w-full">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="flex-1 rounded-sm"
          style={{ background: `linear-gradient(180deg, ${color}, ${color}30)` }}
        />
      ))}
    </div>
  )
}

export function PulseLine({ color = '#06b6d4' }: { color?: string }) {
  const [data, setData] = useState<number[]>(Array.from({ length: 20 }, () => 50 + Math.random() * 30))
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), 30 + Math.random() * 60])
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(' ')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pulse-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,100 ${points} 100,100`}
        fill="url(#pulse-grad)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        style={{ filter: `drop-shadow(0 0 2px ${color})` }}
      />
    </svg>
  )
}
