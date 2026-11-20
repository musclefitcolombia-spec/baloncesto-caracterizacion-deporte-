import { useId, useMemo, useState } from 'react'
import ResponsiveTable from './ResponsiveTable'
import { EstadoBadge, NivelBadge } from './GoldBadges'
import { DOMINIOS, NIVELES, fuentesGS, type DominioId, type NivelEvidencia } from '../data/goldStandard.data'

const selectCls = 'mt-1 w-full border border-ink-900/20 bg-white px-3 py-2 text-sm text-ink-950 focus:border-accent-500'

/** Tabla de fuentes filtrable por dominio y nivel de evidencia. */
export default function TablaFuentes() {
  const idDom = useId()
  const idNiv = useId()
  const [dominio, setDominio] = useState<'todos' | DominioId>('todos')
  const [nivel, setNivel] = useState<'todos' | NivelEvidencia>('todos')

  const filas = useMemo(
    () =>
      fuentesGS.filter(
        (f) => (dominio === 'todos' || f.dominio === dominio) && (nivel === 'todos' || f.nivel_de_evidencia === nivel),
      ),
    [dominio, nivel],
  )

  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={idDom} className="block text-xs uppercase tracking-wide text-ink-400">
            Dominio
          </label>
          <select id={idDom} className={selectCls} value={dominio} onChange={(e) => setDominio(e.target.value as 'todos' | DominioId)}>
            <option value="todos">Todos los dominios</option>
            {(Object.keys(DOMINIOS) as DominioId[]).map((d) => (
              <option key={d} value={d}>
                {DOMINIOS[d]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={idNiv} className="block text-xs uppercase tracking-wide text-ink-400">
            Nivel de evidencia
          </label>
          <select id={idNiv} className={selectCls} value={nivel} onChange={(e) => setNivel(e.target.value as 'todos' | NivelEvidencia)}>
            <option value="todos">Todos los niveles</option>
            {(Object.keys(NIVELES) as NivelEvidencia[]).map((n) => (
              <option key={n} value={n}>
                {NIVELES[n].etiqueta}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="mb-3 text-sm text-ink-700" role="status" aria-live="polite">
        Mostrando {filas.length} de {fuentesGS.length} fuentes.
      </p>

      <ResponsiveTable
        headers={['N.º', 'Fuente', 'Población y n', 'Criterio de referencia', 'Hallazgo', 'Nivel y verificación']}
        caption="Fuentes científicas por dominio, con población, tamaño de muestra, criterio de referencia, hallazgo, nivel de evidencia y estado de verificación"
      >
        {filas.length === 0 && (
          <tr>
            <td colSpan={6} className="px-4 py-6 text-center text-sm text-ink-700">
              Ninguna fuente cumple ese filtro.
            </td>
          </tr>
        )}
        {filas.map((f) => (
          <tr key={f.id} className="border-t border-ink-900/10 align-top odd:bg-ink-950/[0.02]">
            <td className="px-4 py-3 font-display text-accent-600">{f.id}</td>
            <td className="min-w-[10rem] px-4 py-3 text-sm">
              <a
                href={f.url}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-ink-950 underline decoration-accent-500/50 underline-offset-2 hover:text-accent-600"
              >
                {f.corta}
              </a>
              <span className="mt-1 block text-xs capitalize text-ink-400">
                {f.tipo} · {DOMINIOS[f.dominio]}
              </span>
            </td>
            <td className="min-w-[12rem] px-4 py-3 text-sm text-ink-700">
              {f.poblacion}
              <span className="mt-1 block text-xs text-ink-400">n = {f.n ?? 'dato no disponible'}</span>
            </td>
            <td className="min-w-[9rem] px-4 py-3 text-sm text-ink-700">{f.criterio_de_referencia}</td>
            <td className="min-w-[16rem] px-4 py-3 text-sm text-ink-700">{f.hallazgo}</td>
            <td className="min-w-[11rem] space-y-1.5 px-4 py-3">
              <NivelBadge nivel={f.nivel_de_evidencia} />
              <div>
                <EstadoBadge fuente={f} />
              </div>
              <p className="text-xs leading-snug text-ink-400">{f.motivo_nivel}</p>
            </td>
          </tr>
        ))}
      </ResponsiveTable>
    </div>
  )
}
