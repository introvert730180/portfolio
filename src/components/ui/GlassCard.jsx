import './GlassCard.css'

// Frosted-glass surface. `as` lets it be a div (default), <a>, etc.
export default function GlassCard({ as = 'div', className = '', children, ...rest }) {
  const Tag = as
  return (
    <Tag className={`glass ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
