"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: "low" | "medium" | "high"
  color?: string
  isRed?: boolean
}

export default function GlitchText({
  text,
  className = "",
  glitchIntensity = "medium",
  color = "text-white",
  isRed = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)

  // Set glitch frequency based on intensity
  const glitchFrequency = {
    low: 3000,
    medium: 2000,
    high: 1000,
  }[glitchIntensity]

  useEffect(() => {
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

    // Function to create a glitched version of the text
    const glitchText = () => {
      // Determine if we should glitch (random chance)
      if (Math.random() > 0.8) {
        // Create a glitched version of the text
        let glitched = ""
        for (let i = 0; i < text.length; i++) {
          // Random chance to replace character with a glitch character
          if (Math.random() > 0.85) {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            glitched += text[i]
          }
        }
        setDisplayText(glitched)

        // Reset after a short delay
        setTimeout(() => {
          setDisplayText(text)
        }, 100)
      }
    }

    // Set up interval for glitch effect
    const interval = setInterval(glitchText, glitchFrequency)

    return () => clearInterval(interval)
  }, [text, glitchFrequency])

  const textColor = isRed ? "text-red-500" : color

  return (
    <motion.span
      className={`relative inline-block ${textColor} ${className}`}
      animate={{
        textShadow: isRed
          ? [
              "0 0 5px rgba(255, 68, 68, 0.7), 0 0 10px rgba(255, 68, 68, 0.5)",
              "0 0 2px rgba(255, 68, 68, 0.7), 0 0 5px rgba(255, 68, 68, 0.5)",
              "0 0 10px rgba(255, 68, 68, 0.7), 0 0 20px rgba(255, 68, 68, 0.5)",
            ]
          : undefined,
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
    >
      {displayText}

      {/* Pseudo glitch elements - only for high intensity */}
      {glitchIntensity === "high" && (
        <>
          <span
            className="absolute left-0 top-0 w-full h-full opacity-70 mix-blend-screen"
            style={{
              textShadow: "0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(255,0,0,0.75)",
              animation: "glitch 500ms infinite",
              clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
            }}
          >
            {displayText}
          </span>

          <span
            className="absolute left-0 top-0 w-full h-full opacity-70 mix-blend-multiply"
            style={{
              textShadow: "0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(255,0,0,0.75)",
              animation: "glitch 250ms infinite",
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
            }}
          >
            {displayText}
          </span>
        </>
      )}
    </motion.span>
  )
}
