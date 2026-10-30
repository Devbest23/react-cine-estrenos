import { useCallback, useEffect, useState } from 'react'

interface EstadoConsulta<T> {
  clave: string
  intento: number
  datos: T | null
  error: string | null
  cargando: boolean
}

export function useConsulta<T>(clave: string, consultar: (signal: AbortSignal) => Promise<T>) {
  const [estado, setEstado] = useState<EstadoConsulta<T>>({
    clave,
    intento: 0,
    datos: null,
    error: null,
    cargando: true,
  })
  const [intentos, setIntentos] = useState(0)

  useEffect(() => {
    const control = new AbortController()

    consultar(control.signal)
      .then((datos) => {
        if (!control.signal.aborted) {
          setEstado({ clave, intento: intentos, datos, error: null, cargando: false })
        }
      })
      .catch((error: unknown) => {
        if (!control.signal.aborted) {
          setEstado({
            clave,
            intento: intentos,
            datos: null,
            error: error instanceof Error ? error.message : String(error),
            cargando: false,
          })
        }
      })

    return () => control.abort()
  }, [clave, consultar, intentos])

  const reintentar = useCallback(() => setIntentos((actual) => actual + 1), [])
  const estadoActual = estado.clave === clave && estado.intento === intentos

  return {
    datos: estadoActual ? estado.datos : null,
    error: estadoActual ? estado.error : null,
    cargando: !estadoActual || estado.cargando,
    reintentar,
  }
}
