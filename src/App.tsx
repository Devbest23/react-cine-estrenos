import { Outlet } from 'react-router'
import { Header } from '@/core/layout/Header'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'
import { useState } from 'react'
import { toast } from 'sonner'

export interface ContextoApp {
  favoritas: PeliculaResumen[]
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

export default function App() {
  const [favoritas, setFavoritas] = useState<PeliculaResumen[]>([])

  const esFavorita = (id: number) => favoritas.some((favorita) => favorita.id === id)
  function alternarFavorita(p: PeliculaResumen) {
    if (esFavorita(p.id)) {
      setFavoritas((actuales) => actuales.filter((favorita) => favorita.id !== p.id))
      toast(`Quitaste ${p.title} de favoritos`)
    } else {
      setFavoritas((actuales) => [...actuales, p])
      toast.success(`${p.title} agregada a favoritas`)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header totalFavoritas={favoritas.length} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
<Outlet context={{ favoritas, esFavorita, onFavorito: alternarFavorita } satisfies ContextoApp} />
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Datos e imágenes de{' '}
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline hover:text-foreground">
          TMDB
        </a>
        . Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
      </footer>
    </div>
  )
}
