import { m } from 'framer-motion'
import { fadeUp } from '../../config/motion'

// Fade + rise on scroll into view. Wrap any block with it.
// Uses `m` (not `motion`) for the LazyMotion bundle. Values from config/motion.js.
export default function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <m.div className={className} {...fadeUp(y, delay)}>
      {children}
    </m.div>
  )
}
