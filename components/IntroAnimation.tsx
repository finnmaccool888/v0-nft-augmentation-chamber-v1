"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import GlitchText from "./GlitchText"

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.random() * 15
        return next > 100 ? 100 : next
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
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
      <div className="relative w-full max-w-3xl">
        {" "}
        {/* Increased from max-w-md to max-w-3xl */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Logo Animation - Increased size by 3x */}
          <motion.div
            className="mb-12 relative" // Increased bottom margin
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))",
                  "drop-shadow(0 0 15px rgba(255, 0, 0, 0.7))",
                  "drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="relative mx-auto w-[600px] h-[120px]" // Increased from w-64 h-16 to w-[600px] h-[120px] (approx 3x)
            >
              <Image src="/images/oni-force-logo.png" alt="ONI FORCE" fill className="object-contain" />
            </motion.div>

            {/* Glitch effect overlay */}
            <motion.div
              className="absolute inset-0 opacity-0"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            >
              <div className="w-full h-full relative">
                <Image
                  src="/images/oni-force-logo.png"
                  alt=""
                  fill
                  className="object-contain mix-blend-overlay"
                  style={{
                    filter: "blur(1px) brightness(2)",
                    transform: "translateX(2px)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-3xl font-mono text-white tracking-wide" // Increased from text-2xl to text-3xl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <GlitchText text="AUGMENTATION CHAMBER" glitchIntensity="low" className="text-3xl font-mono" />{" "}
            {/* Increased from text-2xl to text-3xl */}
          </motion.div>

          {/* Loading progress bar */}
          <motion.div className="mt-12 h-2 bg-gray-800 overflow-hidden" initial={{ width: "100%" }}>
            {" "}
            {/* Increased margin-top and height */}
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="mt-4 text-base text-gray-500 font-mono" // Increased from text-sm to text-base
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
            transition={{ delay: 1.8, duration: 1.5 }}
          >
            INITIALIZING SYSTEM... {Math.round(loadingProgress)}%
          </motion.div>

          {/* Random data blocks */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
            <motion.div
              className="text-xs font-mono text-red-500 opacity-50 text-left" // Increased from text-[8px] to text-xs
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

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(transparent 50%, rgba(255, 0, 0, 0.05) 50%)",
              backgroundSize: "100% 4px",
              mixBlendMode: "overlay",
              opacity: 0.2,
            }}
            animate={{ y: [0, 100] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
