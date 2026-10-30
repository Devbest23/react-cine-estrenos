import { Clapperboard, Heart } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  totalFavoritas: number
}

export function Header({ totalFavoritas }: Props) {
  const claseEnlace = ({ isActive }: { isActive: boolean }) =>
    cn(
      'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
      isActive && 'bg-secondary text-secondary-foreground',
    )

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
        <Link to="/peliculas" className="flex items-center gap-3 text-left">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="size-5" />
          </span>
          <span>
            <span className="block text-xl leading-tight font-bold tracking-tight">Cartelera</span>
            <span className="block text-xs text-muted-foreground">Catálogo de películas</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          <NavLink to="/peliculas" end className={claseEnlace}>
            Películas
          </NavLink>
          <NavLink to="/estrenos" className={claseEnlace}>
            Estrenos
          </NavLink>
          <NavLink to="/favoritas" className={claseEnlace}>
            <Heart className="fill-primary text-primary" />
            Favoritas
            {totalFavoritas > 0 && <Badge className="ml-1 h-5 min-w-5 px-1.5 tabular-nums">{totalFavoritas}</Badge>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
