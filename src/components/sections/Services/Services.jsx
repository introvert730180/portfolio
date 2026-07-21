import Section from '../../ui/Section'
import SectionHeader from '../../ui/SectionHeader'
import ServiceCard from './ServiceCard'
import { services } from '../../../data'
import './Services.css'

export default function Services() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow="What I do"
        title={<>Services built to <span className="gradient-text">ship results</span></>}
        sub="End-to-end help — from the first wireframe to a polished product live in production."
      />
      <div className="grid-services">
        {services.map((s, i) => (
          <ServiceCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}
