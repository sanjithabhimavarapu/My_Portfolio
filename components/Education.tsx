'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-violet-400/50 text-sm tracking-[0.3em] uppercase">05</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="group glass rounded-2xl p-10 relative overflow-hidden hover:glass-hover transition-all duration-500"
            data-cursor-hover
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-600/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-tr-full" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-xs tracking-[0.3em] uppercase text-violet-400/60"
                >
                  Education
                </motion.span>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-white mb-2"
              >
                Master of Computer Science
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg mb-6"
              >
                Southeast Missouri State University
              </motion.p>

              <div className="flex flex-wrap gap-6 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="text-center"
                >
                  <span className="text-3xl font-bold text-gradient">4.0</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">GPA</p>
                </motion.div>

                <div className="h-8 w-px bg-white/10" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="text-center"
                >
                  <span className="text-lg font-semibold text-gray-300">Dec 2025</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Graduation</p>
                </motion.div>

                <div className="h-8 w-px bg-white/10 hidden sm:block" />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-2"
                >
                  {['Data Analytics', 'BI', 'Cloud', 'Database Systems'].map((area) => (
                    <span key={area} className="text-xs font-mono text-violet-400/60 bg-violet-500/10 px-2 py-1 rounded">
                      {area}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
