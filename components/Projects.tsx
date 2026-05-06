'use client'

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkline, MiniBars, Scatter, CountUp } from './MiniCharts'

const projects = [
  {
    title: 'E-Commerce Analytics',
    company: 'Amazon',
    year: '2025',
    description: 'Customer behavior insights from 10M+ records',
    tags: ['SQL', 'Python', 'Tableau', 'AWS'],
    color: '#8b5cf6',
    gradient: 'from-violet-600 to-indigo-600',
    metric: '10M+',
    metricLabel: 'Records',
    viz: 'bars' as const,
    chartTitle: 'Customer Segments',
    data: [45, 70, 55, 90, 65, 80, 75],
    chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    title: 'Healthcare Claims',
    company: 'CVS Health',
    year: '2021-23',
    description: 'Claims processing dashboards & risk analysis',
    tags: ['Power BI', 'Azure', 'SQL', 'Python'],
    color: '#06b6d4',
    gradient: 'from-cyan-600 to-blue-600',
    metric: '30%',
    metricLabel: 'Faster',
    viz: 'sparkline' as const,
    chartTitle: 'Turnaround Time',
    data: [100, 92, 85, 78, 74, 72, 70],
  },
  {
    title: 'Financial Risk',
    company: 'JP Morgan Chase',
    year: '2018-21',
    description: 'Fraud detection & transaction analytics',
    tags: ['Tableau', 'SQL', 'Azure'],
    color: '#f472b6',
    gradient: 'from-fuchsia-600 to-pink-600',
    metric: '5M+',
    metricLabel: 'Transactions',
    viz: 'scatter' as const,
    chartTitle: 'Fraud Pattern Map',
    points: [
      { x: 15, y: 30, r: 2 }, { x: 25, y: 45, r: 1.5 }, { x: 35, y: 25, r: 2.5 },
      { x: 45, y: 65, r: 1.5 }, { x: 55, y: 50, r: 2 }, { x: 65, y: 75, r: 3 },
      { x: 75, y: 40, r: 1.8 }, { x: 85, y: 60, r: 2.2 }, { x: 30, y: 80, r: 1.6 },
      { x: 50, y: 20, r: 2 }, { x: 70, y: 30, r: 1.5 }, { x: 90, y: 80, r: 3 },
      { x: 20, y: 60, r: 1.8 }, { x: 60, y: 40, r: 2 }, { x: 80, y: 20, r: 1.5 },
    ],
  },
]

function ProjectChart({ project }: { project: typeof projects[0] }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest text-white/60">{project.chartTitle}</span>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-white/80"
        />
      </div>
      <div className="flex-1 flex items-end">
        {project.viz === 'sparkline' && project.data && (
          <Sparkline data={project.data} color="white" height={50} />
        )}
        {project.viz === 'bars' && project.data && (
          <div className="w-full h-12">
            <MiniBars data={project.data} color="white" height={48} />
          </div>
        )}
        {project.viz === 'scatter' && project.points && (
          <Scatter points={project.points} color="white" height={50} />
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const numericMetric = parseInt(project.metric)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative"
      data-cursor-hover
    >
      <div className="glass rounded-2xl overflow-hidden transition-all duration-500 group-hover:glass-hover"
        style={{ boxShadow: `0 0 0 transparent` }}
      >
        <div className={`h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden p-5`}>
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-white/70 text-[10px] uppercase tracking-widest">{project.company}</p>
                <p className="text-white/40 text-[10px] mt-0.5">{project.year}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white leading-none">
                  {isInView && project.metric.includes('M') ? (
                    <><CountUp to={numericMetric} />M+</>
                  ) : isInView && project.metric.includes('%') ? (
                    <><CountUp to={numericMetric} />%</>
                  ) : project.metric}
                </p>
                <p className="text-white/60 text-[10px] mt-0.5">{project.metricLabel}</p>
              </div>
            </div>

            <div className="flex-1">
              <ProjectChart project={project} />
            </div>
          </div>
        </div>

        <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-semibold text-white mb-2 transition-all duration-300 group-hover:text-gradient">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ color: `${project.color}b3`, background: `${project.color}15` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-violet-400/50 text-sm tracking-[0.3em] uppercase">04</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Featured <span className="text-gradient">projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm tracking-wider uppercase mb-16"
        >
          Hover to tilt &bull; Real impact, real metrics
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
