"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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
            className="mb-4 text-4xl font-bold text-red-600 glitch-text"
            animate={{
              textShadow: [
                "0 0 5px #ff0000, 0 0 10px #ff0000",
                "0 0 2px #ff0000, 0 0 5px #ff0000",
                "0 0 10px #ff0000, 0 0 20px #ff0000",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            0N1 FORCE
          </motion.div>

          <motion.div
            className="text-2xl font-mono text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            AUGMENTATION CHAMBER
          </motion.div>

          <motion.div
            className="mt-8 h-1 bg-red-600"
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
        </motion.div>
      </div>
    </motion.div>
  )
}
