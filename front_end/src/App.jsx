import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsuariosPage from "./pages/UsuariosPage";
import MainLayout from "./components/templates/MainLayout"; 
import EnConstruccion from "./pages/EnConstruccion";
import AdministrarPermisosPorPerfil from "./pages/seguridad/AdministrarPermisosPorPerfil";
import PerfilesPage from "./pages/PerfilesPage";
import ParametroPage from "./pages/ParametroPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} />
        
        
        
        <Route path="/home" element={<HomePage />} />
        <Route path="/usuarios" element={<UsuariosPage />} /> */}
         <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas con sidebar */}
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="/seguridad" element={<AdministrarPermisosPorPerfil />} />
          <Route path="/graficos" element={<EnConstruccion titulo="Gráficos" />} /> 
          <Route path="/perfiles" element={<PerfilesPage titulo="Perfiles" />} /> 
          <Route path="/parametros" element={<ParametroPage titulo="Parametros" />} /> 

          {/* Ruta default al home */}
          <Route path="" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
