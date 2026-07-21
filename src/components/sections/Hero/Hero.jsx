import { m } from 'framer-motion'
import Eyebrow from '../../ui/Eyebrow'
import Button from '../../ui/Button'
import RotatingText from '../../ui/RotatingText'
import HeroStats from './HeroStats'
import { container, item } from '../../../config/motion'
import { profile } from '../../../data'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <m.div variants={container} initial="hidden" animate="show">
          <m.div variants={item} className="hero-badge">
            <Eyebrow pulse>{profile.availability}</Eyebrow>
          </m.div>

          <m.h1 variants={item}>
            Building <RotatingText words={profile.rotatingWords} />
            <br />
            that feel effortless.
          </m.h1>

          <m.p variants={item} className="lead">
            {profile.tagline}
          </m.p>

          <m.div variants={item} className="cta-row hero-cta">
            <Button href="#contact" variant="primary" magnetic>
              Start a project →
            </Button>
            <Button href="#work" variant="ghost">
              View my work
            </Button>
          </m.div>
        </m.div>

        <HeroStats />
      </div>
    </section>
  )
}
