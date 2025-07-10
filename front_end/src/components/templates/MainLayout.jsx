import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import SidebarMenu from "../particulas/SidebarMenu";
import ConfirmModal from "../particulas/ConfirmModal";
import { obtenerUsuarioPorId } from "../../services/usuariosService";

const MainLayout = () => {
  const navigate = useNavigate();
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
  const modalCerrarSesion = useModal();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

console.log("usuarioActual: ", usuarioActual);

  if (!usuarioActual) {
    // Si no hay usuario, redirige al login (puedes mejorarlo con un guard)
    navigate("/");
    return null;
  }

  const confirmarCerrarSesion = () => {
    localStorage.removeItem("usuario");
    modalCerrarSesion.cerrar();
    navigate("/");
  };

  const itemsMenu = [
    { label: "Home", ruta: "/home" },
    { label: "Usuarios", ruta: "/usuarios" },
    { label: "Seguridad", ruta: "/seguridad" },
    { label: "Gráficos", ruta: "/graficos" },
    { label: "Parametros", ruta: "/parametros" },
    { label: "Perfiles", ruta: "/perfiles" },
  ];

  return (
    <>
      <SidebarMenu
        items={itemsMenu}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={modalCerrarSesion.abrir}
        usuario={usuarioActual}
      />

      {/* Contenido principal con marginLeft dinámico */}
      <div
        style={{
          marginLeft: sidebarCollapsed ? 80 : 250,
          padding: "1rem",
          minHeight: "100vh",
          overflowY: "auto",
          transition: "margin-left 0.3s",
        }}
      >
        <Outlet />
      </div>

      <ConfirmModal
        mostrar={modalCerrarSesion.mostrar}
        onClose={modalCerrarSesion.cerrar}
        onConfirm={confirmarCerrarSesion}
        titulo="¿Cerrar sesión?"
        mensaje="¿Estás seguro que deseas cerrar sesión?"
      />
    </>
  );
};

export default MainLayout;
