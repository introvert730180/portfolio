import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { ease } from '../../config/motion'

// Counts a numeric stat up from zero the first time it scrolls into view.
// Accepts decorated strings like "20+", "100%", "3+" — any non-digit
// prefix/suffix is preserved and only the number animates.
export default function CountUp({ value, duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const prefix = match ? match[1] : ''
  const target = match ? parseFloat(match[2]) : 0
  const suffix = match ? match[3] : String(value)
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0

  const [display, setDisplay] = useState(match ? 0 : value)

  useEffect(() => {
    if (!inView || !match) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(target)
      return
    }
    const controls = animate(0, target, {
      duration,
      ease,
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, target, duration, value])

  if (!match) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
