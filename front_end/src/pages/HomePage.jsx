import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";

import useModal from "../hooks/useModal";
import ConfirmModal from "../components/particulas/ConfirmModal";
import ContainerCard from "../components/particulas/ContainerCard";
import StickyBoard from "../components/organisms/StickyBoard";

const HomePage = () => {
  const navigate = useNavigate();
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
  const modalCerrarSesion = useModal();

  useEffect(() => {
    if (!usuarioActual) {
      navigate("/"); // Si no hay sesión, redirige al login
    }
  }, [navigate, usuarioActual]);

  const confirmarCerrarSesion = () => {
    localStorage.removeItem("usuario");
    modalCerrarSesion.cerrar();
    navigate("/");
  };

  return (
    <ContainerCard titulo="Inicio">
      <h2 className="mb-3">Bienvenido, {usuarioActual?.NombreUsuario}!</h2>
      <p className="text-muted">Esta es la página principal de tu sistema. Desde aquí puedes navegar por las distintas secciones.</p>

      <div className="row mb-4">
  {/* Tarjetas resumen */}
  <div className="col-md-4">
    <div className="card text-bg-primary shadow-sm">
      <div className="card-body text-center">
        <h6 className="card-title">Usuarios activos</h6>
        <p className="display-6 mb-0">24</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-bg-success shadow-sm">
      <div className="card-body text-center">
        <h6 className="card-title">Perfiles registrados</h6>
        <p className="display-6 mb-0">5</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-bg-secondary shadow-sm">
      <div className="card-body text-center">
        <h6 className="card-title">Parámetros activos</h6>
        <p className="display-6 mb-0">48</p>
      </div>
    </div>
  </div>
</div>

{/* Accesos rápidos */}
<div className="row mb-4">
  <div className="col-md-12">
    <h6 className="mb-3">Accesos rápidos</h6>
    <div className="d-flex flex-wrap gap-3">
      <button className="btn btn-outline-primary" onClick={() => navigate("/usuarios")}>
        <i className="bi bi-people-fill me-2"></i> Gestión de Usuarios
      </button>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/perfiles")}>
        <i className="bi bi-person-badge me-2"></i> Perfiles
      </button>
      <button className="btn btn-outline-success" onClick={() => navigate("/parametros")}>
        <i className="bi bi-sliders me-2"></i> Parámetros
      </button>
    </div>
  </div>
</div>

{/* Sección de notas movibles */}
  {/* Agregado: Notas rápidas arrastrables */}
  <StickyBoard />




      <ConfirmModal
        mostrar={modalCerrarSesion.mostrar}
        onClose={modalCerrarSesion.cerrar}
        onConfirm={confirmarCerrarSesion}
        titulo="¿Cerrar sesión?"
        mensaje="¿Estás seguro que deseas cerrar sesión?"
      />
    </ContainerCard>
  );
};

export default HomePage;
