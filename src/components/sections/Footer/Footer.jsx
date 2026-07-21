import { profile } from '../../../data'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {profile.name} · {profile.location}
        </p>
        <div className="socials">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
