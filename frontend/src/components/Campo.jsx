import { useId, useState } from 'react';

// Campo de formulario accesible: etiqueta, ayuda, error enlazado con aria-describedby
// y botón para mostrar la contraseña cuando type="password".
export default function Campo({ etiqueta, error, ayuda, type = 'text', id, children, ...props }) {
  const idAuto = useId();
  const idCampo = id ?? idAuto;
  const [verPassword, setVerPassword] = useState(false);
  const esPassword = type === 'password';
  const describedBy = [error && `${idCampo}-error`, ayuda && `${idCampo}-ayuda`].filter(Boolean).join(' ') || undefined;

  return (
    <div className="campo">
      <label htmlFor={idCampo}>{etiqueta}</label>
      <div className={esPassword ? 'campo__password' : undefined}>
        <input
          id={idCampo}
          type={esPassword && verPassword ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...props}
        />
        {esPassword && (
          <button
            type="button"
            className="campo__ver"
            onClick={() => setVerPassword((v) => !v)}
            aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={verPassword}
          >
            {verPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      {children}
      {ayuda && !error && (
        <span id={`${idCampo}-ayuda`} className="campo__ayuda">
          {ayuda}
        </span>
      )}
      {error && (
        <span id={`${idCampo}-error`} className="campo__error">
          {error}
        </span>
      )}
    </div>
  );
}
