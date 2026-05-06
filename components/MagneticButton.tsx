'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  className?: string
  onClick?: () => void
}

export default function MagneticButton({ children, href, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleLeave = () => setPosition({ x: 0, y: 0 })

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`inline-block ${className}`}
      data-cursor-hover
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} onClick={onClick}>{content}</a>
  }
  return <div onClick={onClick}>{content}</div>
}
