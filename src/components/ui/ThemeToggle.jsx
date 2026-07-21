import { useTheme } from '../../lib/ThemeContext'
import './ThemeToggle.css'

// Sun/moon switch wired to the global theme context.
export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  )
}
