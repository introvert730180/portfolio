import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Button from '../../ui/Button'
import ThemeToggle from '../../ui/ThemeToggle'
import { ease } from '../../../config/motion'
import { profile, navLinks } from '../../../data'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // rAF-throttled + passive: at most one state check per frame, and the
    // listener never blocks scrolling.
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 24)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu once the viewport grows back to the desktop layout,
  // so it can't get stranded open behind the inline links.
  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#top" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <span className="dot">{profile.name.charAt(0)}</span>
        {profile.name}
      </a>

      <div className="nav-links">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <ThemeToggle />
        <Button href="#contact" variant="primary" className="nav-cta">
          Hire me
        </Button>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle-bars" data-open={menuOpen}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="nav-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
          >
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <Button
              href="#contact"
              variant="primary"
              className="nav-menu-cta"
              onClick={() => setMenuOpen(false)}
            >
              Hire me
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
