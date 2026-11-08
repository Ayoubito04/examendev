import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import Temario from './pages/Temario.jsx';
import Test from './pages/Test.jsx';
import Progreso from './pages/Progreso.jsx';
import Contacto from './pages/Contacto.jsx';
import NoEncontrado from './pages/NoEncontrado.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="temario" element={<Temario />} />
        <Route path="test/:moduloId" element={<Test />} />
        <Route path="progreso" element={<Progreso />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
