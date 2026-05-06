'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Donut, CountUp, Sparkline, MiniBars } from './MiniCharts'

const stats = [
  { value: 6, label: 'Years', suffix: '+', color: '#8b5cf6', viz: 'sparkline' as const, data: [1, 2, 3, 4, 5, 6, 6] },
  { value: 10, label: 'Records', suffix: 'M+', color: '#06b6d4', viz: 'bars' as const, data: [2, 4, 5, 7, 8, 9, 10] },
  { value: 60, label: 'Saved', suffix: '%', color: '#f472b6', viz: 'donut' as const, data: [] },
  { value: 4, label: 'GPA', suffix: '.0', color: '#34d399', viz: 'donut' as const, data: [] },
]

const industries = [
  { name: 'E-Commerce', value: 35, color: '#8b5cf6' },
  { name: 'Healthcare', value: 35, color: '#06b6d4' },
  { name: 'Financial', value: 30, color: '#f472b6' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="text-violet-400/50 text-sm tracking-[0.3em] uppercase">01</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-8"
              >
                Turning <span className="text-gradient">complex data</span> into clear decisions
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-400 text-lg leading-relaxed mb-10"
              >
                Partnering with cross-functional teams across e-commerce, healthcare, and finance to translate millions of data points into actionable strategy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Industry Distribution</span>
                  <span className="text-xs font-mono text-violet-400">100%</span>
                </div>

                <div className="flex h-3 rounded-full overflow-hidden mb-4">
                  {industries.map((ind, i) => (
                    <motion.div
                      key={ind.name}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${ind.value}%` } : {}}
                      transition={{ delay: 0.6 + i * 0.2, duration: 1, ease: 'easeOut' }}
                      style={{
                        background: ind.color,
                        boxShadow: `0 0 10px ${ind.color}80`,
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {industries.map((ind, i) => (
                    <motion.div
                      key={ind.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: ind.color }} />
                        <span className="text-xs text-gray-400">{ind.name}</span>
                      </div>
                      <span className="text-lg font-bold" style={{ color: ind.color }}>
                        {ind.value}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="group glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 relative overflow-hidden"
                  data-cursor-hover
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at top right, ${stat.color}15, transparent 70%)` }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>
                          {isInView && <CountUp to={stat.value} />}{stat.suffix}
                        </div>
                        <p className="text-gray-500 text-xs mt-1 tracking-wider uppercase">{stat.label}</p>
                      </div>
                      {stat.viz === 'donut' && (
                        <Donut value={stat.label === 'GPA' ? 100 : stat.value} color={stat.color} size={50} />
                      )}
                    </div>

                    {stat.viz === 'sparkline' && (
                      <div className="mt-4">
                        <Sparkline data={stat.data} color={stat.color} height={30} />
                      </div>
                    )}
                    {stat.viz === 'bars' && (
                      <div className="mt-4 h-8">
                        <MiniBars data={stat.data} color={stat.color} height={32} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
