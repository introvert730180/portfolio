import Reveal from '../../ui/Reveal'
import GlassCard from '../../ui/GlassCard'

// One client quote card.
export default function TestimonialCard({ quote, name, title, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlassCard className="testi-card">
        <div className="stars">★★★★★</div>
        <blockquote>"{quote}"</blockquote>
        <div className="who">
          <div className="avatar">{name.charAt(0)}</div>
          <div>
            <h4>{name}</h4>
            <span>{title}</span>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  )
}
