import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { applyTheme, getInitialTheme } from './applyTheme'

// Shared light/dark state. The provider applies the theme to :root on every
// change; any component can read `theme` or call `toggle()` via useTheme().
const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // re-write CSS variables whenever the theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
