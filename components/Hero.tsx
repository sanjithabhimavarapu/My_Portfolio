'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'
import HeroDashboard from './HeroDashboard'

function useTextScramble(finalText: string, delay: number = 0) {
  const [text, setText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let frame = 0
    const maxFrames = finalText.length * 3

    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++
        const progress = frame / maxFrames
        const revealedCount = Math.floor(progress * finalText.length)

        let result = ''
        for (let i = 0; i < finalText.length; i++) {
          if (finalText[i] === ' ') {
            result += ' '
          } else if (i < revealedCount) {
            result += finalText[i]
          } else {
            result += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        setText(result)

        if (frame >= maxFrames) {
          clearInterval(interval)
          setText(finalText)
        }
      }, 30)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [finalText, delay])

  return text
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const name = useTextScramble('Sanjitha Bhimavarapu', 800)
  const title = useTextScramble('Senior Business Analyst', 1600)

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-600/5 blur-[150px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase text-violet-400/70 mb-6 font-light"
          >
            Welcome to my portfolio
          </motion.p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient glow font-mono">{name || ' '}</span>
          </h1>

          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-6" />

          <p className="text-lg md:text-2xl text-gray-400 font-light tracking-wide font-mono">
            {title || ' '}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-6 text-sm text-gray-500/60 tracking-wider"
          >
            Data Analytics &bull; Business Intelligence &bull; Cloud Solutions
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="mt-10 flex gap-6 justify-center"
        >
          <MagneticButton href="#projects">
            <span className="group relative px-8 py-3 overflow-hidden rounded-full inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full" />
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative text-white text-sm tracking-wider uppercase">View Work</span>
            </span>
          </MagneticButton>

          <MagneticButton href="#contact">
            <span className="group relative px-8 py-3 overflow-hidden rounded-full inline-block border border-white/10 hover:border-violet-500/50 transition-colors">
              <span className="relative text-gray-300 text-sm tracking-wider uppercase group-hover:text-violet-400 transition-colors">
                Contact
              </span>
            </span>
          </MagneticButton>
        </motion.div>

        <HeroDashboard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <a href="#about" data-cursor-hover>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ height: ['4px', '12px', '4px'], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-0.5 bg-violet-400 rounded-full"
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
