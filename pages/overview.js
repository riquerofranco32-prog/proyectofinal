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
                { icon: '🚁', title: 'VANT Sentinel Base', desc: 'Dron VTOL híbrido. Despega vertical, vuela horizontal. Un solo hardware para múltiples verticales de negocio.' },
                { icon: '☁️', title: 'Sentinel Cloud', desc: 'Plataforma SaaS en la nube con módulos: FireWatch, AgroVision y LivestockEye. La inteligencia está en el software.' },
                { icon: '📡', title: 'Nodos IoT', desc: 'Sensores terrestres fijos que complementan la cobertura aérea y amplían el monitoreo en tiempo real.' },
              ].map(item => (
                <div key={item.title} className="card">
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</p>
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
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', fontFamily: 'DM Mono, monospace' }}>ANÁLISIS DE RIESGO</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                  El análisis Monte Carlo confirma que la diversificación de ingresos (hardware + suscripción multisectorial) hace al proyecto económicamente sólido y resiliente. VAN y TIR calculados con escenarios de sensibilidad sobre precio, demanda, costos fijos y variables.
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
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>Leves, mitigables, propios de industria controlada</p>
              </div>
              <div className="card" style={{ borderColor: 'rgba(74,200,100,0.2)' }}>
                <p style={{ fontSize: '0.78rem', color: '#4AC864', marginBottom: '0.4rem', fontFamily: 'DM Mono, monospace' }}>IMPACTOS POSITIVOS</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#4AC864' }}>+353 pts</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>Empleo calificado, transferencia tecnológica, polo Agritech</p>
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
