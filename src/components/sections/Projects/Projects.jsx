import Section from '../../ui/Section'
import SectionHeader from '../../ui/SectionHeader'
import ProjectCard from './ProjectCard'
import { projects } from '../../../data'
import './Projects.css'

export default function Projects() {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow="Selected work"
        title={<>Recent <span className="gradient-text">projects</span></>}
        sub="A few things I've designed and built for clients and side ventures."
      />
      <div className="grid-projects">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} {...p} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}
