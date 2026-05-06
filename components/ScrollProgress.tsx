'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { damping: 30, stiffness: 100 })
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      <div className="relative h-32 w-px bg-white/5">
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-violet-500 to-cyan-500"
          style={{ scaleY, height: '100%' }}
        />
      </div>
      <div className="flex flex-col gap-3">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="group relative" data-cursor-hover>
            <motion.div
              animate={{
                scale: activeSection === s.id ? 1.5 : 1,
                background: activeSection === s.id ? '#8b5cf6' : 'rgba(255,255,255,0.2)',
              }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                boxShadow: activeSection === s.id ? '0 0 8px #8b5cf6' : 'none',
              }}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
