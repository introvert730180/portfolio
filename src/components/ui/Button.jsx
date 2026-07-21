import { useMagnetic } from '../../lib/useMagnetic'
import './Button.css'

// Reusable pill button. `as` lets it render as <a> (default) or <button>.
// variant: 'primary' | 'ghost'. Set `magnetic` for a cursor-follow effect.
export default function Button({
  as = 'a',
  variant = 'primary',
  magnetic = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = as
  const ref = useMagnetic()
  return (
    <Tag
      ref={magnetic ? ref : undefined}
      className={`btn btn-${variant} ${magnetic ? 'btn-magnetic' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
