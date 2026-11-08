// Muestra un texto convirtiendo los fragmentos entre `comillas invertidas` en <code>.
export default function TextoCodigo({ texto }) {
  const partes = texto.split(/(`[^`]+`)/g);
  return partes.map((parte, i) =>
    parte.startsWith('`') && parte.endsWith('`') && parte.length > 1 ? (
      <code key={i}>{parte.slice(1, -1)}</code>
    ) : (
      parte
    ),
  );
}
