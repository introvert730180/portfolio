import Reveal from '../../ui/Reveal'
import GlassCard from '../../ui/GlassCard'

// One service tile.
export default function ServiceCard({ icon, title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlassCard className="service-card">
        <div className="ic">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </GlassCard>
    </Reveal>
  )
}
