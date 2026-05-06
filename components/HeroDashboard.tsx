'use client'

import { motion } from 'framer-motion'
import { LiveBars, PulseLine, CountUp, Sparkline } from './MiniCharts'

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 3, duration: 1, ease: 'easeOut' }}
      className="relative max-w-2xl mx-auto mt-12"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="glass rounded-2xl p-5 relative overflow-hidden border border-white/10"
        style={{ boxShadow: '0 20px 60px -20px rgba(139, 92, 246, 0.3)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-gray-500 ml-2 font-mono">analytics.dashboard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green-400"
              />
              <span className="text-[10px] text-green-400 font-mono">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
              <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Records</div>
              <div className="text-lg font-bold text-violet-400">
                <CountUp to={10} suffix="M+" />
              </div>
              <div className="h-3 mt-1.5">
                <Sparkline data={[3, 5, 4, 7, 6, 8, 10]} color="#8b5cf6" height={12} animate={false} />
              </div>
            </div>
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
              <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Adoption</div>
              <div className="text-lg font-bold text-cyan-400">
                <CountUp to={40} suffix="%" />
              </div>
              <div className="h-3 mt-1.5">
                <Sparkline data={[10, 15, 22, 28, 30, 35, 40]} color="#06b6d4" height={12} animate={false} />
              </div>
            </div>
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
              <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Saved</div>
              <div className="text-lg font-bold text-fuchsia-400">
                <CountUp to={60} suffix="%" />
              </div>
              <div className="h-3 mt-1.5">
                <Sparkline data={[5, 12, 20, 35, 45, 52, 60]} color="#f472b6" height={12} animate={false} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-gray-500 uppercase tracking-wider">Trends</span>
                <span className="text-[9px] text-violet-400 font-mono">+12.4%</span>
              </div>
              <div className="h-12">
                <PulseLine color="#06b6d4" />
              </div>
            </div>
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-gray-500 uppercase tracking-wider">Volume</span>
                <span className="text-[9px] text-violet-400 font-mono">7d</span>
              </div>
              <div className="h-12">
                <LiveBars color="#8b5cf6" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
