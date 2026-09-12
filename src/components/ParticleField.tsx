import { useEffect, useRef } from 'react'

interface Particle {
  baseX: number
  baseY: number
  x: number
  y: number
  size: number
}

const PARTICLE_COUNT = 400
const MAX_SIZE = 1.5
const MIN_SIZE = 0.4
const REPEL_RADIUS = 100
const REPEL_STRENGTH = 20
const EASE_BACK = 0.05

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const x = Math.random() * canvas!.width
        const y = Math.random() * canvas!.height
        const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE)
        return { baseX: x, baseY: y, x, y, size }
      })
    }

    resize()
    window.addEventListener('resize', resize)

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.fillStyle = 'white'

      for (const p of particles) {
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          const angle = Math.atan2(dy, dx)
          p.x += Math.cos(angle) * force * REPEL_STRENGTH * 0.1
          p.y += Math.sin(angle) * force * REPEL_STRENGTH * 0.1
        } else {
          p.x += (p.baseX - p.x) * EASE_BACK
          p.y += (p.baseY - p.y) * EASE_BACK
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, background: 'black' }}
    />
  )
}