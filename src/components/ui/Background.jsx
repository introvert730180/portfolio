import ParticleField from './ParticleField'
import { useTheme } from '../../lib/ThemeContext'
import './Background.css'

// Layered backdrop (all behind content):
//   aurora haze (-3)  →  floating particles (-2)  →  grain (-1)
export default function Background() {
  const { theme } = useTheme()
  return (
    <>
      <div className="aurora">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* keyed on theme so the canvas remounts and re-reads the --text
          color token when the user switches light/dark */}
      <ParticleField key={theme} />
      <div className="grain"></div>
    </>
  )
}
