"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="hidden md:flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-xs font-medium tracking-wider ${index <= currentStep ? "text-red-500" : "text-gray-500"}`}
            style={{ width: `${100 / steps.length}%`, textAlign: "center" }}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="relative w-full h-1 bg-gray-800 overflow-hidden">
        {/* Actual progress */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Animated glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatDelay: 1,
          }}
        />
      </div>

      <div className="md:hidden mt-2 text-center">
        <span className="text-xs font-medium text-red-500">{steps[currentStep]}</span>
        <span className="text-xs text-gray-500">
          {" "}
          ({currentStep + 1}/{steps.length})
        </span>
      </div>
    </div>
  )
}
