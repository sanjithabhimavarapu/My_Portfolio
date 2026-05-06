'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 })
  const outerX = useSpring(cursorX, { damping: 15, stiffness: 150 })
  const outerY = useSpring(cursorY, { damping: 15, stiffness: 150 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
          background: isHovering
            ? 'rgba(139, 92, 246, 1)'
            : 'rgba(255, 255, 255, 0.9)',
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : isClicking ? 28 : 36,
          height: isHovering ? 60 : isClicking ? 28 : 36,
          borderColor: isHovering
            ? 'rgba(139, 92, 246, 0.6)'
            : 'rgba(255, 255, 255, 0.2)',
          background: isHovering
            ? 'rgba(139, 92, 246, 0.08)'
            : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
