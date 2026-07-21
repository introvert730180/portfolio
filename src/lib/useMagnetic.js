import { useEffect, useRef } from 'react'

// Returns a ref that makes its element gently drift toward the cursor while
// hovered, then spring back on leave. Pure transform (GPU-friendly), and a
// no-op for touch devices and users who prefer reduced motion.
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
