import { themes } from '../config/theme'

// Writes a theme's design tokens onto :root as CSS variables, so every
// stylesheet can read them via var(--token). Called before first paint
// in main.jsx and again whenever the user toggles light/dark.
const STORAGE_KEY = 'portfolio-theme'

export function applyTheme(theme = 'light') {
  const vars = themes[theme] || themes.light
  const root = document.documentElement
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
  // expose the active theme for theme-specific CSS hooks + a11y
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage may be unavailable (private mode) — ignore */
  }
}

// Resolve the theme to start with: saved choice → OS preference → light.
export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* ignore */
  }
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}
