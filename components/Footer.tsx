'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-600 text-sm"
          >
            &copy; {new Date().getFullYear()} Sanjitha Bhimavarapu
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-700 text-xs tracking-wider"
          >
            Designed with precision
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
