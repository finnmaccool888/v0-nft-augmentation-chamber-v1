"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative w-[450px] h-[90px] mb-12" // Increased from w-48 h-12 mb-8 to w-[450px] h-[90px] mb-12 (approx 3x)
          animate={{
            filter: [
              "drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))",
              "drop-shadow(0 0 15px rgba(255, 0, 0, 0.7))",
              "drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Image src="/images/oni-force-logo.png" alt="ONI FORCE" fill className="object-contain" />
        </motion.div>

        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-red-500/30 border-t-red-500 rounded-full" // Increased from w-16 h-16 to w-20 h-20
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
        <motion.p
          className="mt-6 text-red-500 font-mono text-xl tracking-wider" // Increased from mt-4 text-lg to mt-6 text-xl
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          LOADING...
        </motion.p>

        {/* Digital data display */}
        <motion.div
          className="mt-6 text-xs font-mono text-red-500 opacity-50 text-center" // Increased from mt-4 text-[8px] to mt-6 text-xs
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
