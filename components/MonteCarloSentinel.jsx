import { useState, useEffect, useRef, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, ReferenceLine } from "recharts";

// ─── MONTE CARLO ENGINE ───────────────────────────────────────────────────────
function triangular(min, mode, max) {
  const u = Math.random();
  const fc = (mode - min) / (max - min);
  if (u < fc) return min + Math.sqrt(u * (max - min) * (mode - min));
  return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
}

function calcVAN(precio, demanda, cf, cv, inversion, tasa, periodos) {
  const margen = precio - cv;
  const utilidadAnual = margen * demanda - cf;
  let van = -inversion;
  for (let t = 1; t <= periodos; t++) {
    van += utilidadAnual / Math.pow(1 + tasa, t);
  }
  return van;
}

function runSimulation(params, N = 10000) {
  const { invBase, cfMin, cfMode, cfMax, cvMin, cvMode, cvMax,
          precMin, precMode, precMax, demMin, demMode, demMax,
          tasa, periodos } = params;

  const results = [];
  const vanVsPrecio = [];
  const vanVsDemanda = [];

  for (let i = 0; i < N; i++) {
    const precio = triangular(precMin, precMode, precMax);
    const demanda = triangular(demMin, demMode, demMax);
    const cf = triangular(cfMin, cfMode, cfMax);
    const cv = triangular(cvMin, cvMode, cvMax);
    const van = calcVAN(precio, demanda, cf, cv, invBase, tasa, periodos);
    results.push({ van, precio, demanda, cf, cv });
    if (i < 500) {
      vanVsPrecio.push({ x: precio, y: van / 1e6 });
      vanVsDemanda.push({ x: demanda, y: van / 1e6 });
    }
  }

  const vans = results.map(r => r.van);
  vans.sort((a, b) => a - b);

  const n = vans.length;
  const mean = vans.reduce((s, v) => s + v, 0) / n;
  const variance = vans.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance);
  const min = vans[0];
  const max = vans[n - 1];
  const median = n % 2 === 0 ? (vans[n / 2 - 1] + vans[n / 2]) / 2 : vans[Math.floor(n / 2)];
  const probPos = vans.filter(v => v > 0).length / n;
  const cv_coef = std / Math.abs(mean);

  // Skewness
  const skew = vans.reduce((s, v) => s + ((v - mean) / std) ** 3, 0) / n;

  // Histogram buckets
  const bins = 40;
  const step = (max - min) / bins;
  const hist = Array.from({ length: bins }, (_, i) => ({
    x: (min + i * step) / 1e6,
    xEnd: (min + (i + 1) * step) / 1e6,
    count: 0,
    pos: min + (i + 0.5) * step > 0,
  }));
  vans.forEach(v => {
    const idx = Math.min(Math.floor((v - min) / step), bins - 1);
    hist[idx].count++;
  });

  // Sensitivity: correlations
  const corrPrecio = pearson(results.map(r => r.precio), results.map(r => r.van));
  const corrDemanda = pearson(results.map(r => r.demanda), results.map(r => r.van));
  const corrCF = pearson(results.map(r => r.cf), results.map(r => r.van));
  const corrCV = pearson(results.map(r => r.cv), results.map(r => r.van));

  // Elasticity (approx)
  const elastPrecio = (corrPrecio * std) / (mean !== 0 ? Math.abs(mean) : 1);
  const elastDemanda = (corrDemanda * std) / (mean !== 0 ? Math.abs(mean) : 1);

  return {
    stats: { mean, median, std, min, max, probPos, cv: cv_coef, skew },
    hist,
    sensitivity: [
      { var: "Precio", corr: corrPrecio },
      { var: "Demanda", corr: corrDemanda },
      { var: "Costo Fijo", corr: corrCF },
      { var: "Costo Variable", corr: corrCV },
    ].sort((a, b) => Math.abs(b.corr) - Math.abs(a.corr)),
    vanVsPrecio,
    vanVsDemanda,
    elastPrecio,
    elastDemanda,
  };
}

function pearson(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  const num = xs.reduce((s, v, i) => s + (v - mx) * (ys[i] - my), 0);
  const dx = Math.sqrt(xs.reduce((s, v) => s + (v - mx) ** 2, 0));
  const dy = Math.sqrt(ys.reduce((s, v) => s + (v - my) ** 2, 0));
  return num / (dx * dy);
}

function runScenario(fixed, varied, params, N = 5000) {
  const { invBase, tasa, periodos } = params;
  const vans = [];
  for (let i = 0; i < N; i++) {
    const precio = varied === "precio"
      ? triangular(params.precMin, params.precMode, params.precMax)
      : params.precMode;
    const demanda = varied === "demanda"
      ? triangular(params.demMin, params.demMode, params.demMax)
      : params.demMode;
    const cf = fixed ? params.cfMode : triangular(params.cfMin, params.cfMode, params.cfMax);
    const cv = fixed ? params.cvMode : triangular(params.cvMin, params.cvMode, params.cvMax);
    vans.push(calcVAN(precio, demanda, cf, cv, invBase, tasa, periodos));
  }
  vans.sort((a, b) => a - b);
  const mn = vans[0], mx = vans[vans.length - 1];
  const bins = 30;
  const step = (mx - mn) / bins;
  return Array.from({ length: bins }, (_, i) => ({
    x: ((mn + i * step + mn + (i + 1) * step) / 2 / 1e6).toFixed(2),
    count: 0,
    pos: mn + (i + 0.5) * step > 0,
  })).map((b, i) => {
    vans.forEach(v => {
      if (v >= mn + i * step && v < mn + (i + 1) * step) b.count++;
    });
    return b;
  });
}

// ─── FORMATTING ───────────────────────────────────────────────────────────────
const fmt = (v, dec = 2) =>
  new Intl.NumberFormat("es-AR", { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
const fmtM = v => `$${fmt(v / 1e6, 2)}M`;
const fmtPct = v => `${(v * 100).toFixed(1)}%`;

// ─── PARAMS ──────────────────────────────────────────────────────────────────
const DEFAULT_PARAMS = {
  invBase: 500000,
  cfMin: 800000, cfMode: 850408, cfMax: 950000,
  cvMin: 13500, cvMode: 14572.03, cvMax: 17000,
  precMin: 17700, precMode: 30000, precMax: 35000,
  demMin: 272, demMode: 970, demMax: 1475,
  tasa: 0.18,
  periodos: 5,
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: accent ? "rgba(255,180,0,0.08)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${accent ? "rgba(255,180,0,0.3)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 10,
      padding: "14px 18px",
      minWidth: 120,
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ color: accent ? "#FFB400" : "#F0F0F0", fontSize: 20, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{value}</div>
      {sub && <div style={{ color: "#555", fontSize: 10, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, marginTop: 36 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ color: "#E0E0E0", fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(255,180,0,0.4),transparent)" }} />
    </div>
  );
}

const VAN_COLORS = { pos: "#00D4A0", neg: "#FF4757" };

function VanHistogram({ data, title }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 16px" }}>
      <div style={{ color: "#AAA", fontSize: 11, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>{title}</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }} barGap={0} barCategoryGap={0}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="x" tick={{ fill: "#555", fontSize: 9 }} tickFormatter={v => `${Number(v).toFixed(1)}M`} interval="preserveStartEnd" />
          <YAxis tick={{ fill: "#555", fontSize: 9 }} width={32} />
          <Tooltip
            contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 6, fontSize: 11 }}
            formatter={(v) => [v, "Iteraciones"]}
            labelFormatter={(l) => `VAN ≈ $${Number(l).toFixed(2)}M USD`}
          />
          <ReferenceLine x={0} stroke="#FFB400" strokeWidth={2} strokeDasharray="4 4" label={{ value: "VAN=0", fill: "#FFB400", fontSize: 9 }} />
          <Bar dataKey="count" radius={[2, 2, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.pos ? VAN_COLORS.pos : VAN_COLORS.neg} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TornadoChart({ data }) {
  const max = Math.max(...data.map(d => Math.abs(d.corr)));
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 24px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: "#CCC", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{d.var}</span>
            <span style={{ color: d.corr > 0 ? "#00D4A0" : "#FF4757", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>
              {d.corr > 0 ? "+" : ""}{d.corr.toFixed(4)}
            </span>
          </div>
          <div style={{ height: 22, background: "rgba(255,255,255,0.04)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute",
              left: d.corr > 0 ? "50%" : `${50 - (Math.abs(d.corr) / max) * 50}%`,
              width: `${(Math.abs(d.corr) / max) * 50}%`,
              height: "100%",
              background: d.corr > 0
                ? "linear-gradient(90deg,rgba(0,212,160,0.6),rgba(0,212,160,0.9))"
                : "linear-gradient(90deg,rgba(255,71,87,0.9),rgba(255,71,87,0.6))",
              borderRadius: 3,
            }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#444" }} />
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ color: "#555", fontSize: 9 }}>Correlación negativa ←</span>
        <span style={{ color: "#555", fontSize: 9 }}>→ Correlación positiva</span>
      </div>
    </div>
  );
}

function ScatterPlot({ data, xlabel, color, title }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 16px" }}>
      <div style={{ color: "#AAA", fontSize: 11, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>{title}</div>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="x" type="number" name={xlabel} tick={{ fill: "#555", fontSize: 9 }}
            tickFormatter={v => xlabel === "Precio" ? `$${(v / 1000).toFixed(0)}k` : v.toFixed(0)} />
          <YAxis dataKey="y" type="number" name="VAN (M)" tick={{ fill: "#555", fontSize: 9 }} tickFormatter={v => `${v.toFixed(1)}M`} width={36} />
          <ReferenceLine y={0} stroke="#FFB400" strokeWidth={1.5} strokeDasharray="4 4" />
          <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 6, fontSize: 10 }}
            formatter={(v, n) => [n === "VAN (M)" ? `$${v.toFixed(2)}M` : v.toFixed(0), n]} />
          <Scatter data={data} fill={color} fillOpacity={0.4} r={2} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [result, setResult] = useState(null);
  const [scenDemanda, setScenDemanda] = useState(null);
  const [scenPrecio, setScenPrecio] = useState(null);
  const [scenConjunto, setScenConjunto] = useState(null);
  const [running, setRunning] = useState(false);
  const [N, setN] = useState(10000);
  const [progress, setProgress] = useState(0);

  const run = useCallback(() => {
    setRunning(true);
    setProgress(0);
    setTimeout(() => {
      const r = runSimulation(params, N);
      const sd = runScenario(true, "demanda", params, 5000);
      const sp = runScenario(true, "precio", params, 5000);
      const sc = runScenario(false, "ambos", params, 5000);
      setResult(r);
      setScenDemanda(sd);
      setScenPrecio(sp);
      setScenConjunto(sc);
      setRunning(false);
      setProgress(100);
    }, 80);
  }, [params, N]);

  useEffect(() => { run(); }, []);

  const setP = (k, v) => setParams(p => ({ ...p, [k]: parseFloat(v) || 0 }));

  const stats = result?.stats;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0C",
      color: "#E0E0E0",
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      padding: "0 0 60px",
    }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg,#0F0F14 0%,#13131A 60%,#0F1018 100%)",
        borderBottom: "1px solid rgba(255,180,0,0.15)",
        padding: "28px 32px 24px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div style={{ width: 6, height: 24, background: "#FFB400", borderRadius: 3 }} />
                <span style={{ color: "#FFB400", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
                  Simulación Monte Carlo · Análisis de Riesgo
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#F5F5F5", letterSpacing: -0.5 }}>
                Evaluación de Proyectos · Escenario 2 — Alquiler
              </h1>
              <p style={{ margin: "4px 0 0", color: "#555", fontSize: 12 }}>
                WACC 18% · 5 períodos · {N.toLocaleString()} iteraciones · Distribución Triangular
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <select
                value={N}
                onChange={e => setN(parseInt(e.target.value))}
                style={{ background: "#1A1A20", border: "1px solid #333", color: "#CCC", borderRadius: 6, padding: "6px 10px", fontSize: 12, fontFamily: "'DM Mono', monospace" }}
              >
                <option value={5000}>5,000 iter.</option>
                <option value={10000}>10,000 iter.</option>
                <option value={20000}>20,000 iter.</option>
              </select>
              <button
                onClick={run}
                disabled={running}
                style={{
                  background: running ? "#222" : "linear-gradient(135deg,#FFB400,#FF8C00)",
                  color: running ? "#555" : "#000",
                  border: "none", borderRadius: 8, padding: "8px 20px",
                  fontWeight: 700, fontSize: 13, cursor: running ? "not-allowed" : "pointer",
                  fontFamily: "'DM Mono', monospace", letterSpacing: 1,
                  transition: "all 0.2s",
                }}
              >
                {running ? "⏳ Simulando..." : "▶ Ejecutar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* PARAMS */}
        <SectionTitle icon="⚙️">Parámetros del Modelo</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
          {[
            { label: "Inversión Inicial (USD)", key: "invBase", step: 10000 },
            { label: "Costo Fijo Mínimo (USD)", key: "cfMin", step: 10000 },
            { label: "Costo Fijo Probable (USD)", key: "cfMode", step: 10000 },
            { label: "Costo Fijo Máximo (USD)", key: "cfMax", step: 10000 },
            { label: "Costo Variable Mínimo (USD/u)", key: "cvMin", step: 100 },
            { label: "Costo Variable Probable (USD/u)", key: "cvMode", step: 100 },
            { label: "Costo Variable Máximo (USD/u)", key: "cvMax", step: 100 },
            { label: "Precio Mínimo (USD/u)", key: "precMin", step: 500 },
            { label: "Precio Probable (USD/u)", key: "precMode", step: 500 },
            { label: "Precio Máximo (USD/u)", key: "precMax", step: 500 },
            { label: "Demanda Mínima (u/año)", key: "demMin", step: 10 },
            { label: "Demanda Probable (u/año)", key: "demMode", step: 10 },
            { label: "Demanda Máxima (u/año)", key: "demMax", step: 10 },
            { label: "Tasa de Descuento (WACC)", key: "tasa", step: 0.01 },
            { label: "Períodos (años)", key: "periodos", step: 1 },
          ].map(({ label, key, step }) => (
            <div key={key} style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8, padding: "10px 14px",
            }}>
              <div style={{ color: "#666", fontSize: 9, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase" }}>{label}</div>
              <input
                type="number"
                value={params[key]}
                step={step}
                onChange={e => setP(key, e.target.value)}
                style={{
                  background: "transparent", border: "none", color: "#FFB400",
                  fontSize: 15, fontFamily: "'DM Mono', monospace", fontWeight: 700,
                  width: "100%", outline: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* VAN BASE */}
        {result && (() => {
          const vanBase = calcVAN(params.precMode, params.demMode, params.cfMode, params.cvMode, params.invBase, params.tasa, params.periodos);
          return (
            <div style={{
              marginTop: 24,
              background: "rgba(255,180,0,0.06)",
              border: "1px solid rgba(255,180,0,0.2)",
              borderRadius: 12, padding: "16px 24px",
              display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
            }}>
              <div>
                <div style={{ color: "#888", fontSize: 10, letterSpacing: 2 }}>VAN ESCENARIO BASE</div>
                <div style={{ color: "#FFB400", fontSize: 28, fontWeight: 800, fontFamily: "'DM Mono', monospace" }}>
                  {fmtM(vanBase)}
                </div>
              </div>
              <div style={{ color: "#444", fontSize: 20 }}>|</div>
              <div>
                <div style={{ color: "#888", fontSize: 10, letterSpacing: 2 }}>UTILIDAD ANUAL BASE</div>
                <div style={{ color: "#00D4A0", fontSize: 18, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                  {fmtM((params.precMode - params.cvMode) * params.demMode - params.cfMode)}
                </div>
              </div>
              <div style={{ color: "#444", fontSize: 20 }}>|</div>
              <div>
                <div style={{ color: "#888", fontSize: 10, letterSpacing: 2 }}>MARGEN BRUTO UNIT.</div>
                <div style={{ color: "#7B9FFF", fontSize: 18, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                  ${fmt(params.precMode - params.cvMode)}
                </div>
              </div>
              <div style={{ color: "#444", fontSize: 20 }}>|</div>
              <div>
                <div style={{ color: "#888", fontSize: 10, letterSpacing: 2 }}>PUNTO DE EQUILIBRIO</div>
                <div style={{ color: "#FF9F43", fontSize: 18, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                  {(params.cfMode / (params.precMode - params.cvMode)).toFixed(1)} u/año
                </div>
              </div>
            </div>
          );
        })()}

        {/* STATS */}
        {stats && (
          <>
            <SectionTitle icon="📊">Estadísticas de la Simulación ({N.toLocaleString()} iteraciones)</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <StatCard label="VAN Medio" value={fmtM(stats.mean)} accent />
              <StatCard label="VAN Mediana" value={fmtM(stats.median)} />
              <StatCard label="Desv. Estándar" value={fmtM(stats.std)} />
              <StatCard label="VAN Mínimo" value={fmtM(stats.min)} />
              <StatCard label="VAN Máximo" value={fmtM(stats.max)} />
              <StatCard label="Prob. VAN > 0" value={fmtPct(stats.probPos)} accent />
              <StatCard label="Coef. Variación" value={fmt(stats.cv, 3)} />
              <StatCard label="Asimetría (Skew)" value={fmt(stats.skew, 3)} />
            </div>

            {/* PROBABILITY GAUGE */}
            <div style={{
              marginTop: 16,
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${stats.probPos > 0.7 ? "rgba(0,212,160,0.3)" : stats.probPos > 0.5 ? "rgba(255,180,0,0.3)" : "rgba(255,71,87,0.3)"}`,
              borderRadius: 12, padding: "18px 24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
                <span style={{ fontSize: 11, letterSpacing: 2, color: "#888", textTransform: "uppercase" }}>
                  Probabilidad de Viabilidad (VAN &gt; 0)
                </span>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontWeight: 800, fontSize: 22,
                  color: stats.probPos > 0.7 ? "#00D4A0" : stats.probPos > 0.5 ? "#FFB400" : "#FF4757",
                }}>
                  {fmtPct(stats.probPos)}
                </span>
              </div>
              <div style={{ height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${stats.probPos * 100}%`,
                  background: stats.probPos > 0.7
                    ? "linear-gradient(90deg,#00D4A0,#00FFC8)"
                    : stats.probPos > 0.5
                      ? "linear-gradient(90deg,#FF8C00,#FFB400)"
                      : "linear-gradient(90deg,#FF4757,#FF6B81)",
                  borderRadius: 6,
                  transition: "width 0.8s ease",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ color: "#444", fontSize: 9 }}>0%</span>
                <span style={{ color: "#FFB400", fontSize: 9 }}>50%</span>
                <span style={{ color: "#444", fontSize: 9 }}>100%</span>
              </div>
            </div>
          </>
        )}

        {/* HISTOGRAM MAIN */}
        {result && (
          <>
            <SectionTitle icon="📈">Distribución del VAN — Histograma Completo</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px 20px" }}>
              <div style={{ color: "#888", fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: VAN_COLORS.pos }}>■</span> VAN positivo &nbsp;
                <span style={{ color: VAN_COLORS.neg }}>■</span> VAN negativo &nbsp;
                <span style={{ color: "#FFB400" }}>- -</span> VAN = 0
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.hist} margin={{ left: 10, right: 10, top: 10, bottom: 20 }} barGap={0} barCategoryGap={1}>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="x" tick={{ fill: "#555", fontSize: 10 }}
                    tickFormatter={v => `$${Number(v).toFixed(1)}M`}
                    label={{ value: "VAN (millones USD)", position: "insideBottom", offset: -12, fill: "#555", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#555", fontSize: 10 }} width={40}
                    label={{ value: "Frecuencia", angle: -90, position: "insideLeft", fill: "#555", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#0F0F14", border: "1px solid #333", borderRadius: 8, fontSize: 11 }}
                    formatter={(v) => [`${v} iteraciones`, "Frecuencia"]}
                    labelFormatter={l => `VAN ≈ $${Number(l).toFixed(2)}M USD`}
                  />
                  <ReferenceLine x={(0).toString()} stroke="#FFB400" strokeWidth={2} strokeDasharray="5 5" />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    {result.hist.map((e, i) => (
                      <Cell key={i} fill={e.pos ? VAN_COLORS.pos : VAN_COLORS.neg} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* TORNADO */}
        {result && (
          <>
            <SectionTitle icon="🌪️">Análisis de Sensibilidad — Gráfico Tornado</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <TornadoChart data={result.sensitivity} />
                <div style={{ marginTop: 12, color: "#555", fontSize: 11, lineHeight: 1.6, padding: "0 4px" }}>
                  Las barras representan la correlación de Pearson entre cada variable y el VAN simulado.
                  Un valor más cercano a ±1 indica mayor influencia sobre la rentabilidad del proyecto.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {result.sensitivity.map((d, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10, padding: "14px 18px",
                    borderLeft: `3px solid ${i === 0 ? "#FFB400" : "#333"}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: i === 0 ? "#FFB400" : "#AAA", fontWeight: i === 0 ? 700 : 400, fontSize: 13 }}>
                        {i === 0 ? "🏆 " : ""}{d.var}
                      </span>
                      <span style={{ color: d.corr > 0 ? "#00D4A0" : "#FF4757", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
                        r = {d.corr.toFixed(4)}
                      </span>
                    </div>
                    <div style={{ color: "#555", fontSize: 10, marginTop: 4 }}>
                      {d.corr > 0 ? "↑ Incremento positivo en el VAN" : "↑ Incremento negativo en el VAN"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SCENARIO HISTOGRAMS */}
        {scenDemanda && scenPrecio && scenConjunto && (
          <>
            <SectionTitle icon="🔬">Análisis por Escenario</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              <VanHistogram data={scenDemanda} title="Solo variación en Demanda" />
              <VanHistogram data={scenPrecio} title="Solo variación en Precio" />
              <VanHistogram data={scenConjunto} title="Variación Conjunta (todas)" />
            </div>
          </>
        )}

        {/* SCATTER */}
        {result && (
          <>
            <SectionTitle icon="🔵">Dispersión — VAN vs Variables Clave</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <ScatterPlot data={result.vanVsPrecio} xlabel="Precio" color="#7B9FFF" title="VAN vs Precio de Venta" />
              <ScatterPlot data={result.vanVsDemanda} xlabel="Demanda" color="#FF9F43" title="VAN vs Demanda" />
            </div>
          </>
        )}

        {/* CONCLUSION */}
        {stats && (
          <>
            <SectionTitle icon="📝">Conclusión — Análisis de Prefactibilidad (Formato Tesis)</SectionTitle>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "28px 32px",
              lineHeight: 1.8, fontSize: 13, color: "#C0C0C0",
            }}>
              {(() => {
                const vanBase = calcVAN(params.precMode, params.demMode, params.cfMode, params.cvMode, params.invBase, params.tasa, params.periodos);
                const varCrit = result.sensitivity[0];
                const riskLevel = stats.probPos > 0.8 ? "bajo" : stats.probPos > 0.6 ? "moderado" : "elevado";
                const viable = stats.probPos > 0.5;
                const payback = params.invBase / ((params.precMode - params.cvMode) * params.demMode - params.cfMode);
                return (
                  <>
                    <p>
                      <strong style={{ color: "#F0F0F0" }}>Análisis de Riesgo — Escenario 2 (Modalidad Alquiler).</strong>{" "}
                      La presente simulación Monte Carlo, ejecutada con {N.toLocaleString()} iteraciones bajo distribuciones triangulares
                      para las variables estocásticas, arroja un <strong style={{ color: "#FFB400" }}>VAN esperado de {fmtM(stats.mean)} USD</strong> con
                      una desviación estándar de {fmtM(stats.std)} USD, lo que implica un coeficiente de variación
                      de <strong style={{ color: "#FFB400" }}>{fmt(stats.cv, 3)}</strong>. El VAN determinístico (escenario base) se ubica
                      en <strong style={{ color: "#FFB400" }}>{fmtM(vanBase)} USD</strong>.
                    </p>
                    <p>
                      <strong style={{ color: "#F0F0F0" }}>Probabilidad de viabilidad.</strong>{" "}
                      La probabilidad de obtener un VAN positivo asciende a{" "}
                      <strong style={{ color: stats.probPos > 0.7 ? "#00D4A0" : "#FFB400" }}>{fmtPct(stats.probPos)}</strong>,{" "}
                      lo que indica que el proyecto resulta {viable ? "financieramente viable" : "financieramente incierto"} en
                      la mayoría de los escenarios simulados a la tasa de descuento del{" "}
                      <strong>{fmtPct(params.tasa)}</strong> (WACC). El período de recupero estimado en
                      el escenario base es de aproximadamente <strong style={{ color: "#7B9FFF" }}>{payback.toFixed(2)} años</strong>.
                    </p>
                    <p>
                      <strong style={{ color: "#F0F0F0" }}>Variable crítica.</strong>{" "}
                      El análisis de sensibilidad mediante correlaciones de Pearson identifica al{" "}
                      <strong style={{ color: "#FFB400" }}>{varCrit.var}</strong> como la variable de mayor
                      impacto sobre el VAN (r = {varCrit.corr.toFixed(4)}), lo que implica que
                      las estrategias de gestión de riesgo deben orientarse prioritariamente al control
                      y seguimiento de esta variable. La elasticidad del VAN respecto al precio
                      asciende a {result.elastPrecio.toFixed(3)}, mientras que respecto a la demanda
                      es de {result.elastDemanda.toFixed(3)}.
                    </p>
                    <p>
                      <strong style={{ color: "#F0F0F0" }}>Nivel de riesgo y conclusión.</strong>{" "}
                      La distribución de resultados presenta una asimetría (skewness) de{" "}
                      {fmt(stats.skew, 3)}, indicando una distribución{" "}
                      {stats.skew > 0 ? "con sesgo positivo (cola derecha extendida)" : "con sesgo negativo (cola izquierda extendida)"}.{" "}
                      El rango de resultados abarca desde {fmtM(stats.min)} hasta {fmtM(stats.max)} USD,
                      reflejando una incertidumbre de nivel <strong style={{ color: riskLevel === "bajo" ? "#00D4A0" : riskLevel === "moderado" ? "#FFB400" : "#FF4757" }}>{riskLevel}</strong>.{" "}
                      En conclusión, el Escenario 2 (Alquiler) se muestra{" "}
                      <strong style={{ color: viable ? "#00D4A0" : "#FF4757" }}>
                        {viable ? "prefactible desde la perspectiva financiera" : "con riesgo superior al aceptable"}
                      </strong>,{" "}
                      sujeto a que la gestión comercial garantice niveles de demanda y precio
                      próximos a los valores más probables de sus distribuciones estimadas.
                    </p>
                  </>
                );
              })()}
            </div>
          </>
        )}

        {/* FOOTER */}
        <div style={{
          marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 20, color: "#333", fontSize: 10, textAlign: "center", letterSpacing: 1,
        }}>
          Simulación Monte Carlo · Análisis de Riesgo · Evaluación de Proyectos · Ingeniería Industrial
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
        ::-webkit-scrollbar { width: 6px; background: #0A0A0C; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
      `}</style>
    </div>
  );
}
