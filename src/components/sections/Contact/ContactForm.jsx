import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Button from '../../ui/Button'
import { ease } from '../../../config/motion'
import { profile } from '../../../data'

// A real, submitting contact form.
//   • POSTs to profile.contactEndpoint (the built-in /api/contact server,
//     which validates, rate-limits, and emails the owner).
//   • Falls back to a prefilled mailto: when no endpoint is configured.
// Client-side validation here is for UX only — the server validates again.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, message }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (message.trim().length < 10) errors.message = 'A little more detail, please (10+ characters).'
  return errors
}

const EMPTY = { name: '', email: '', message: '', company: '' }

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [formError, setFormError] = useState('')

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // clear a field's error as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const found = validate(form)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setErrors({})

    // No endpoint configured → fall back to a prefilled mailto:.
    if (!profile.contactEndpoint) {
      const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(profile.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
        return
      }

      // surface server-side problems with useful messaging
      const data = await res.json().catch(() => ({}))
      if (res.status === 429) {
        setFormError(data.error || 'Too many messages — please try again later.')
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors)
      } else {
        setFormError(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('error')
    } catch {
      setStatus('error')
      setFormError(`Network error — you can email me directly at ${profile.email}.`)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <m.div
          key="done"
          className="contact-success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="contact-success-icon">✓</span>
          <h3>Message sent!</h3>
          <p>Thanks for reaching out — I'll get back to you within 24 hours.</p>
        </m.div>
      ) : (
        <m.form
          key="form"
          className="contact-form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {/* honeypot — hidden from humans; bots that fill it are dropped */}
          <input
            type="text"
            name="company"
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.company}
            onChange={update}
          />

          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={update}
                aria-invalid={!!errors.name}
              />
              {errors.name && <em className="field-error">{errors.name}</em>}
            </label>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={update}
                aria-invalid={!!errors.email}
              />
              {errors.email && <em className="field-error">{errors.email}</em>}
            </label>
          </div>

          <label className="field">
            <span>Project details</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell me what you're building, your timeline, and budget range…"
              value={form.message}
              onChange={update}
              aria-invalid={!!errors.message}
            />
            {errors.message && <em className="field-error">{errors.message}</em>}
          </label>

          {formError && (
            <p className="contact-error" role="alert">
              {formError}
            </p>
          )}

          <div className="cta-row contact-cta">
            <Button
              as="button"
              type="submit"
              variant="primary"
              magnetic
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Send message →'}
            </Button>
            <Button href={profile.resumeUrl} variant="ghost">
              Download résumé
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  )
}
