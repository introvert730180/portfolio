// ═══════════════════════════════════════════════════════════════
//  ANIMATION TOKENS  —  the single source of truth for MOTION.
//  Easings, durations, and reusable Framer Motion variants.
// ═══════════════════════════════════════════════════════════════

// Apple-like "smooth out" easing curve, reused everywhere.
export const ease = [0.22, 1, 0.36, 1]

export const durations = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
  bar: 1.1, // skill-bar fill
}

export const stagger = 0.12

// Fade + rise (used by <Reveal/> and section items)
export const fadeUp = (y = 28, delay = 0, duration = durations.base) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration, delay, ease },
})

// Parent/child stagger for the hero entrance
export const container = {
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
}

export const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: durations.slow, ease } },
}

// ---- Background particle field ("antigravity" floating dots) ----
// Tune the whole effect from here.
export const particles = {
  area: 11000, // px² of screen per particle (smaller = MORE particles)
  maxCount: 90, // hard cap for performance
  rise: 0.22, // base upward drift speed
  linkDistance: 130, // px — connect dots closer than this
  mouseRadius: 160, // px — cursor influence radius
  dotOpacity: 0.45,
  lineOpacity: 0.16,
}
