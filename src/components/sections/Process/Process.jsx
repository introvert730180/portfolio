import Section from '../../ui/Section'
import SectionHeader from '../../ui/SectionHeader'
import ProcessCard from './ProcessCard'
import { process } from '../../../data'
import './Process.css'

export default function Process() {
  return (
    <Section id="process">
      <SectionHeader
        eyebrow="How we'll work"
        title={<>A simple, <span className="gradient-text">transparent process</span></>}
        sub="No surprises — just clear steps from first call to launch day."
      />
      <div className="grid-process">
        {process.map((p, i) => (
          <ProcessCard key={p.step} {...p} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}
