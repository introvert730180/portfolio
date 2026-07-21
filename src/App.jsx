import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import Background from './components/ui/Background'
import ScrollProgress from './components/ui/ScrollProgress'
import { ThemeProvider } from './lib/ThemeContext'
import {
  Navbar,
  Hero,
  Services,
  Skills,
  Projects,
  Process,
  Testimonials,
  Contact,
  Footer,
} from './components/sections'

export default function App() {
  return (
    // LazyMotion + `m` ship only the DOM animation features we use
    // (smaller bundle). `strict` enforces that we never import the
    // heavier `motion` component by mistake.
    <LazyMotion features={domAnimation} strict>
      {/* respect the OS "reduce motion" setting everywhere */}
      <MotionConfig reducedMotion="user">
        {/* light/dark state for the whole tree */}
        <ThemeProvider>
          <ScrollProgress />
          <Background />
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Skills />
            <Projects />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
