import Link from 'next/link'
import dynamic from 'next/dynamic'

const MonteCarloSentinel = dynamic(
  () => import('../components/MonteCarloSentinel'),
  { ssr: false }
)

export default function MonteCarlo() {
  return (
    <div style={{ position: 'relative' }}>
      <Link href="/" style={{
        position: 'fixed',
        top: '1.25rem',
        left: '1.25rem',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '10px',
        padding: '0.5rem 1rem',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: 600,
        backdropFilter: 'blur(8px)',
      }}>
        ← Volver
      </Link>
      <MonteCarloSentinel />
    </div>
  )
}
