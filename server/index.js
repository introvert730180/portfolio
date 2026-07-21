// ═══════════════════════════════════════════════════════════════
//  CONTACT API  —  receives form submissions, validates + rate-limits
//  them, and emails the owner. Runs as a tiny standalone Express app.
//
//  Configure via environment variables (see .env.example):
//    SMTP_HOST  SMTP_PORT  SMTP_SECURE  SMTP_USER  SMTP_PASS
//    MAIL_TO    MAIL_FROM  ALLOWED_ORIGIN  PORT
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const PORT = process.env.PORT || 3001
const MAIL_TO = process.env.MAIL_TO || 'abhijeetkumar081037@gmail.com'
const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'

const app = express()
// trust the first proxy hop so rate-limiting sees the real client IP
app.set('trust proxy', 1)
app.use(cors({ origin: ALLOWED_ORIGIN }))
// cap body size — a contact message never needs more than a few KB
app.use(express.json({ limit: '16kb' }))

// ── Email transport (created once, verified lazily) ───────────────
let transporter = null
function getTransporter() {
  if (transporter) return transporter
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transporter
}

// ── Validation ────────────────────────────────────────────────────
// Pragmatic email check — rejects the obviously-broken without trying to
// fully implement RFC 5322 (which is impossible with a single regex).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, message }) {
  const errors = {}
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100)
    errors.name = 'Please enter your name (2–100 characters).'
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 254)
    errors.email = 'Please enter a valid email address.'
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000)
    errors.message = 'Please write a message (10–5000 characters).'
  return errors
}

// escape user text before dropping it into an HTML email body
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Rate limiting ──────────────────────────────────────────────────
// At most 5 submissions per IP per 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages. Please try again in a little while.' },
})

// ── Routes ─────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name = '', email = '', message = '', company = '' } = req.body || {}

  // Honeypot: bots fill the hidden "company" field. Pretend success so
  // they don't learn it's a trap, but send nothing.
  if (company) return res.json({ ok: true })

  const errors = validate({ name, email, message })
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors })
  }

  const tx = getTransporter()
  if (!tx) {
    console.error('[contact] SMTP not configured — set SMTP_USER / SMTP_PASS in .env')
    return res
      .status(503)
      .json({ ok: false, error: 'Email service is not configured yet. Please try again later.' })
  }

  const cleanName = name.trim()
  const cleanEmail = email.trim()
  const cleanMessage = message.trim()

  try {
    await tx.sendMail({
      from: `"Portfolio Contact" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: `"${cleanName}" <${cleanEmail}>`, // hit reply → answers the sender
      subject: `New portfolio enquiry from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 12px">New portfolio enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>
        </div>`,
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error('[contact] send failed:', err.message)
    return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
  }
})

app.listen(PORT, () => {
  console.log(`✉  Contact API listening on http://localhost:${PORT}`)
  if (!getTransporter()) {
    console.warn('⚠  SMTP not configured — submissions will return 503 until you set up .env')
  }
})
