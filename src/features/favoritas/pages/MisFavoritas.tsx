import { Button } from '@/components/ui/button'
import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { Heart } from 'lucide-react'

interface Props {
  favoritas: PeliculaResumen[]
  onFavorito: (pelicula: PeliculaResumen) => void
  onIrAlCatalogo: () => void
}

// La misma Grilla, ahora con datos que no vienen de la API sino del estado de App.
// Se conecta en M2.
// TODO M2: recibir también onIrAlCatalogo
export function MisFavoritas({ favoritas, onFavorito, onIrAlCatalogo }: Props) {
  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>
      {favoritas.length === 0 ? (
        <EstadoVacio icono={Heart} titulo="Todavía no tienes favoritos">
          <Button variant={'outline'} onClick={onIrAlCatalogo}>
            Explorar películas
          </Button>
        </EstadoVacio>
      ) : (
        <GrillaPeliculas peliculas={favoritas} esFavorita={() => true} onFavorito={onFavorito} />
      )}
    </section>
  )
}