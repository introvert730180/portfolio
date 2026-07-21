import { useEffect, useRef } from 'react'
import { particles as cfg } from '../../config/motion'
import { useTheme } from '../../lib/ThemeContext'
import './ParticleField.css'

// Floating "antigravity" particle constellation on a <canvas>.
// Dots drift upward, link to nearby dots, and react to the cursor.
// Colour is read from the --text design token, so it follows the theme.
export default function ParticleField() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  // Current dot colour, kept in a ref so a theme toggle updates it live
  // without tearing down (and re-seeding) the whole particle field.
  const colorRef = useRef([10, 10, 10])
  // Lets the theme-change effect below refresh the colour after :root updates.
  const readColorRef = useRef(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let width = 0
    let height = 0
    let dots = []
    const mouse = { x: -9999, y: -9999 }

    const spawn = (fromBottom = false) => ({
      x: Math.random() * width,
      y: fromBottom ? height + Math.random() * 30 : Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      vy: -(Math.random() * cfg.rise + 0.06),
      phase: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.01 + 0.003,
      amp: Math.random() * 0.4 + 0.1,
    })

    const seed = () => {
      const count = Math.min(Math.floor((width * height) / cfg.area), cfg.maxCount)
      dots = Array.from({ length: count }, () => spawn())
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const [r, g, b] = colorRef.current

      for (const p of dots) {
        // float up + gentle horizontal sway
        p.phase += p.drift
        p.x += Math.sin(p.phase) * p.amp
        p.y += p.vy

        // soft cursor repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < cfg.mouseRadius) {
          const f = ((cfg.mouseRadius - dist) / cfg.mouseRadius) * 0.9
          p.x += (dx / (dist || 1)) * f
          p.y += (dy / (dist || 1)) * f
        }

        // wrap around the edges
        if (p.y < -12) {
          p.y = height + 12
          p.x = Math.random() * width
        }
        if (p.x < -12) p.x = width + 12
        else if (p.x > width + 12) p.x = -12

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${cfg.dotOpacity})`
        ctx.fill()
      }

      // connecting lines (dot ↔ dot, and dot ↔ cursor)
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const c = dots[j]
          const d = Math.hypot(a.x - c.x, a.y - c.y)
          if (d < cfg.linkDistance) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / cfg.linkDistance) * cfg.lineOpacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(c.x, c.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < cfg.mouseRadius) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - md / cfg.mouseRadius) * 0.25})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    // start/stop so we can pause the rAF loop when the tab is hidden
    let active = false
    const start = () => {
      if (!active && !reduce) {
        active = true
        raf = requestAnimationFrame(draw)
      }
    }
    const stop = () => {
      active = false
      cancelAnimationFrame(raf)
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height)
      const [r, g, b] = colorRef.current
      for (const p of dots) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${cfg.dotOpacity})`
        ctx.fill()
      }
    }

    // Read [r,g,b] from the --text CSS variable (hex) into the colour ref.
    // Exposed via readColorRef so a theme toggle can refresh it.
    const readColor = () => {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--text')
        .trim()
      const mm = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
      colorRef.current = mm
        ? [parseInt(mm[1], 16), parseInt(mm[2], 16), parseInt(mm[3], 16)]
        : [10, 10, 10]
      // The static (reduced-motion) frame doesn't redraw on its own.
      if (reduce) renderStatic()
    }
    readColorRef.current = readColor
    readColor()

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    if (reduce) renderStatic()
    else start()

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // When the theme flips, the ThemeProvider rewrites :root's CSS variables in
  // its own effect (which runs after this child's). Refresh the dot colour on
  // the next frame, once those variables are guaranteed to be applied.
  useEffect(() => {
    const id = requestAnimationFrame(() => readColorRef.current())
    return () => cancelAnimationFrame(id)
  }, [theme])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
