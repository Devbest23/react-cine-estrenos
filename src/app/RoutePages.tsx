import { useNavigate, useOutletContext } from 'react-router'
import App, { type ContextoApp } from '@/App'
import { NoEncontrada } from '@/core/layout/NoEncontrada'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { DetallePelicula } from '@/features/peliculas/pages/DetallePelicula'
import { Estrenos } from '@/features/peliculas/pages/Estrenos'

export function AppLayout() {
  return <App />
}

export function CatalogoRuta() {
  const { esFavorita, onFavorito } = useOutletContext<ContextoApp>()
  return <CatalogoPeliculas esFavorita={esFavorita} onFavorito={onFavorito} />
}

export function EstrenosRuta() {
  const { esFavorita, onFavorito } = useOutletContext<ContextoApp>()
  return <Estrenos esFavorita={esFavorita} onFavorito={onFavorito} />
}

export function DetallePeliculaRuta() {
  return <DetallePelicula />
}

export function FavoritasRuta() {
  const { favoritas, onFavorito } = useOutletContext<ContextoApp>()
  const navigate = useNavigate()

  return (
    <MisFavoritas
      favoritas={favoritas}
      onFavorito={onFavorito}
      onIrAlCatalogo={() => navigate('/peliculas')}
    />
  )
}

export function NoEncontradaRuta() {
  return <NoEncontrada />
}
