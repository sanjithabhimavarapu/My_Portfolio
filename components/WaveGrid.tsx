'use client'

import { useEffect, useRef } from 'react'

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseX = -1000
    let mouseY = -1000
    let scrollOffset = 0
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleScroll = () => {
      scrollOffset = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)

    // Marching squares for isolines
    const cellSize = 40

    const noise = (x: number, y: number, t: number) => {
      const cx = (mouseX - x) / 300
      const cy = (mouseY - y) / 300
      const distSq = cx * cx + cy * cy
      const cursorBump = Math.exp(-distSq) * 0.6

      return (
        Math.sin(x * 0.006 + t * 0.3) * 0.5 +
        Math.cos(y * 0.008 + t * 0.4) * 0.5 +
        Math.sin((x + y) * 0.004 + t * 0.2) * 0.3 +
        Math.cos(Math.sqrt(x * x + y * y) * 0.003 - t * 0.2) * 0.4 +
        cursorBump
      )
    }

    const interp = (a: number, b: number, level: number) => {
      if (Math.abs(b - a) < 0.0001) return 0.5
      return (level - a) / (b - a)
    }

    const drawIsoline = (level: number, color: string, lineWidth: number) => {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.beginPath()

      for (let x = 0; x < canvas.width; x += cellSize) {
        for (let y = 0; y < canvas.height; y += cellSize) {
          const tl = noise(x, y, time)
          const tr = noise(x + cellSize, y, time)
          const br = noise(x + cellSize, y + cellSize, time)
          const bl = noise(x, y + cellSize, time)

          let idx = 0
          if (tl > level) idx |= 8
          if (tr > level) idx |= 4
          if (br > level) idx |= 2
          if (bl > level) idx |= 1

          const top = { x: x + cellSize * interp(tl, tr, level), y: y }
          const right = { x: x + cellSize, y: y + cellSize * interp(tr, br, level) }
          const bottom = { x: x + cellSize * interp(bl, br, level), y: y + cellSize }
          const left = { x: x, y: y + cellSize * interp(tl, bl, level) }

          const seg = (a: { x: number; y: number }, b: { x: number; y: number }) => {
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
          }

          switch (idx) {
            case 1: case 14: seg(left, bottom); break
            case 2: case 13: seg(bottom, right); break
            case 3: case 12: seg(left, right); break
            case 4: case 11: seg(top, right); break
            case 5: seg(left, top); seg(bottom, right); break
            case 6: case 9: seg(top, bottom); break
            case 7: case 8: seg(left, top); break
            case 10: seg(top, right); seg(left, bottom); break
          }
        }
      }
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      const scrollPhase = scrollOffset * 0.0005
      const levels = [
        { v: -0.6 + Math.sin(scrollPhase) * 0.1, c: 'rgba(139, 92, 246, 0.10)', w: 1 },
        { v: -0.2 + Math.sin(scrollPhase) * 0.1, c: 'rgba(139, 92, 246, 0.16)', w: 1 },
        { v: 0.2 + Math.sin(scrollPhase) * 0.1, c: 'rgba(6, 182, 212, 0.14)', w: 1 },
        { v: 0.6 + Math.sin(scrollPhase) * 0.1, c: 'rgba(244, 114, 182, 0.12)', w: 1 },
        { v: 1.0 + Math.sin(scrollPhase) * 0.1, c: 'rgba(244, 114, 182, 0.08)', w: 1 },
      ]

      levels.forEach((l) => drawIsoline(l.v, l.c, l.w))

      // Glow accent line near cursor
      if (mouseX > 0) {
        const cursorLevel = noise(mouseX, mouseY, time)
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(139, 92, 246, 0.5)'
        drawIsoline(cursorLevel, 'rgba(139, 92, 246, 0.4)', 1.2)
        ctx.shadowBlur = 0
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
