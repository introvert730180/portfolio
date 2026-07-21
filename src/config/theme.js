// ═══════════════════════════════════════════════════════════════
//  DESIGN TOKENS  —  the single source of truth for the LOOK.
//  Change a value here and it updates everywhere on the site.
//  (colors · shapes/radius · sizes/spacing · fonts · effects)
//
//  Two palettes ship: LIGHT (default) and DARK. The active one is
//  written to :root by lib/applyTheme.js and toggled at runtime.
// ═══════════════════════════════════════════════════════════════

// ---- LIGHT palette (clean monochrome on white) ----
export const lightColors = {
  // surfaces & text
  bg: '#ffffff',
  bgSoft: '#f5f5f7',
  text: '#0a0a0a',
  textDim: '#52525b',
  textFaint: '#9ca3af',

  // glass layers & borders (subtle dark tint reads as a card on white)
  border: 'rgba(0, 0, 0, 0.10)',
  glass: 'rgba(0, 0, 0, 0.03)',
  glassStrong: 'rgba(0, 0, 0, 0.055)',

  // monochrome accent scale (drives all gradients) — black → grey
  violet: '#0a0a0a',
  blue: '#3f3f46',
  cyan: '#71717a',
  pink: '#18181b',
  amber: '#52525b',

  // status / misc
  success: '#0a0a0a',
  star: '#0a0a0a',

  // semi-transparent ink used for selection, glows, etc.
  ink: 'rgba(0, 0, 0, 0.12)',

  // theme-specific surfaces
  onAccent: '#ffffff', // text/icon sitting on a gradient (banner, primary btn)
  navBg: 'rgba(255, 255, 255, 0.7)', // floating navbar when scrolled
  glowSoft: 'rgba(0, 0, 0, 0.06)', // soft radial glow behind the contact card
}

// ---- DARK palette (clean monochrome on near-black) ----
export const darkColors = {
  bg: '#0a0a0b',
  bgSoft: '#141416',
  text: '#f5f5f7',
  textDim: '#a1a1aa',
  textFaint: '#71717a',

  border: 'rgba(255, 255, 255, 0.12)',
  glass: 'rgba(255, 255, 255, 0.04)',
  glassStrong: 'rgba(255, 255, 255, 0.07)',

  // accent scale flips to white → grey so gradients pop on dark
  violet: '#fafafa',
  blue: '#c4c4cc',
  cyan: '#a1a1aa',
  pink: '#ffffff',
  amber: '#d4d4d8',

  success: '#fafafa',
  star: '#fafafa',

  ink: 'rgba(255, 255, 255, 0.14)',

  onAccent: '#0a0a0b', // banners/primary btn are light gradients in dark mode
  navBg: 'rgba(18, 18, 20, 0.72)',
  glowSoft: 'rgba(255, 255, 255, 0.07)',
}

// ---- SHAPES (corner radius) ----
export const radius = {
  sm: '12px',
  md: '15px',
  lg: '22px',
  pill: '100px',
}

// ---- SIZES & SPACING ----
export const layout = {
  maxWidth: '1180px',
  containerPadding: '24px',
  sectionPadding: '110px',
}

// ---- EFFECTS ----
export const effects = {
  blur: '20px',
  shadow: '0 30px 60px -20px rgba(0, 0, 0, 0.16)',
}

// ---- TYPOGRAPHY ----
export const fonts = {
  body: "'Inter', system-ui, -apple-system, sans-serif",
  heading: "'Plus Jakarta Sans', 'Inter', sans-serif",
}

// ---- GRADIENTS (built from whichever palette is active) ----
const g = (...stops) => `linear-gradient(135deg, ${stops.join(', ')})`
export const makeGradients = (c) => ({
  brand: `linear-gradient(110deg, ${c.violet}, ${c.blue} 45%, ${c.cyan})`,
  violetBlue: g(c.violet, c.blue),
  cyanBlue: g(c.cyan, c.blue),
  pinkViolet: g(c.pink, c.violet),
  amberPink: g(c.amber, c.pink),
})

// ═══════════════════════════════════════════════════════════════
//  TOKEN → CSS VARIABLE MAP
//  makeCssVars() turns a palette into the :root custom properties.
//  Shapes/sizes/fonts are theme-independent; colors + gradients flip.
// ═══════════════════════════════════════════════════════════════
export const makeCssVars = (c) => {
  const grad = makeGradients(c)
  return {
    '--bg': c.bg,
    '--bg-soft': c.bgSoft,
    '--text': c.text,
    '--text-dim': c.textDim,
    '--text-faint': c.textFaint,
    '--border': c.border,
    '--glass': c.glass,
    '--glass-strong': c.glassStrong,
    '--violet': c.violet,
    '--blue': c.blue,
    '--cyan': c.cyan,
    '--pink': c.pink,
    '--amber': c.amber,
    '--success': c.success,
    '--star': c.star,
    '--ink': c.ink,
    '--on-accent': c.onAccent,
    '--nav-bg': c.navBg,
    '--glow-soft': c.glowSoft,

    '--radius-sm': radius.sm,
    '--radius-md': radius.md,
    '--radius': radius.lg,
    '--pill': radius.pill,

    '--maxw': layout.maxWidth,
    '--container-pad': layout.containerPadding,
    '--section-pad': layout.sectionPadding,

    '--blur': effects.blur,
    '--shadow': effects.shadow,

    '--font-body': fonts.body,
    '--font-heading': fonts.heading,

    // gradients (theme-aware) — referenced from JS and CSS alike
    '--grad-brand': grad.brand,
    '--grad-1': grad.violetBlue,
    '--grad-2': grad.cyanBlue,
    '--grad-3': grad.pinkViolet,
    '--grad-4': grad.amberPink,
  }
}

// Pre-built var sets for each theme, keyed by name.
export const themes = {
  light: makeCssVars(lightColors),
  dark: makeCssVars(darkColors),
}

// ── Backwards-compatible exports (light = default) ──────────────
export const colors = lightColors
export const gradients = makeGradients(lightColors)
export const cssVars = themes.light
