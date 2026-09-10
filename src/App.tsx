import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Historia from './pages/Historia'
import Clasificacion from './pages/Clasificacion'
import Reglamento from './pages/Reglamento'
import Demandas from './pages/Demandas'
import Posiciones from './pages/Posiciones'
import DesarrolloJuvenil from './pages/DesarrolloJuvenil'
import Atletas from './pages/Atletas'
import Ventanas from './pages/Ventanas'
import Deteccion from './pages/Deteccion'
import Referencias from './pages/Referencias'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="historia" element={<Historia />} />
        <Route path="clasificacion" element={<Clasificacion />} />
        <Route path="reglamento" element={<Reglamento />} />
        <Route path="demandas" element={<Demandas />} />
        <Route path="posiciones" element={<Posiciones />} />
        <Route path="desarrollo-juvenil" element={<DesarrolloJuvenil />} />
        <Route path="atletas" element={<Atletas />} />
        <Route path="ventanas-entrenabilidad" element={<Ventanas />} />
        <Route path="deteccion-talento" element={<Deteccion />} />
        <Route path="referencias" element={<Referencias />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
