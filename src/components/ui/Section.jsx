// Thin wrapper: a <section id> with a centered .container inside.
// Keeps consistent vertical rhythm across every section.
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={className}>
      <div className="container">{children}</div>
    </section>
  )
}
