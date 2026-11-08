import { getAvatar } from '../utils/avatares.js';

export default function Avatar({ id, tamano = 40, etiqueta }) {
  const a = getAvatar(id);
  return (
    <span
      className="avatar"
      style={{ '--avatar-color': a.color, width: tamano, height: tamano, fontSize: tamano * 0.55 }}
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
    >
      {a.emoji}
    </span>
  );
}
