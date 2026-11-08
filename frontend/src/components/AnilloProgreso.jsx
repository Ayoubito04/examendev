// Anillo circular con el resultado del test (por ejemplo, 21/30).
export default function AnilloProgreso({ valor, total, tamano = 168, grosor = 10 }) {
  const radio = (tamano - grosor) / 2;
  const circunferencia = 2 * Math.PI * radio;
  const proporcion = total ? valor / total : 0;

  return (
    <div className="anillo" style={{ width: tamano, height: tamano }}>
      <svg viewBox={`0 0 ${tamano} ${tamano}`} role="img" aria-label={`${valor} de ${total} aciertos`}>
        <circle cx={tamano / 2} cy={tamano / 2} r={radio} className="anillo__pista" strokeWidth={grosor} />
        <circle
          cx={tamano / 2}
          cy={tamano / 2}
          r={radio}
          className="anillo__valor"
          strokeWidth={grosor}
          strokeDasharray={circunferencia}
          strokeDashoffset={circunferencia * (1 - proporcion)}
          transform={`rotate(-90 ${tamano / 2} ${tamano / 2})`}
        />
      </svg>
      <span className="anillo__texto">
        {valor}/{total}
      </span>
    </div>
  );
}
