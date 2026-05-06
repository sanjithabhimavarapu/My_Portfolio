'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import SkillsNetwork from './SkillsNetwork'

const skillCategories = [
  {
    title: 'Analytics',
    proficiency: 95,
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'SQL', level: 98 },
      { name: 'Python', level: 90 },
      { name: 'Data Analysis', level: 95 },
      { name: 'Statistical Analysis', level: 88 },
      { name: 'ETL Processes', level: 92 },
      { name: 'Data Modeling', level: 90 },
    ],
  },
  {
    title: 'Visualization',
    proficiency: 92,
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Tableau', level: 95 },
      { name: 'Power BI', level: 92 },
      { name: 'Excel (Advanced)', level: 95 },
      { name: 'KPI Tracking', level: 90 },
      { name: 'Dashboard Dev', level: 93 },
    ],
  },
  {
    title: 'Databases',
    proficiency: 90,
    color: '#f472b6',
    gradient: 'from-fuchsia-500 to-pink-500',
    skills: [
      { name: 'SQL Server', level: 95 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 90 },
      { name: 'Oracle', level: 82 },
      { name: 'Redshift', level: 88 },
      { name: 'Azure SQL', level: 85 },
    ],
  },
  {
    title: 'Cloud',
    proficiency: 87,
    color: '#fb923c',
    gradient: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'AWS S3', level: 90 },
      { name: 'Redshift', level: 88 },
      { name: 'AWS Glue', level: 82 },
      { name: 'Azure DF', level: 85 },
      { name: 'Synapse', level: 80 },
      { name: 'Data Warehouse', level: 90 },
    ],
  },
  {
    title: 'Business',
    proficiency: 95,
    color: '#34d399',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Requirements', level: 98 },
      { name: 'Stakeholders', level: 95 },
      { name: 'BRD/FRD Docs', level: 95 },
      { name: 'Process Analysis', level: 93 },
      { name: 'Agile/Scrum', level: 90 },
    ],
  },
  {
    title: 'AI/ML',
    proficiency: 82,
    color: '#a78bfa',
    gradient: 'from-indigo-500 to-violet-500',
    skills: [
      { name: 'Model Interp', level: 85 },
      { name: 'Regression', level: 88 },
      { name: 'Classification', level: 82 },
      { name: 'Clustering', level: 80 },
    ],
  },
]

function AnimatedNumber({ value, isInView }: { value: number; isInView: boolean }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
      const unsubscribe = rounded.on('change', (v) => setDisplay(v))
      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [count, rounded, value, isInView])

  return <span>{display}</span>
}

function RadarChart({ activeIndex, isInView }: { activeIndex: number; isInView: boolean }) {
  const cx = 200
  const cy = 200
  const radius = 140
  const sides = skillCategories.length
  const angleStep = (Math.PI * 2) / sides

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2
    const r = (value / 100) * radius
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    }
  }

  const points = skillCategories.map((cat, i) => getPoint(cat.proficiency, i))
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((scale) => {
        const ringPoints = skillCategories.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          return `${cx + Math.cos(angle) * radius * scale},${cy + Math.sin(angle) * radius * scale}`
        }).join(' ')
        return (
          <polygon
            key={scale}
            points={ringPoints}
            fill="none"
            stroke="rgba(139, 92, 246, 0.08)"
            strokeWidth="1"
          />
        )
      })}

      {skillCategories.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2
        const x2 = cx + Math.cos(angle) * radius
        const y2 = cy + Math.sin(angle) * radius
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth="1"
          />
        )
      })}

      <motion.path
        d={pathD}
        fill="url(#radarFill)"
        stroke="#8b5cf6"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {points.map((p, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={activeIndex === i ? 8 : 5}
            fill={skillCategories[i].color}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
            style={{ filter: `drop-shadow(0 0 6px ${skillCategories[i].color})` }}
          />
        </motion.g>
      ))}

      {skillCategories.map((cat, i) => {
        const angle = i * angleStep - Math.PI / 2
        const labelR = radius + 30
        const x = cx + Math.cos(angle) * labelR
        const y = cy + Math.sin(angle) * labelR
        return (
          <motion.text
            key={cat.title}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-mono uppercase tracking-wider"
            fill={activeIndex === i ? cat.color : 'rgba(200, 200, 200, 0.6)'}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {cat.title}
          </motion.text>
        )
      })}
    </svg>
  )
}

function SkillBar({ skill, color, delay, isInView }: {
  skill: { name: string; level: number }
  color: string
  delay: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group"
      data-cursor-hover
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
        <span className="text-xs font-mono" style={{ color }}>
          <AnimatedNumber value={skill.level} isInView={isInView} />%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        >
          <motion.div
            animate={{ x: ['0%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: delay + 1 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function CircularProgress({ value, color, label, delay, isInView }: {
  value: number
  color: string
  label: string
  delay: number
  isInView: boolean
}) {
  const circumference = 2 * Math.PI * 28
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: 'spring' }}
      className="flex flex-col items-center gap-2"
      data-cursor-hover
    >
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - (value / 100) * circumference } : {}}
            transition={{ delay: delay + 0.3, duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>
            <AnimatedNumber value={value} isInView={isInView} />
          </span>
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const active = skillCategories[activeIndex]

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: `${active.color}15` }} />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: `${active.color}10` }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-violet-400/50 text-sm tracking-[0.3em] uppercase">03</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Tools & <span className="text-gradient">technologies</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm tracking-wider uppercase mb-16"
        >
          Click categories to explore proficiency
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 relative">
            <div className="aspect-square max-w-[450px] mx-auto relative">
              <RadarChart activeIndex={activeIndex} isInView={isInView} />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
              >
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Overall</div>
                <div className="text-4xl font-bold text-gradient">
                  <AnimatedNumber value={Math.round(skillCategories.reduce((a, c) => a + c.proficiency, 0) / skillCategories.length)} isInView={isInView} />%
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {skillCategories.map((cat, i) => (
                <motion.button
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  onClick={() => setActiveIndex(i)}
                  className={`relative px-3 py-2 rounded-lg border transition-all duration-300 ${
                    activeIndex === i
                      ? 'bg-white/5 border-white/20'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                  data-cursor-hover
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: cat.color,
                        boxShadow: activeIndex === i ? `0 0 8px ${cat.color}` : 'none',
                      }}
                    />
                    <span className={`text-xs font-medium ${activeIndex === i ? 'text-white' : 'text-gray-500'}`}>
                      {cat.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-8 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${active.gradient} opacity-10 blur-3xl rounded-full`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Category</div>
                    <h3 className="text-3xl font-bold" style={{ color: active.color }}>
                      {active.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Proficiency</div>
                    <div className="text-3xl font-bold text-gradient">
                      <AnimatedNumber value={active.proficiency} isInView={isInView} />%
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                <div className="space-y-3">
                  {active.skills.map((skill, i) => (
                    <SkillBar
                      key={`${activeIndex}-${skill.name}`}
                      skill={skill}
                      color={active.color}
                      delay={i * 0.08}
                      isInView={isInView}
                    />
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                <div className="grid grid-cols-4 gap-4">
                  <CircularProgress value={active.proficiency} color={active.color} label="Overall" delay={0.1} isInView={isInView} />
                  <CircularProgress value={Math.max(...active.skills.map(s => s.level))} color={active.color} label="Peak" delay={0.2} isInView={isInView} />
                  <CircularProgress value={Math.round(active.skills.reduce((a, s) => a + s.level, 0) / active.skills.length)} color={active.color} label="Average" delay={0.3} isInView={isInView} />
                  <CircularProgress value={active.skills.length * 15} color={active.color} label="Years" delay={0.4} isInView={isInView} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <SkillsNetwork />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap gap-2 justify-center"
        >
          {skillCategories.flatMap(cat =>
            cat.skills.map(s => ({ name: s.name, color: cat.color }))
          ).map((s, i) => (
            <motion.span
              key={`tag-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.02 }}
              whileHover={{
                scale: 1.1,
                color: s.color,
                borderColor: s.color,
              }}
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/5 text-gray-500 cursor-default"
              data-cursor-hover
            >
              {s.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
