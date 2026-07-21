import Reveal from '../../ui/Reveal'
import GlassCard from '../../ui/GlassCard'

// One numbered step in the "how we work" flow.
export default function ProcessCard({ step, title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlassCard className="process-card">
        <div className="step">{step}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </GlassCard>
    </Reveal>
  )
}
