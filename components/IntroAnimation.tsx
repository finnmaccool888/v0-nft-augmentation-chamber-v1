"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import GlitchText from "./GlitchText"

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (!showIntro) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 0.5 }}
      onAnimationComplete={() => setShowIntro(false)}
    >
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            className="mb-4 text-4xl font-bold"
            animate={{
              textShadow: [
                "0 0 5px #ff0000, 0 0 10px #ff0000",
                "0 0 2px #ff0000, 0 0 5px #ff0000",
                "0 0 10px #ff0000, 0 0 20px #ff0000",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <GlitchText text="0N1 FORCE" glitchIntensity="high" className="text-4xl font-bold" />
          </motion.div>

          <motion.div
            className="text-2xl font-mono text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <GlitchText
              text="AUGMENTATION CHAMBER"
              color="text-cyan-400"
              glitchIntensity="low"
              className="text-2xl font-mono"
            />
          </motion.div>

          {/* Digital noise effect */}
          <motion.div
            className="mt-8 h-1 bg-gradient-to-r from-red-600 via-purple-600 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1.5 }}
          />

          <motion.div
            className="mt-4 text-sm text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
            transition={{ delay: 1.8, duration: 1.5 }}
          >
            INITIALIZING SYSTEM...
          </motion.div>

          {/* Digital scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
              backgroundSize: "100% 4px",
              mixBlendMode: "overlay",
              opacity: 0.2,
            }}
            animate={{ y: [0, 100] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
          />

          {/* Random data blocks */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
            <motion.div
              className="text-[8px] font-mono text-cyan-500 opacity-50 text-left"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              0xF7A9C1D3 0x8B2E4F6D 0x1A3C5E7G
              <br />
              0x9D2F4B6E 0x3C5A7D9F 0x2E4C6B8A
              <br />
              0x5F7D9E1C 0x3B5D7F9E 0x1A3C5E7G
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
