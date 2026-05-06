'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Sparkline, Donut, MiniBars, CountUp } from './MiniCharts'

const experiences = [
  {
    company: 'Amazon',
    role: 'Senior Business Analyst',
    period: '2025 - Present',
    color: '#8b5cf6',
    metrics: [
      { label: 'Records', value: 10, suffix: 'M+', viz: 'sparkline', data: [2, 3, 5, 7, 8, 9, 10] },
      { label: 'Adoption', value: 40, suffix: '%', viz: 'bars', data: [10, 18, 22, 30, 35, 40] },
      { label: 'Saved', value: 60, suffix: '%', viz: 'donut' },
    ],
    highlights: ['10M+ customer records', 'Dashboard adoption +40%', 'Manual reporting -60%'],
    tools: ['SQL', 'Python', 'Tableau', 'AWS'],
  },
  {
    company: 'CVS Health',
    role: 'Business Analyst',
    period: '2021 - 2023',
    color: '#06b6d4',
    metrics: [
      { label: 'Turnaround', value: 30, suffix: '%', viz: 'sparkline', data: [50, 45, 40, 35, 32, 30] },
      { label: 'Risk ID', value: 85, suffix: '%', viz: 'donut' },
      { label: 'Claims', value: 92, suffix: '%', viz: 'bars', data: [20, 35, 50, 65, 80, 92] },
    ],
    highlights: ['Healthcare claims analytics', 'Turnaround improved 30%', 'Risk identification'],
    tools: ['Power BI', 'Azure', 'SQL', 'Python'],
  },
  {
    company: 'JP Morgan Chase',
    role: 'Business Analyst',
    period: '2018 - 2021',
    color: '#f472b6',
    metrics: [
      { label: 'Transactions', value: 5, suffix: 'M+', viz: 'bars', data: [1, 2, 3, 3.5, 4, 5] },
      { label: 'Reporting', value: 25, suffix: '%', viz: 'donut' },
      { label: 'Accuracy', value: 95, suffix: '%', viz: 'sparkline', data: [80, 82, 85, 88, 92, 95] },
    ],
    highlights: ['5M+ transactions analyzed', 'Reporting -25%', 'Fraud detection insights'],
    tools: ['Tableau', 'SQL', 'Azure', 'Risk Analysis'],
  },
]

function MetricViz({ metric, color }: { metric: any; color: string }) {
  if (metric.viz === 'donut') {
    return <Donut value={metric.value} color={color} size={56} />
  }
  if (metric.viz === 'sparkline') {
    return (
      <div className="w-20 h-10">
        <Sparkline data={metric.data} color={color} height={40} />
      </div>
    )
  }
  return (
    <div className="w-20 h-10">
      <MiniBars data={metric.data} color={color} height={40} />
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 60%'],
  })
  const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-violet-400/50 text-sm tracking-[0.3em] uppercase">02</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Where I&apos;ve <span className="text-gradient">made impact</span>
        </motion.h2>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 via-cyan-500/30 to-fuchsia-500/30 hidden md:block" />

          <motion.div
            className="absolute left-[1.85rem] hidden md:block z-10"
            style={{ top: dotY }}
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-violet-400" style={{ boxShadow: '0 0 12px #8b5cf6, 0 0 24px #8b5cf6' }} />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-violet-400 animate-ping opacity-40" />
            </div>
          </motion.div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative md:ml-16"
                data-cursor-hover
              >
                <div className={`glass rounded-2xl p-8 transition-all duration-500 ${
                  hoveredIndex === i ? 'glass-hover' : ''
                }`}
                style={hoveredIndex === i ? { boxShadow: `0 20px 60px -20px ${exp.color}30` } : {}}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white transition-all duration-300" style={hoveredIndex === i ? { color: exp.color } : {}}>
                        {exp.company}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{exp.role}</p>
                    </div>
                    <span className="text-xs tracking-wider text-gray-500 font-mono mt-2 md:mt-0">{exp.period}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {exp.metrics.map((metric, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.2 + j * 0.1 }}
                        className="bg-white/[0.02] rounded-xl p-4 border border-white/5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
                            <div className="text-xl font-bold" style={{ color: exp.color }}>
                              {isInView && <CountUp to={metric.value} duration={1.5} />}{metric.suffix}
                            </div>
                          </div>
                          <MetricViz metric={metric} color={exp.color} />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool) => (
                      <span key={tool} className="text-xs font-mono px-2 py-1 rounded" style={{ color: `${exp.color}b3`, background: `${exp.color}15` }}>
                        {tool}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                    style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === i ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
