import { useCallback } from 'react'
import { useConsulta } from '@/shared/hooks/useConsulta'
import type { DetallePelicula } from '../models/pelicula'
import type { RegionEstrenos } from '../services/peliculas.service'
import { obtenerDetalle, obtenerEstrenos } from '../services/peliculas.service'

export function useEstrenos(pagina: number, region: RegionEstrenos) {
  const consultar = useCallback(
    (signal: AbortSignal) => obtenerEstrenos(pagina, signal, region),
    [pagina, region],
  )

  return useConsulta(`estrenos|${region}|${pagina}`, consultar)
}

export function usePelicula(id: number | null) {
  const consultar = useCallback(
    (signal: AbortSignal) => id === null ? Promise.resolve(null) : obtenerDetalle(id, signal),
    [id],
  )

  return useConsulta<DetallePelicula | null>(`detalle|${id ?? 'invalido'}`, consultar)
}
