import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { MensajeError } from '@/shared/components/MensajeError'
import { Paginador } from '@/shared/components/Paginador'
import { MAX_PAGINAS } from '@/shared/models/pagina'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { useEstrenos } from '../hooks/usePeliculas'
import type { PeliculaResumen } from '../models/pelicula'
import type { RegionEstrenos } from '../services/peliculas.service'

interface Props {
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

const PAISES: { region: RegionEstrenos; nombre: string }[] = [
  { region: 'VE', nombre: 'Venezuela' },
  { region: 'MX', nombre: 'México' },
  { region: 'ES', nombre: 'España' },
  { region: 'US', nombre: 'Estados Unidos' },
]

function proximoEstreno(peliculas: PeliculaResumen[]) {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const hoyTimestamp = hoy.getTime()

  return peliculas
    .map((pelicula) => {
      const [anio, mes, dia] = pelicula.release_date.split('-').map(Number)
      const fecha = new Date(anio, mes - 1, dia)
      const fechaValida =
        pelicula.release_date !== '' &&
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia

      return fechaValida ? { pelicula, fecha: fecha.getTime() } : null
    })
    .filter((estreno): estreno is { pelicula: PeliculaResumen; fecha: number } =>
      estreno !== null && estreno.fecha >= hoyTimestamp,
    )
    .sort((a, b) => a.fecha - b.fecha)
    .map(({ pelicula, fecha }) => ({
      pelicula,
      dias: Math.round((fecha - hoyTimestamp) / 86_400_000),
    }))[0]
}

export function Estrenos({ esFavorita, onFavorito }: Props) {
  const [region, setRegion] = useState<RegionEstrenos>('VE')
  const [pagina, setPagina] = useState(1)
  const { datos, error, cargando, reintentar } = useEstrenos(pagina, region)
  const siguienteEstreno = datos ? proximoEstreno(datos.results) : undefined
  const totalPaginas = Math.min(datos?.total_pages ?? 0, MAX_PAGINAS)

  function cambiarRegion(valor: string) {
    const nuevoPais = PAISES.find((pais) => pais.region === valor)
    if (nuevoPais) {
      setRegion(nuevoPais.region)
      setPagina(1)
    }
  }

  function irAPagina(nuevaPagina: number) {
    setPagina(nuevaPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section>
      <title>Próximos estrenos · Cartelera</title>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Próximos estrenos</h1>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground">País</span>
          <Select value={region} onValueChange={cambiarRegion}>
            <SelectTrigger className="w-48" aria-label="País">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAISES.map((pais) => (
                <SelectItem key={pais.region} value={pais.region}>
                  {pais.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {siguienteEstreno && (
        <p className="mb-6 rounded-lg border bg-card px-4 py-3 text-sm" aria-live="polite">
          {siguienteEstreno.dias === 0
            ? <>El próximo estreno es <strong>{siguienteEstreno.pelicula.title}</strong>: se estrena hoy.</>
            : <>El próximo estreno es <strong>{siguienteEstreno.pelicula.title}</strong> en {siguienteEstreno.dias}{' '}
                {siguienteEstreno.dias === 1 ? 'día.' : 'días.'}</>}
        </p>
      )}

      {error ? (
        <MensajeError mensaje={error} onReintentar={reintentar} />
      ) : cargando || !datos ? (
        <EsqueletoGrilla />
      ) : datos.results.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No hay próximos estrenos para este país.</p>
      ) : (
        <>
          <GrillaPeliculas peliculas={datos.results} esFavorita={esFavorita} onFavorito={onFavorito} />
          <Paginador pagina={pagina} totalPaginas={totalPaginas} onCambiar={irAPagina} />
        </>
      )}
    </section>
  )
}
