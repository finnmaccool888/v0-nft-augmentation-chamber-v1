"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function EnhancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle system
    const particles: Particle[] = []
    const numParticles = 80
    const connectionDistance = 150
    const maxSpeed = 0.5

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      pulseSpeed: number
      pulseDirection: number
      pulseValue: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * maxSpeed
        this.speedY = (Math.random() - 0.5) * maxSpeed

        // Random color from cyberpunk palette
        const colors = [
          "rgba(255, 0, 60, 0.8)", // Red
          "rgba(0, 255, 255, 0.8)", // Cyan
          "rgba(255, 0, 255, 0.8)", // Magenta
          "rgba(255, 60, 0, 0.8)", // Orange
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]

        // Pulse effect
        this.pulseSpeed = 0.03 + Math.random() * 0.02
        this.pulseDirection = 1
        this.pulseValue = Math.random()
      }

      update() {
        // Move particle
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // Pulse effect
        this.pulseValue += this.pulseSpeed * this.pulseDirection
        if (this.pulseValue > 1 || this.pulseValue < 0) {
          this.pulseDirection *= -1
        }
      }

      draw() {
        if (!ctx) return

        // Draw particle with glow effect
        const size = this.size * (0.5 + this.pulseValue * 0.5)

        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 4)

        const colorParts = this.color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
        if (colorParts) {
          const [_, r, g, b] = colorParts
          gradient.addColorStop(0, this.color)
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core of particle
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle())
    }

    // Draw connections between particles
    function drawConnections() {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / connectionDistance

            // Get colors from particles
            const color1Parts = particles[i].color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
            const color2Parts = particles[j].color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)

            if (color1Parts && color2Parts) {
              const [_, r1, g1, b1] = color1Parts
              const [__, r2, g2, b2] = color2Parts

              // Create gradient between the two particles
              const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)

              gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${opacity * 0.5})`)
              gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, ${opacity * 0.5})`)

              ctx.strokeStyle = gradient
              ctx.lineWidth = 1 * opacity
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      // Draw connections
      drawConnections()

      // Add scan line effect
      drawScanLines()

      requestAnimationFrame(animate)
    }

    // Scan line effect
    function drawScanLines() {
      if (!ctx || !canvas) return

      const scanLineHeight = 2
      const scanLineSpacing = 4
      const scanLineOpacity = 0.1

      ctx.fillStyle = `rgba(0, 255, 255, ${scanLineOpacity})`

      for (let y = 0; y < canvas.height; y += scanLineSpacing) {
        ctx.fillRect(0, y, canvas.width, scanLineHeight)
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 bg-black" />

      {/* Cyberpunk grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255, 0, 60, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 0, 60, 0.5) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Animated circuit paths */}
      <CircuitPaths />

      {/* Floating elements */}
      <FloatingElements />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      ></div>
    </>
  )
}

function CircuitPaths() {
  return (
    <>
      <div className="fixed top-0 right-0 w-64 h-64 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-full h-px bg-red-500"
          animate={{ scaleX: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0 }}
        />
        <motion.div
          className="absolute top-20 right-20 w-px h-full bg-red-500"
          animate={{ scaleY: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-40 right-40 w-20 h-px bg-cyan-500"
          animate={{ scaleX: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-64 h-64 pointer-events-none">
        <motion.div
          className="absolute bottom-20 left-20 w-full h-px bg-cyan-500"
          animate={{ scaleX: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-px h-full bg-cyan-500"
          animate={{ scaleY: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-40 left-40 w-20 h-px bg-red-500"
          animate={{ scaleX: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2.5 }}
        />
      </div>
    </>
  )
}

function FloatingElements() {
  return (
    <>
      {/* Floating hexagons */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-12 h-12 pointer-events-none"
        style={{
          backgroundColor: "transparent",
          backgroundImage: "linear-gradient(135deg, rgba(255, 0, 60, 0.3), rgba(0, 255, 255, 0.1))",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          y: ["-20px", "20px", "-20px"],
          rotate: [0, 60, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="fixed bottom-1/4 right-1/4 w-16 h-16 pointer-events-none"
        style={{
          backgroundColor: "transparent",
          backgroundImage: "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.1))",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          y: ["20px", "-20px", "20px"],
          rotate: [0, -60, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating circles with glow */}
      <motion.div
        className="fixed top-1/3 right-1/3 w-8 h-8 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 0, 60, 0.6) 0%, rgba(255, 0, 60, 0) 70%)",
          boxShadow: "0 0 15px rgba(255, 0, 60, 0.8)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="fixed bottom-1/3 left-1/3 w-6 h-6 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, rgba(0, 255, 255, 0) 70%)",
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Floating data fragments */}
      <motion.div
        className="fixed top-2/3 left-1/5 text-xs font-mono text-cyan-500 opacity-30 pointer-events-none"
        animate={{
          y: ["-10px", "10px", "-10px"],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        0x7F3A21B9
      </motion.div>

      <motion.div
        className="fixed bottom-2/3 right-1/5 text-xs font-mono text-red-500 opacity-30 pointer-events-none"
        animate={{
          y: ["10px", "-10px", "10px"],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.7 }}
      >
        0xE621F9C0
      </motion.div>
    </>
  )
}
