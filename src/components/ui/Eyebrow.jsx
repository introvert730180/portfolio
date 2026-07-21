import './Eyebrow.css'

// Small pill label above headings. Set `pulse` for the green "available" dot.
export default function Eyebrow({ children, pulse = false, className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      {pulse && <span className="pulse"></span>}
      {children}
    </span>
  )
}
