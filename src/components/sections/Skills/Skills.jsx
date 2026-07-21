import Section from '../../ui/Section'
import Reveal from '../../ui/Reveal'
import Eyebrow from '../../ui/Eyebrow'
import SkillBar from './SkillBar'
import { skills } from '../../../data'
import './Skills.css'

export default function Skills() {
  return (
    <Section id="skills">
      <div className="skills-wrap">
        <Reveal>
          <Eyebrow>My toolkit</Eyebrow>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
          <p className="section-sub">
            A modern, battle-tested stack chosen for speed, reliability, and a great developer
            experience — so your product is built to last.
          </p>
        </Reveal>

        <div>
          {skills.map((s, i) => (
            <SkillBar key={s.name} {...s} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
