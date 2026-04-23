import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0C',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      gap: '2rem',
      padding: '2rem'
    }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
        Sentinel — Proyecto Final
      </h1>
      <p style={{ color: '#666', fontSize: '1rem' }}>Seleccioná un escenario</p>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/dashboard" style={{
          background: '#111',
          border: '1px solid #222',
          borderRadius: '12px',
          padding: '1.5rem 2.5rem',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 600,
          transition: 'border-color 0.2s',
        }}>
          📊 Stratos Dashboard
        </Link>
        <Link href="/montecarlo" style={{
          background: '#111',
          border: '1px solid #222',
          borderRadius: '12px',
          padding: '1.5rem 2.5rem',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}>
          🎲 Monte Carlo
        </Link>
      </div>
    </div>
  )
}
