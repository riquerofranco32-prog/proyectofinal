import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/c.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Sora', system-ui, sans-serif",
      gap: '2.5rem',
      padding: '2rem',
      position: 'relative',
    }}>
      {/* Overlay oscuro para legibilidad */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(1px)',
      }} />

      {/* Contenido */}
      <div style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.85rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '-1rem',
        }}>Proyecto Final</p>

        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          SENTINEL
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '1rem',
          letterSpacing: '0.05em',
        }}>
          Seleccioná un escenario
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/dashboard" style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '14px',
            padding: '1.25rem 2.25rem',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            backdropFilter: 'blur(8px)',
          }}>
            📊 Stratos Dashboard
          </Link>
          <Link href="/montecarlo" style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '14px',
            padding: '1.25rem 2.25rem',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            backdropFilter: 'blur(8px)',
          }}>
            🎲 Monte Carlo
          </Link>
        </div>
      </div>
    </div>
  )
}
