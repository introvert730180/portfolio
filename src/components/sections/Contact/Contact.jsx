import Section from '../../ui/Section'
import Reveal from '../../ui/Reveal'
import Eyebrow from '../../ui/Eyebrow'
import GlassCard from '../../ui/GlassCard'
import ContactForm from './ContactForm'
import './Contact.css'

export default function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <GlassCard className="contact-card">
          <Eyebrow>Let's talk</Eyebrow>
          <h2>
            Have a project <span className="gradient-text">in mind?</span>
          </h2>
          <p>
            Tell me what you're building. I'll get back to you within 24 hours with ideas and a
            clear next step.
          </p>
          <ContactForm />
        </GlassCard>
      </Reveal>
    </Section>
  )
}
