import Section from '../../ui/Section'
import SectionHeader from '../../ui/SectionHeader'
import TestimonialCard from './TestimonialCard'
import { testimonials } from '../../../data'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow="Kind words"
        title={<>What clients <span className="gradient-text">say</span></>}
      />
      <div className="grid-testi">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} {...t} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  )
}
