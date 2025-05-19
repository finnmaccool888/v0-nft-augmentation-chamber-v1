"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
        <motion.p
          className="mt-4 text-red-500 font-mono text-lg tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          LOADING...
        </motion.p>

        {/* Digital data display */}
        <motion.div
          className="mt-4 text-[8px] font-mono text-red-500 opacity-50 text-center"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          0xF7A9C1D3 0x8B2E4F6D 0x1A3C5E7G
          <br />
          0x9D2F4B6E 0x3C5A7D9F 0x2E4C6B8A
        </motion.div>
      </div>
    </div>
  )
}
