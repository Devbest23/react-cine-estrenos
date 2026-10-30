import { Film } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { imagen } from '@/core/config/tmdb'
import { Skeleton } from '@/components/ui/skeleton'
import { MensajeError } from '@/shared/components/MensajeError'
import { NoEncontrada } from '@/core/layout/NoEncontrada'
import { usePelicula } from '../hooks/usePeliculas'

export function DetallePelicula() {
  const { id: idParametro } = useParams()
  const id = idParametro && /^\d+$/.test(idParametro) ? Number(idParametro) : null
  const { datos, error, cargando, reintentar } = usePelicula(id)

  if (id === null) return <NoEncontrada />

  return (
    <section>
      <title>{datos ? `${datos.title} · Cartelera` : 'Película · Cartelera'}</title>
      <Link to="/peliculas" className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Volver a películas
      </Link>

      {error ? (
        <MensajeError mensaje={error} onReintentar={reintentar} />
      ) : cargando || !datos ? (
        <div className="grid gap-8 md:grid-cols-[minmax(0,280px)_1fr]">
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-[minmax(0,280px)_1fr]">
          <div className="aspect-[2/3] overflow-hidden rounded-xl bg-card">
            {imagen(datos.poster_path) ? (
              <img
                src={imagen(datos.poster_path) ?? undefined}
                alt={`Póster de ${datos.title}`}
                className="size-full object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center text-muted-foreground">
                <Film className="size-12" />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{datos.release_date || 'Fecha de estreno desconocida'}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{datos.title}</h1>
            {datos.tagline && <p className="mt-2 italic text-muted-foreground">{datos.tagline}</p>}
            {datos.vote_average > 0 && (
              <p className="mt-4 text-sm font-medium">Calificación: {datos.vote_average.toFixed(1)} / 10</p>
            )}
            {datos.genres.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                {datos.genres.map((genero) => genero.name).join(' · ')}
              </p>
            )}
            <h2 className="mt-8 text-xl font-semibold">Sinopsis</h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              {datos.overview || 'No hay una sinopsis disponible para esta película.'}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
