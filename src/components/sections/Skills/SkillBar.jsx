import { m } from 'framer-motion'
import Reveal from '../../ui/Reveal'
import { ease, durations } from '../../../config/motion'

// One labelled, animated progress bar.
export default function SkillBar({ name, level, index = 0 }) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="skill-row">
        <div className="top">
          <span>{name}</span>
          <span>{level}%</span>
        </div>
        <div className="skill-bar">
          <m.i
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: durations.bar, delay: 0.1 + index * 0.05, ease }}
          />
        </div>
      </div>
    </Reveal>
  )
}
