import { m, useScroll, useSpring } from 'framer-motion'
import './ScrollProgress.css'

// Thin gradient bar pinned to the top that fills as the page scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // smooth the raw 0→1 progress so the bar glides instead of snapping
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
