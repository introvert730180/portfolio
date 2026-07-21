import Reveal from '../../ui/Reveal'
import GlassCard from '../../ui/GlassCard'
import Tag from '../../ui/Tag'

// One project card with a gradient banner + tech tags.
export default function ProjectCard({ title, category, desc, tags, accent, url, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlassCard as="a" href={url} target="_blank" rel="noreferrer" className="project-card">
        <div className="project-top" style={{ background: accent }}>
          <div className="glow" style={{ background: accent }}></div>
          <span className="label">{title}</span>
          <span className="project-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="project-body">
          <span className="cat">{category}</span>
          <h3>{title}</h3>
          <p>{desc}</p>
          <div className="tags">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </GlassCard>
    </Reveal>
  )
}
