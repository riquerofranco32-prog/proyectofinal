import dynamic from 'next/dynamic'

// Carga dinámica para evitar errores de SSR (usa window/Math.random)
const MonteCarloSentinel = dynamic(
  () => import('../components/MonteCarloSentinel'),
  { ssr: false }
)

export default function MonteCarlo() {
  return <MonteCarloSentinel />
}
