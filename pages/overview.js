import Link from 'next/link'

export default function Overview() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080A09; color: #fff; font-family: 'Sora', sans-serif; }

        ::-webkit-scrollbar { width: 4px; background: #080A09; }
        ::-webkit-scrollbar-thumb { background: #2a3a2e; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.4s; }
        .d4 { animation-delay: 0.55s; }
        .d5 { animation-delay: 0.7s; }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.75rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .card:hover {
          border-color: rgba(74,200,100,0.25);
          background: rgba(74,200,100,0.04);
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1.5rem;
          text-align: center;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: rgba(74,200,100,0.3); }

        .tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(74,200,100,0.12);
          color: #4AC864;
          border: 1px solid rgba(74,200,100,0.2);
        }

        .pill {
          display: inline-block;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
        }

        .dot { animation: pulse 2.5s ease-in-out infinite; }

        .section-title {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #4AC864;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-family: 'DM Mono', monospace;
        }

        .scenario-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          color: #fff;
          text-decoration: none;
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }
        .scenario-btn:hover {
          border-color: rgba(74,200,100,0.35);
          background: rgba(74,200,100,0.06);
          transform: translateY(-2px);
        }
        .scenario-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: rgba(74,200,100,0.1);
          border: 1px solid rgba(74,200,100,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 2.5rem 0;
        }

        .supplier-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .supplier-row:last-child { border-bottom: none; }
        .supplier-badge {
          flex-shrink: 0;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          font-family: 'DM Mono', monospace;
        }

        .obj-item {
          display: flex;
          gap: 1rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: flex-start;
        }
        .obj-item:last-child { border-bottom: none; }
        .obj-num {
          flex-shrink: 0;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(74,200,100,0.12);
          border: 1px solid rgba(74,200,100,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 700; color: #4AC864;
          font-family: 'DM Mono', monospace;
          margin-top: 0.05rem;
        }

        .timeline-step {
          display: flex;
          gap: 1.25rem;
          position: relative;
          padding-bottom: 1.5rem;
        }
        .timeline-step:last-child { padding-bottom: 0; }
        .timeline-line {
          position: absolute;
          left: 15px;
          top: 32px;
          bottom: 0;
          width: 1px;
          background: rgba(74,200,100,0.15);
        }
        .timeline-step:last-child .timeline-line { display: none; }
        .timeline-dot {
          flex-shrink: 0;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(74,200,100,0.1);
          border: 1px solid rgba(74,200,100,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; z-index: 1;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#080A09' }}>

        {/* NAV */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 2rem',
          background: 'rgba(8,10,9,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Link href="/" style={{
            color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.05em',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'DM Mono, monospace',
            transition: 'color 0.2s',
          }}>
            ← INICIO
          </Link>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em' }}>
            SENTINEL / PANEO GENERAL
          </span>
          <span className="tag">UTN · 2025</span>
        </nav>

        {/* HERO */}
        <div style={{
          paddingTop: '120px',
          paddingBottom: '4rem',
          paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>

          {/* Header */}
          <div className="fade-up d1" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="dot" style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#4AC864', display: 'inline-block',
              }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: '#4AC864', letterSpacing: '0.2em' }}>
                PROYECTO FINAL · INGENIERÍA INDUSTRIAL
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '1rem',
            }}>
              Sentinel —<br />
              <span style={{ color: '#4AC864' }}>ResQ Stratos</span>
            </h1>
            <p style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: '580px',
            }}>
              Planta de ensamble de drones VTOL para monitoreo ambiental y prevención de incendios forestales. Mendoza, Argentina.
            </p>
          </div>

          <div className="divider fade-up d1" />

          {/* AUTORES Y DATOS */}
          <div className="fade-up d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="card">
              <p className="section-title">Equipo</p>
              {['Riquero Franco', 'Silva Lautaro', 'Toledano Martin', 'Sosa Maria Iveth'].map(a => (
                <p key={a} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{a}</p>
              ))}
            </div>
            <div className="card">
              <p className="section-title">Institución</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Universidad Tecnológica Nacional<br />
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>Facultad Regional San Rafael</span>
              </p>
              <div style={{ marginTop: '1rem' }}>
                <p className="section-title">Docentes</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Ing. Llorente, Carlos</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Ing. Romani, Bruno</p>
              </div>
            </div>
          </div>

          {/* QUÉ ES SENTINEL */}
          <div className="fade-up d2" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">El ecosistema</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '🚁', title: 'VANT Sentinel Base', desc: 'Dron VTOL híbrido. Despega vertical sin pista, vuela horizontal con eficiencia de ala fija. Un solo hardware estandarizado para múltiples verticales de negocio sin cambiar la línea de producción.' },
                { icon: '☁️', title: 'Sentinel Cloud', desc: 'Plataforma SaaS en la nube con módulos: FireWatch (detección de incendios), Agro-Scan (índices de cultivo y fotogrametría) y Livestock (conteo y rastreo de ganado). La inteligencia está en el software.' },
                { icon: '📡', title: 'Nodos IoT', desc: 'Sensores terrestres fijos que complementan la cobertura aérea, amplían el monitoreo en tiempo real y conforman una red distribuida de datos ambientales.' },
              ].map(item => (
                <div key={item.title} className="card">
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MÓDULOS SENTINEL CLOUD */}
          <div className="fade-up d2" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Módulos Sentinel Cloud · SaaS</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                {
                  icon: '🔥',
                  color: 'rgba(255,120,60,0.15)',
                  border: 'rgba(255,120,60,0.2)',
                  accent: '#FF7A3C',
                  name: 'FireWatch',
                  badge: 'Vertical de lanzamiento',
                  desc: 'Algoritmos de visión artificial sobre imágenes térmicas para detectar hotspots invisibles al ojo humano y columnas de humo incipientes. Genera alertas georreferenciadas en tiempo real a brigadas.',
                },
                {
                  icon: '🌿',
                  color: 'rgba(74,200,100,0.08)',
                  border: 'rgba(74,200,100,0.2)',
                  accent: '#4AC864',
                  name: 'Agro-Scan',
                  badge: 'Agritech · Escalabilidad',
                  desc: 'Fotogrametría e índices de verdor (VARI) con las cámaras RGB del dron base. Procesamiento en la nube para reportes de salud de cultivo, estrés hídrico y conteo de plantas.',
                },
                {
                  icon: '🐄',
                  color: 'rgba(100,160,255,0.08)',
                  border: 'rgba(100,160,255,0.2)',
                  accent: '#64A0FF',
                  name: 'Livestock',
                  badge: 'Livestock Tech · Escalabilidad',
                  desc: 'Algoritmos de detección de formas entrenados para identificar, contar y rastrear ganado en zonas extensivas. También permite detección de intrusiones y seguridad perimetral.',
                },
              ].map(m => (
                <div key={m.name} style={{
                  background: m.color,
                  border: `1px solid ${m.border}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: m.accent }}>{m.name}</span>
                  </div>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                    color: m.accent, fontFamily: 'DM Mono, monospace',
                    textTransform: 'uppercase', opacity: 0.7,
                  }}>{m.badge}</span>
                  <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginTop: '0.6rem' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MERCADOS */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Verticales de mercado</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {[
                { label: '🔥 Climatech', sub: 'Prevención incendios forestales' },
                { label: '🌿 Agritech', sub: 'Agricultura de precisión y viñedos' },
                { label: '🐄 Livestock Tech', sub: 'Control ganadero y reservas' },
                { label: '🏗️ Seguridad', sub: 'Infraestructura crítica y puertos' },
              ].map(m => (
                <div key={m.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '0.75rem 1.25rem',
                }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{m.label}</p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OBJETIVOS */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Objetivos del proyecto</p>
            <div className="card">
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Objetivo general: </span>
                Estudio de prefactibilidad técnico-económica para la instalación de una planta de manufactura avanzada de VANT en el Parque Industrial de Luján de Cuyo, Mendoza, destinada a la prevención de riesgos ambientales y la gestión de datos mediante la plataforma Sentinel.
              </p>
              {[
                { n: '01', text: 'Estudio de mercado exhaustivo: cuantificar la demanda potencial en el sector público (manejo de fuego, ambiente) y privado (agropecuario/forestal), identificando competencia directa e indirecta.' },
                { n: '02', text: 'Definir las especificaciones técnicas del "VANT Base Sentinel" y la arquitectura de "Sentinel Cloud", estableciendo un producto estandarizado que permita múltiples aplicaciones sin modificar la línea de producción.' },
                { n: '03', text: 'Determinar la ingeniería del proyecto: tecnología de manufactura (montaje electrónico, impresión 3D, bancos de prueba), capacidad instalada óptima y diseño del layout de la planta.' },
                { n: '04', text: 'Analizar la localización óptima evaluando proximidad a proveedores tecnológicos, disponibilidad de mano de obra calificada y logística de distribución.' },
                { n: '05', text: 'Establecer el marco jurídico-organizacional y asegurar cumplimiento de normativas ANAC para fabricación y operación de drones, así como regulaciones ambientales vigentes.' },
                { n: '06', text: 'Evaluar el impacto ambiental en producción (residuos electrónicos) y en operación, destacando la contribución a la sostenibilidad y preservación de ecosistemas.' },
                { n: '07', text: 'Desarrollar el análisis económico-financiero: inversión inicial, costos operativos e ingresos proyectados por venta de hardware y suscripciones SaaS. Determinar rentabilidad con VAN, TIR y punto de equilibrio.' },
              ].map(o => (
                <div key={o.n} className="obj-item">
                  <div className="obj-num">{o.n}</div>
                  <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{o.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MERCADO PROVEEDOR */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Mercado proveedor · Supply chain</p>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                La estrategia de aprovisionamiento se basa en el benchmarking del <span style={{ color: 'rgba(255,255,255,0.75)' }}>XAG P100 Pro</span> (líder mundial en drones agrícolas). Los componentes electromecánicos no son viables de fabricar en Argentina; la estrategia consiste en importar componentes OEM de los mismos proveedores que abastecen a los gigantes asiáticos, para luego realizar la <span style={{ color: '#4AC864' }}>integración, programación y ensamblaje final en Mendoza</span>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Componentes críticos importados', sub: 'Sensores FLIR, motores T-Motor, aviónica', color: 'rgba(255,160,60,0.1)', border: 'rgba(255,160,60,0.2)', dot: '#FFA03C' },
                  { label: 'Integración nacional', sub: 'Estructura, electrónica complementaria, conectividad', color: 'rgba(74,200,100,0.08)', border: 'rgba(74,200,100,0.2)', dot: '#4AC864' },
                  { label: 'Insumos estratégicos de software', sub: 'Infraestructura cloud, servidores, APIs', color: 'rgba(100,160,255,0.08)', border: 'rgba(100,160,255,0.2)', dot: '#64A0FF' },
                ].map(c => (
                  <div key={c.label} style={{ background: c.color, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '0.9rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, marginBottom: '0.5rem' }} />
                    <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{c.label}</p>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.3rem' }}>{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <p className="section-title">Proveedores clave identificados</p>
              {[
                { name: 'T-Motor (Tiger Motor)', origin: 'China', role: 'Crítico', desc: 'Motores brushless serie U8/U10 para heavy lift. Estándar industrial para plataformas de 20–50 kg. Tecnología de bobinado manual y rodamientos aeroespaciales.' },
                { name: 'Hobbywing', origin: 'China', role: 'Crítico', desc: 'ESCs (controladores de velocidad) XRotor Pro con algoritmos FOC. Reduce temperatura de operación y extiende vida útil en entornos hostiles.' },
                { name: 'Teledyne FLIR', origin: 'EE.UU.', role: 'Crítico', desc: 'Sensores térmicos FLIR Vue Pro / Hadron para detección de incendios. Estándar mundial en termografía aérea.' },
                { name: 'CubePilot (Hex)', origin: 'Australia', role: 'Alta', desc: 'Flight controller Cube Naranja / Azul (Pixhawk 2.1). Aviónica de grado industrial con redundancia para misiones autónomas.' },
                { name: 'JOUAV (Chengdu)', origin: 'China', role: 'Referencia', desc: 'Especialistas en VTOL industriales. Proveedores de aviónica de grado militar y fuselajes de fibra de carbono. Benchmark de arquitectura VTOL.' },
                { name: 'Talleres locales Luján de Cuyo', origin: 'Argentina', role: 'Local', desc: 'Mecanizados de aluminio, piezas de anclaje y carcasas de protección. Integración del fuselaje con la capacidad instalada en el Parque Industrial.' },
              ].map(s => (
                <div key={s.name} className="supplier-row">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '0.88rem', fontWeight: 700 }}>{s.name}</p>
                      <span style={{
                        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em',
                        padding: '0.15rem 0.5rem', borderRadius: '5px',
                        fontFamily: 'DM Mono, monospace', textTransform: 'uppercase',
                        background: s.role === 'Crítico' ? 'rgba(255,100,60,0.15)' : s.role === 'Alta' ? 'rgba(74,200,100,0.12)' : s.role === 'Local' ? 'rgba(100,160,255,0.12)' : 'rgba(255,255,255,0.06)',
                        color: s.role === 'Crítico' ? '#FF643C' : s.role === 'Alta' ? '#4AC864' : s.role === 'Local' ? '#64A0FF' : 'rgba(255,255,255,0.4)',
                      }}>{s.role}</span>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono, monospace' }}>{s.origin}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MERCADO COMPETIDOR */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Mercado competidor</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                {
                  name: 'DJI',
                  type: 'Competidor de precio',
                  desc: 'Líder hegemónico mundial con +70% del mercado civil. Integración vertical agresiva y ecosistema cerrado. Precios imposibles de igualar por costo.',
                  weakness: 'Rigidez de servicio post-venta y hardware "caja negra" sin reparabilidad local.',
                  strategy: 'Sentinel compite por flexibilidad y soporte local, no por precio unitario.',
                },
                {
                  name: 'XAG (Xaircraft)',
                  type: 'Benchmark tecnológico',
                  desc: 'Líder premium en drones agrícolas. ~30-35% del mercado chino. Opera en +50 países, +100M hectáreas cubiertas. Respaldado por Baidu y SoftBank.',
                  weakness: 'Logística de repuestos fuera de China deficiente. Soporte local lento.',
                  strategy: 'Sentinel replica su arquitectura modular con manufactura y soporte nacional.',
                },
                {
                  name: 'JOUAV',
                  type: 'Competidor técnico directo',
                  desc: 'Especialistas en VTOL industriales. Primera empresa de drones industriales en cotizar en bolsa china. Contratos con gobiernos y utilities.',
                  weakness: 'Precio alto (grado industrial), sin presencia ni soporte en Argentina.',
                  strategy: 'Misma arquitectura VTOL pero con manufactura local y precio latinoamericano.',
                },
              ].map(c => (
                <div key={c.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontWeight: 800, fontSize: '1.05rem' }}>{c.name}</p>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(255,120,60,0.8)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.type}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{c.desc}</p>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '0.7rem' }}>
                    <p style={{ fontSize: '0.67rem', color: 'rgba(255,100,60,0.7)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Debilidad</p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{c.weakness}</p>
                  </div>
                  <div style={{ background: 'rgba(74,200,100,0.05)', borderRadius: '8px', padding: '0.7rem' }}>
                    <p style={{ fontSize: '0.67rem', color: '#4AC864', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Estrategia Sentinel</p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{c.strategy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MERCADO CONSUMIDOR */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Mercado consumidor</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(100,160,255,0.8)', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sector público</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>Organismos gubernamentales de manejo del fuego, Defensa Civil, entes de ambiente y recursos naturales. Demanda traccionada por urgencia en gestión de riesgos ambientales e incendios.</p>
              </div>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(74,200,100,0.8)', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sector privado</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>Productores agrícolas y forestales, bodegas y viñedos, aseguradoras, cooperativas ganaderas. Maximizan el retorno usando el mismo activo en múltiples períodos estacionales (cosecha, monitoreo, ganadería).</p>
              </div>
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ventaja competitiva diferencial</p>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  A diferencia de competidores que requieren comprar distintos drones para distintas tareas, <span style={{ color: '#4AC864' }}>Sentinel ofrece flexibilidad digital</span>: el cliente adquiere el "Dron Base" una sola vez y activa los módulos de servicio (fuego, agro, ganadería) directamente desde la nube, maximizando el retorno de la inversión del hardware físico.
                </p>
              </div>
            </div>
          </div>

          {/* DATOS CLAVE DE INGENIERÍA */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Ingeniería de planta</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {[
                { value: '970', label: 'Drones/año', sub: '~81 unidades/mes' },
                { value: '4', label: 'Puestos ensamble', sub: '2 hs por estación' },
                { value: '21', label: 'Empleados', sub: 'Estructura híbrida' },
                { value: '600 m²', label: 'Nave industrial', sub: 'Luján de Cuyo, Mendoza' },
                { value: '39,7 m²', label: 'Jaula de vuelo', sub: 'Zona 5×5 m operativa' },
                { value: 'MTS', label: 'Modelo producción', sub: 'Make to Stock' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <p style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4AC864', letterSpacing: '-0.02em' }}>{s.value}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '0.3rem' }}>{s.label}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.2rem' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCESO PRODUCTIVO */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Proceso productivo · Lean Manufacturing</p>
            <div className="card">
              <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Proceso lineal optimizado para un único SKU. Elimina tiempos muertos por cambios de formato. Flujo continuo y esbelto (Lean), con estaciones de trabajo fijas y especializadas.
              </p>
              <div>
                {[
                  { icon: '📦', step: 'Recepción y control de insumos', desc: 'Inspección y verificación de componentes importados (motores, sensores, aviónica) y materiales nacionales.' },
                  { icon: '🔧', step: 'Ensamble mecánico', desc: 'Integración del fuselaje, sistema de propulsión (4 motores T-Motor), tren de aterrizaje y estructura VTOL.' },
                  { icon: '⚡', step: 'Integración electrónica', desc: 'Montaje de la flight controller Pixhawk, ESCs Hobbywing, sistema de comunicaciones y módulo de energía.' },
                  { icon: '📷', step: 'Integración de payload', desc: 'Instalación y calibración de cámara térmica FLIR, sensores ópticos, radar y módulo de cómputo NVIDIA.' },
                  { icon: '💻', step: 'Programación y configuración Sentinel Cloud', desc: 'Flasheo del firmware, configuración de parámetros de vuelo y vinculación con la plataforma SaaS.' },
                  { icon: '✅', step: 'Banco de pruebas y QC', desc: 'Protocolo estándar de prueba en jaula de vuelo (39,7 m²). Verificación de autonomía y conectividad para todas las verticales de negocio.' },
                  { icon: '📬', step: 'Empaque y despacho', desc: 'Packaging que refleja la dualidad hardware/software. Preparación para distribución regional.' },
                ].map((s, i) => (
                  <div key={s.step} className="timeline-step">
                    <div className="timeline-line" />
                    <div className="timeline-dot">{s.icon}</div>
                    <div style={{ paddingTop: '0.3rem' }}>
                      <p style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.2rem' }}>{s.step}</p>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LOCALIZACIÓN */}
          <div className="fade-up d3" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Localización · Parque Industrial Luján de Cuyo</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '🎓', title: 'Capital humano universitario', desc: 'Acceso a egresados y estudiantes de la UTN y la Universidad Nacional de Cuyo para las áreas de software, electrónica y mantenimiento.' },
                { icon: '🏭', title: 'Capacidad industrial instalada', desc: 'Talleres metalúrgicos y empresas de manufactura aditiva para mecanizados de aluminio y carcasas. Proveedores locales de integración física.' },
                { icon: '💰', title: 'Costos operativos competitivos', desc: 'El Parque Industrial ofrece beneficios fiscales, infraestructura de servicios y costos de operación menores a los de las grandes urbes.' },
                { icon: '🌍', title: 'Acceso a mercados clave', desc: 'Estratégicamente ubicado para atender la agroindustria mendocina (viñedos, olivos) y la Cordillera de los Andes con alta incidencia de incendios forestales.' },
              ].map(f => (
                <div key={f.title} className="card">
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{f.icon}</div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{f.title}</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ASPECTOS LEGALES */}
          <div className="fade-up d4" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Marco legal y organizacional</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Regulación aérea</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>Cumplimiento de normativas <span style={{ color: '#4AC864', fontWeight: 600 }}>ANAC</span> (Administración Nacional de Aviación Civil) para fabricación y operación de VANT. Plataforma de vuelo estandarizada que simplifica la certificación al tener un único modelo base.</p>
              </div>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estructura empresarial</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>Empresa estructurada en dos divisiones sinérgicas: <span style={{ color: '#4AC864', fontWeight: 600 }}>Operaciones Industriales</span> (planta de ensamble del dron base) y <span style={{ color: '#4AC864', fontWeight: 600 }}>Desarrollo Digital</span> (equipo que actualiza y mejora Sentinel Cloud).</p>
              </div>
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Normativas analizadas</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['ANAC – Operación de VANT', 'Ley de Seguridad e Higiene', 'Ley de Trabajo', 'Leyes tributarias', 'Constitución de empresa SA', 'Normativas de construcción de planta', 'Regulaciones nacionales e internacionales de drones'].map(n => (
                    <span key={n} className="pill">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ESTUDIO ECONÓMICO */}
          <div className="fade-up d4" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Estudio económico</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace' }}>PAYBACK ESTIMADO</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#4AC864' }}>2,8 – 3 años</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem' }}>Período de recupero de la inversión</p>
              </div>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace' }}>MODELO DE INGRESOS</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  <span className="pill">Venta de hardware</span>
                  <span className="pill">SaaS / Suscripción</span>
                  <span className="pill">Leasing operativo</span>
                </div>
              </div>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace' }}>INDICADORES ECONÓMICOS</p>
                <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                  Se calcularon <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>VAN</span> (Valor Actual Neto) y <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>TIR</span> (Tasa Interna de Retorno) con escenarios de sensibilidad sobre precio, demanda, costos fijos y variables. Tasa de descuento fijada con metodología WACC.
                </p>
              </div>
              <div className="card">
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace' }}>COMPONENTES DE INVERSIÓN</p>
                <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                  Inversión inicial en equipos de ensamble (soldadura, impresoras 3D, bancos de prueba), obra civil, capital de trabajo inicial y licencias de software de gestión.
                </p>
              </div>
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', fontFamily: 'DM Mono, monospace' }}>ANÁLISIS DE RIESGO · MONTE CARLO</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                  El análisis Monte Carlo confirma que la diversificación de ingresos (hardware + suscripción multisectorial) hace al proyecto económicamente sólido y resiliente. Las variables sensibilizadas incluyen: tasa de suscripción, precio del hardware, costos de importación y tipo de cambio. El modelo de "Hardware Único" reduce costos fijos y variables unitarios, bajando el punto de equilibrio respecto a un modelo multi-producto.
                </p>
              </div>
            </div>
          </div>

          {/* IMPACTO AMBIENTAL */}
          <div className="fade-up d4" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Impacto ambiental · Matriz Leopold</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card" style={{ borderColor: 'rgba(255,80,80,0.12)' }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,100,100,0.7)', marginBottom: '0.4rem', fontFamily: 'DM Mono, monospace' }}>IMPACTOS NEGATIVOS</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(255,120,120,0.8)' }}>−120 pts</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>Leves, mitigables, propios de industria controlada. Gestión de residuos electrónicos y baterías bajo normas de economía circular.</p>
              </div>
              <div className="card" style={{ borderColor: 'rgba(74,200,100,0.2)' }}>
                <p style={{ fontSize: '0.78rem', color: '#4AC864', marginBottom: '0.4rem', fontFamily: 'DM Mono, monospace' }}>IMPACTOS POSITIVOS</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#4AC864' }}>+353 pts</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>Empleo calificado, transferencia tecnológica, polo Agritech regional. La operación del dron preserva ecosistemas y optimiza el uso de recursos agrícolas.</p>
              </div>
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sostenibilidad y responsabilidad social</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  La fabricación del dron tiene una huella controlada y se compensa con su función principal de preservar ecosistemas y optimizar recursos agrícolas. Se planificó la gestión de residuos electrónicos y baterías de litio bajo principios de economía circular. El impacto social incluye generación de empleo técnico especializado en la región de Mendoza y posicionamiento de Argentina como polo de manufactura tecnológica aeroespacial.
                </p>
              </div>
            </div>
          </div>

          {/* LO QUE HICIMOS */}
          <div className="fade-up d4" style={{ marginBottom: '2.5rem' }}>
            <p className="section-title">Herramientas desarrolladas</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a className="scenario-btn" href="/dashboard">
                <div className="scenario-icon">📊</div>
                <div>
                  <p style={{ fontWeight: 700 }}>Stratos Dashboard</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginTop: '0.2rem' }}>Panel de control con métricas financieras, análisis de escenarios y proyecciones del proyecto</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>→</span>
              </a>
              <a className="scenario-btn" href="/montecarlo">
                <div className="scenario-icon">🎲</div>
                <div>
                  <p style={{ fontWeight: 700 }}>Simulación Monte Carlo</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginTop: '0.2rem' }}>10.000 iteraciones para análisis de riesgo del VAN con distribuciones triangulares sobre precio, demanda y costos</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>→</span>
              </a>
            </div>
          </div>

          {/* FOOTER */}
          <div className="fade-up d5 divider" />
          <div className="fade-up d5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
              SENTINEL © 2025 · UTN FRSR · INGENIERÍA INDUSTRIAL
            </p>
            <Link href="/" style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
              letterSpacing: '0.1em', transition: 'color 0.2s',
            }}>
              ← VOLVER AL INICIO
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
