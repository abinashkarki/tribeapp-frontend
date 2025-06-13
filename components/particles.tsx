"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Particles({ className, quantity = 50, staticity = 50, ease = 50, refresh = false }) {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const [context, setContext] = useState(null)
  const [particles, setParticles] = useState([])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  const createParticles = (width, height, context) => {
    const newParticles = []
    for (let i = 0; i < quantity; i++) {
      const particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() - 0.5,
        vy: Math.random() - 0.5,
        size: Math.random() * 2 + 0.5,
      }
      newParticles.push(particle)
    }
    setParticles(newParticles)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    setContext(ctx)

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        createParticles(canvas.width, canvas.height, ctx)
      }
    }

    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
      setIsActive(true)
      setTimeout(() => setIsActive(false), 500)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [quantity, refresh])

  useEffect(() => {
    if (!context) return

    const canvas = canvasRef.current
    let animationFrameId

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      const particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(106, 90, 205, 0.3)"
      const lineColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(106, 90, 205, 0.1)"

      particles.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mouse interaction
        if (isActive) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.vx -= (dx * force) / ease
            particle.vy -= (dy * force) / ease
          }
        }

        // Apply staticity
        particle.vx *= (100 - staticity) / 100
        particle.vy *= (100 - staticity) / 100

        // Draw particle
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = particleColor
        context.fill()

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              context.beginPath()
              context.moveTo(particle.x, particle.y)
              context.lineTo(otherParticle.x, otherParticle.y)
              context.strokeStyle = lineColor
              context.lineWidth = 0.5 * (1 - distance / 150)
              context.stroke()
            }
          }
        })
      })

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [context, particles, mouse, isActive, staticity, ease, theme])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 -z-10", className)} />
}
