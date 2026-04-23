import Link from 'next/link'

export default function Dashboard() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
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
      <iframe
        src="/sentinel_stratos_dashboard.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Sentinel Stratos Dashboard"
      />
    </div>
  )
}
