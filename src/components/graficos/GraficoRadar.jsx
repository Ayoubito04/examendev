// Gráfico de radar en SVG. ejes: [{ id, etiqueta, valor (0-100 o null) }]
// Los ejes sin datos se dibujan en 0 con un punto hueco.
const TAM = 420;
const CENTRO = TAM / 2;
const RADIO = 130;
const ANILLOS = [25, 50, 75, 100];

const punto = (i, n, valor) => {
  const angulo = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const r = (RADIO * valor) / 100;
  return [CENTRO + r * Math.cos(angulo), CENTRO + r * Math.sin(angulo), angulo];
};

export default function GraficoRadar({ ejes, titulo }) {
  const n = ejes.length;
  if (n < 3) return null;
  const poligono = ejes.map((e, i) => punto(i, n, e.valor ?? 0).slice(0, 2).join(',')).join(' ');
  const resumen = ejes.map((e) => `${e.etiqueta}: ${e.valor === null ? 'sin datos' : `${e.valor} %`}`).join(', ');

  return (
    <svg className="radar" viewBox={`0 0 ${TAM} ${TAM}`} role="img" aria-label={`${titulo}. ${resumen}`}>
      {ANILLOS.map((a) => (
        <polygon
          key={a}
          className="radar__anillo"
          points={ejes.map((_, i) => punto(i, n, a).slice(0, 2).join(',')).join(' ')}
        />
      ))}
      {ejes.map((e, i) => {
        const [x, y] = punto(i, n, 100);
        return <line key={e.id} className="radar__eje" x1={CENTRO} y1={CENTRO} x2={x} y2={y} />;
      })}
      {ANILLOS.slice(0, -1).map((a) => (
        <text key={a} className="radar__escala" x={CENTRO + 4} y={CENTRO - (RADIO * a) / 100 + 3}>
          {a}
        </text>
      ))}
      <polygon className="radar__area" points={poligono} />
      {ejes.map((e, i) => {
        const [x, y] = punto(i, n, e.valor ?? 0);
        return <circle key={e.id} className={`radar__punto ${e.valor === null ? 'radar__punto--vacio' : ''}`} cx={x} cy={y} r={4.5} />;
      })}
      {ejes.map((e, i) => {
        const [x, y, angulo] = punto(i, n, 100);
        const cos = Math.cos(angulo);
        const ancla = Math.abs(cos) < 0.2 ? 'middle' : cos > 0 ? 'start' : 'end';
        const lx = x + Math.cos(angulo) * 14;
        const ly = y + Math.sin(angulo) * 14 + (Math.sin(angulo) > 0.5 ? 8 : Math.sin(angulo) < -0.5 ? -2 : 4);
        return (
          <text key={e.id} className="radar__etiqueta" x={lx} y={ly} textAnchor={ancla}>
            {e.etiqueta}
            <tspan className="radar__valor" x={lx} dy="14">
              {e.valor === null ? '—' : `${e.valor} %`}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}
