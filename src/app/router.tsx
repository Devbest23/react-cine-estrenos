import { createBrowserRouter, Navigate } from 'react-router'
import {
  AppLayout,
  CatalogoRuta,
  DetallePeliculaRuta,
  EstrenosRuta,
  FavoritasRuta,
  NoEncontradaRuta,
} from './RoutePages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/peliculas" replace /> },
      { path: 'peliculas', element: <CatalogoRuta /> },
      { path: 'peliculas/:id', element: <DetallePeliculaRuta /> },
      { path: 'estrenos', element: <EstrenosRuta /> },
      { path: 'favoritas', element: <FavoritasRuta /> },
      { path: '*', element: <NoEncontradaRuta /> },
    ],
  },
])
