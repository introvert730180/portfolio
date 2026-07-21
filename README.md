<div align="center">

# ◆ Portfolio — Full-Stack Developer & Freelancer

A fast, glassy, **black-and-white** portfolio / freelancing site with an
Apple-inspired aesthetic, **light & dark modes**, a working contact form, and an
interactive "antigravity" particle background.

Built with **React + Vite** and **Framer Motion**.

![React](https://img.shields.io/badge/React-18-000000?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-000000?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-000000?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-000000)

</div>

---

## Why this project exists

Most portfolio templates are either **pretty but unmaintainable** (one giant
file, magic numbers everywhere) or **clean but plain**. This repo is a
deliberate attempt at both at once — a site that _looks_ premium **and** is
structured the way a real production front-end should be:

- **A single source of truth for everything that varies.** Colors, sizes,
  shapes, fonts, motion timings, and all text/content live in small config
  files. You can completely re-skin or re-content the site **without touching a
  single component**.
- **Truly modular components.** Every section is broken into tiny, single-purpose
  pieces with their own co-located CSS, so changing one card never risks
  another.
- **Real performance & accessibility engineering**, not just visuals — see
  [Engineering highlights](#engineering-highlights).

It's meant to be **read as much as used** — a reference you can learn from, fork,
and make your own in minutes.

---

## Features

- **Light / dark mode** — a navbar toggle swaps between two token palettes;
  the choice is saved to `localStorage` and defaults to the visitor's OS
  preference. Every surface, gradient, and even the canvas particles re-theme.
- **Working contact form** — name / email / message with submitting, success,
  and error states. POSTs to a [Formspree](https://formspree.io) endpoint if
  configured, or falls back to a prefilled `mailto:`.
- **Animated hero headline** — the key phrase rotates through a list of words
  (`digital products` → `web apps` → …) with a smooth swap.
- **Count-up stats** — the hero stat numbers animate from zero the first time
  they scroll into view.
- **Scroll progress bar** — a thin gradient bar at the top fills as you read.
- **Magnetic buttons** — primary CTAs gently drift toward the cursor.
- **Richer project cards** — hover lifts the card, zooms the banner, and slides
  in an "open" arrow.
- **Antigravity particle field** — interactive `<canvas>` constellation that
  reacts to the cursor and follows the active theme.

Every one of these honors `prefers-reduced-motion` and is wired through the same
token/config files — no magic numbers buried in components.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build → /dist
npm run preview  # preview the production build
npm run format   # format everything with Prettier
```

---

## Make it yours (no UI code required)

| To change…                          | Edit this file              |
| ----------------------------------- | --------------------------- |
| Name, links, projects, all text     | `src/data.js`               |
| Hero rotating words                 | `src/data.js` → `profile.rotatingWords` |
| Contact-form endpoint               | `src/data.js` → `profile.contactEndpoint` |
| Light **and** dark colors           | `src/config/theme.js`       |
| Radius, sizes, fonts                | `src/config/theme.js`       |
| Animation easings & timings         | `src/config/motion.js`      |
| Page title & social/SEO meta        | `index.html`                |
| Favicon                             | `public/favicon.svg`        |

> **Re-theme in one place:** every color is a token in `theme.js`. The site ships
> with two palettes — `lightColors` and `darkColors` — and a visitor toggle in
> the navbar. `applyTheme(name)` propagates the chosen palette to CSS variables
> across the entire site (including theme-aware gradients). Both palettes are
> monochrome black & white by default — swap the accent values in either and it
> becomes colorful again.

> **Want a working contact form?** Create a free form at
> [formspree.io](https://formspree.io) and paste its endpoint into
> `profile.contactEndpoint` in `src/data.js`. With no endpoint set, the form
> gracefully falls back to opening the visitor's mail client (`mailto:`).

---

## Architecture

```
src/
├── data.js                  # CONTENT  — text, projects, nav links, rotating words
├── config/
│   ├── theme.js             # DESIGN TOKENS — light + dark palettes, shapes, fonts
│   └── motion.js            # ANIMATION TOKENS — easings, durations, particles
├── lib/
│   ├── applyTheme.js        # writes a palette → CSS variables on :root (+ persists choice)
│   ├── ThemeContext.jsx     # light/dark provider + useTheme() hook
│   └── useMagnetic.js       # cursor-follow hook for buttons
├── styles/                  # base + utilities (global, split by concern)
└── components/
    ├── ui/                  # reusable primitives, each with its own .css
    │   ├── Button · GlassCard · Eyebrow · Tag · Section · SectionHeader
    │   ├── Reveal           # scroll-reveal wrapper
    │   ├── ScrollProgress   # top scroll-completion bar
    │   ├── ThemeToggle      # light/dark switch
    │   ├── RotatingText     # cycling headline words
    │   ├── CountUp          # animated stat counter
    │   ├── Background        # aurora + particles + grain
    │   └── ParticleField    # interactive canvas constellation
    └── sections/            # one folder per section, split into sub-cards
        ├── Hero/    (Hero + HeroStats)
        ├── Services/ (Services + ServiceCard)
        ├── Skills/  (Skills + SkillBar)
        ├── Projects/ (Projects + ProjectCard)
        ├── Process/ (Process + ProcessCard)
        ├── Testimonials/ (Testimonials + TestimonialCard)
        ├── Contact/ (Contact + ContactForm)
        ├── Navbar · Footer
        └── index.js         # single barrel import
```

**The token → CSS-variable bridge.** `theme.js` is plain JavaScript, so values
can be reused in JS (e.g. gradient strings). It exports two palettes
(`lightColors` / `darkColors`); `applyTheme(name)` writes the active palette's
tokens onto `:root` as CSS custom properties, and every stylesheet reads them via
`var(--token)`. One source of truth, usable from both JS and CSS — and swappable
at runtime. `ThemeContext` holds the current choice (persisted to
`localStorage`, defaulting to the OS `prefers-color-scheme`), so a toggle
re-themes the whole site instantly with no flash on reload.

---

## Engineering highlights

These are the "good tech & tips" baked in — small decisions that add up to a
fast, accessible, maintainable site:

- **Smaller animation bundle** — Framer Motion via `LazyMotion` + the `m`
  component (with `strict`) ships only the DOM-animation features actually used.
- **Vendor chunk splitting** — React and Framer Motion are split into cacheable
  chunks (`vite.config.js`) so repeat visits and re-deploys download less.
- **`content-visibility: auto`** — the browser skips rendering offscreen
  sections until they're needed.
- **GPU-friendly, paused animation** — the particle field runs on `<canvas>` and
  **pauses its render loop when the tab is hidden** (saves battery/CPU).
- **Non-janky scrolling** — the navbar's scroll handler is `requestAnimationFrame`
  throttled and registered as a `passive` listener.
- **Accessibility first** — global `MotionConfig reducedMotion="user"` plus
  explicit `prefers-reduced-motion` guards in the particle field, count-up,
  rotating text, and magnetic buttons honor users who opt out of motion. The
  theme toggle is a proper `role="switch"` with `aria-checked`.
- **Runtime theming with no flash** — the saved palette is written to `:root`
  in `main.jsx` _before_ first paint, so reloading in dark mode never flashes
  white. Switching themes re-keys the canvas so it re-reads its color token.
- **Theme-aware everything** — particles, gradients, banner/avatar text, navbar
  glass, and the "available" pulse all resolve through tokens (`--on-accent`,
  `--nav-bg`, `--glow-soft`, …), so both palettes stay correct.
- **Cheap, GPU-friendly interactions** — magnetic buttons and the scroll bar use
  pure `transform`; the magnetic effect is a no-op on touch / coarse pointers.
- **Graceful contact form** — submits via `fetch` with proper loading/error
  states and degrades to `mailto:` when no endpoint is set.
- **Consistent style** — Prettier + EditorConfig keep formatting uniform.

---

## Deploy

`npm run build` outputs a static `dist/` folder — host it anywhere:

- **Vercel / Netlify** — point at the repo; build `npm run build`, output `dist`.
- **GitHub Pages** — push `dist/` (set Vite `base` if served from a sub-path).

---

## Tech stack

**React 18** · **Vite 5** · **Framer Motion 11** · vanilla CSS (custom
properties, glassmorphism, `backdrop-filter`) · HTML5 `<canvas>`.

---

<div align="center">
<sub>Designed & built to be forked. If it inspired you, ⭐ the repo.</sub>
</div>
