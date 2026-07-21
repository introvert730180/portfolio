import { m } from 'framer-motion'
import CountUp from '../../ui/CountUp'
import { ease } from '../../../config/motion'
import { profile } from '../../../data'

// The glass stats strip under the hero headline.
export default function HeroStats() {
  return (
    <m.div
      className="glass hero-stats"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease }}
    >
      {profile.stats.map((s) => (
        <div className="stat" key={s.label}>
          <h3>
            <CountUp value={s.value} />
          </h3>
          <p>{s.label}</p>
        </div>
      ))}
    </m.div>
  )
}
