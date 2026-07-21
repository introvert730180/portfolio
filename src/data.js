// ═══════════════════════════════════════════════════════════════
//  CONTENT  —  the single source of truth for the TEXT / DATA.
//  Edit your name, links, services, projects, etc. here.
//  (Design tokens live in src/config/theme.js)
// ═══════════════════════════════════════════════════════════════

export const profile = {
  name: 'Abhijeet',
  role: 'Full-Stack Developer & Freelancer',
  location: 'IIT Hyderabad, India',
  email: 'Abhijeetkumar730180@gmail.com',
  tagline:
    'I design and build fast, beautiful web applications — from pixel-perfect interfaces to scalable backends.',
  availability: 'Available for freelance work',
  resumeUrl: '#', // link to your resume PDF
  // Words the hero headline cycles through (first one shows on load).
  rotatingWords: ['digital products', 'web apps', 'experiences', 'interfaces'],
  // Where the contact form POSTs. Defaults to the built-in email API
  // (server/index.js, proxied at /api/contact). Set to '' to fall back
  // to a plain mailto: link instead.
  contactEndpoint: '/api/contact',
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
    { label: 'Twitter / X', url: 'https://x.com/' },
  ],
  stats: [
    { value: '20+', label: 'Projects shipped' },
    { value: '15+', label: 'Happy clients' },
    { value: '3+', label: 'Years coding' },
    { value: '100%', label: 'On-time delivery' },
  ],
}

// Navbar links (each href points at a section id)
export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
]

export const services = [
  {
    icon: '🎨',
    title: 'Web Design',
    desc: 'Clean, modern, responsive interfaces with a strong focus on UX and micro-interactions.',
  },
  {
    icon: '💻',
    title: 'Frontend Development',
    desc: 'Production-grade React apps — fast, accessible, and built to scale across devices.',
  },
  {
    icon: '🛠️',
    title: 'Backend & APIs',
    desc: 'Robust REST / GraphQL APIs, authentication, databases, and cloud deployment.',
  },
  {
    icon: '⚡',
    title: 'Performance & SEO',
    desc: 'Lightning-fast load times, Core Web Vitals tuning, and search-friendly architecture.',
  },
]

export const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'Next.js', level: 85 },
  { name: 'Python', level: 82 },
  { name: 'PostgreSQL', level: 80 },
  { name: 'Tailwind / CSS', level: 92 },
  { name: 'AWS / Cloud', level: 75 },
]

export const projects = [
  {
    title: 'SaaS Dashboard',
    category: 'Full-Stack',
    desc: 'Analytics platform with real-time charts, role-based access, and Stripe billing.',
    tags: ['React', 'Node', 'PostgreSQL'],
    accent: 'var(--grad-1)',
    url: '#',
  },
  {
    title: 'E-Commerce Storefront',
    category: 'Frontend',
    desc: 'Headless commerce site with smooth cart animations and a blazing-fast checkout.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    accent: 'var(--grad-2)',
    url: '#',
  },
  {
    title: 'AI Chat Assistant',
    category: 'Full-Stack',
    desc: 'Streaming chat app with conversation memory and a polished, responsive UI.',
    tags: ['React', 'Python', 'WebSockets'],
    accent: 'var(--grad-3)',
    url: '#',
  },
  {
    title: 'Portfolio / Agency Sites',
    category: 'Design + Dev',
    desc: 'A series of glassy, animated marketing sites delivered for freelance clients.',
    tags: ['React', 'Framer Motion', 'Design'],
    accent: 'var(--grad-4)',
    url: '#',
  },
]

export const process = [
  {
    step: '01',
    title: 'Discover',
    desc: 'We talk through your goals, audience, and scope to define exactly what success looks like.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'I craft a clean, on-brand UI and share interactive previews before a line of code is final.',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Fast, maintainable code with regular check-ins so you always know where things stand.',
  },
  {
    step: '04',
    title: 'Launch',
    desc: 'Deploy, optimize, and hand off — plus support to keep everything running smoothly.',
  },
]

export const testimonials = [
  {
    quote:
      'Delivered ahead of schedule and the site looks incredible. Communication was flawless throughout.',
    name: 'Sarah K.',
    title: 'Founder, Startup',
  },
  {
    quote:
      'Took our messy idea and turned it into a polished product. Easily the best developer we have worked with.',
    name: 'James R.',
    title: 'Product Lead',
  },
  {
    quote:
      'Fast, professional, and genuinely cares about quality. Already booked the next project.',
    name: 'Priya M.',
    title: 'Marketing Director',
  },
]
