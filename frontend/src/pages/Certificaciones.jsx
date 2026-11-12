import CertificacionCard from '../components/CertificacionCard.jsx';
import { EstadoError, EstadoVacio, Esqueleto } from '../components/estados/Estados.jsx';
import { usePeticion } from '../hooks/usePeticion.js';
import { certificacionesApi } from '../api/certificaciones.js';
import { USAR_MOCK } from '../api/config.js';

export default function Certificaciones() {
  const { cargando, datos, error, reintentar } = usePeticion(() => certificacionesApi.listar(), []);
  const lista = datos ?? [];
  const disponibles = lista.filter((c) => c.disponible).length;

  return (
    <section className="certificaciones contenedor">
      <span className="pildora">Certificaciones</span>
      <h1 className="titulo-display titulo-display--md">
        Prepara tu <span className="destacado">certificación</span>
      </h1>
      <p className="lead">
        Exámenes oficiales de nivel Fundamentals que complementan tu ciclo. Practica con preguntas tipo test y corrección al instante.
      </p>

      {USAR_MOCK && <p className="aviso-demo">Datos de demostración: se muestran las certificaciones del seed hasta conectar el backend.</p>}

      <div aria-live="polite" aria-busy={cargando}>
        {cargando ? (
          <Esqueleto filas={4} alto={220} etiqueta="Cargando certificaciones" />
        ) : error ? (
          <EstadoError error={error} onReintentar={reintentar} titulo="No se han podido cargar las certificaciones" />
        ) : lista.length === 0 ? (
          <EstadoVacio
            icono="🎓"
            titulo="Todavía no hay certificaciones"
            texto="Estamos preparando los bancos de preguntas. Vuelve pronto o practica mientras tanto con los módulos de tu ciclo."
          />
        ) : (
          <>
            <p className="certificaciones__resumen texto-suave">
              {lista.length} certificaciones · {disponibles === 0
                ? 'bancos de preguntas en preparación'
                : `${disponibles} ${disponibles === 1 ? 'disponible' : 'disponibles'} para practicar`}
            </p>
            <div className="rejilla-modulos rejilla-modulos--2">
              {lista.map((c) => (
                <CertificacionCard key={c.id} cert={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
