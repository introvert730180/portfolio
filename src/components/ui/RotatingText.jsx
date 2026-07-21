import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext'
import { ease } from '../../config/motion'
import './RotatingText.css'

// Cycles through a list of words in place, animating each swap.
// Each word's width is measured on a Canvas with pretext (pure math, no DOM
// reflow) before paint, so the box hugs the current word exactly — short words
// no longer leave a visible gap and the width glides between swaps.
// Honors prefers-reduced-motion by holding on the first word.
export default function RotatingText({ words = [], interval = 2200, className = '' }) {
  const [i, setI] = useState(0)
  const measureRef = useRef(null)
  const [widths, setWidths] = useState([])

  useEffect(() => {
    if (words.length < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  // Pre-measure every word with pretext using the element's real font, before
  // paint. Re-run when the web font loads or the responsive font-size changes.
  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return

    const measureAll = () => {
      const cs = getComputedStyle(el)
      const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      setWidths(words.map((w) => measureNaturalWidth(prepareWithSegments(w, font))))
    }

    measureAll()
    document.fonts?.ready.then(measureAll)

    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measureAll)
      ro.observe(el)
    }
    return () => ro?.disconnect()
  }, [words])

  const width = widths[i]

  return (
    <m.span
      className={`rotating-text ${className}`}
      style={width == null ? undefined : { width }}
      animate={width == null ? undefined : { width }}
      transition={{ duration: 0.4, ease }}
    >
      {/* in-flow + invisible: sets the line height and a first-paint fallback width */}
      <span className="rotating-text-measure" aria-hidden="true" ref={measureRef}>
        {words[i]}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[i]}
          className="rotating-text-word gradient-text"
          initial={{ y: '0.6em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.6em', opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          {words[i]}
        </m.span>
      </AnimatePresence>
    </m.span>
  )
}
