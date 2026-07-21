import Reveal from './Reveal'
import Eyebrow from './Eyebrow'
import './SectionHeader.css'

// Eyebrow + title + optional subtitle, revealed on scroll.
// `title` and `sub` accept JSX (so you can drop in <span className="gradient-text">).
export default function SectionHeader({ eyebrow, title, sub, center = false }) {
  return (
    <Reveal className={`section-head ${center ? 'center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  )
}
