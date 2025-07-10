import React from "react";
import { useNavigate } from "react-router-dom";

const iconosPorLabel = {
  Usuarios: "bi-people-fill",
  Seguridad: "bi-gear-fill",
  Gráficos: "bi-bar-chart-fill",
  Parametros:"bi bi-sliders"
  // Agrega más si necesitas
};

const SidebarMenu = ({ items, collapsed, onToggle, onLogout, usuario }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-light border-end d-flex flex-column position-fixed"
      style={{
        top: 0,
        left: 0,
        height: "100vh",            // altura completa
        width: collapsed ? "80px" : "250px",
        padding: "1rem",
        transition: "width 0.3s",
        overflowX: "hidden",
        overflowY: "auto",          // scroll interno si hay mucho contenido
        alignItems: collapsed ? "center" : "stretch",
        textAlign: collapsed ? "center" : "start",
        zIndex: 1000,               // que esté encima del contenido
      }}
    >
      {/* Botón para colapsar */}
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={onToggle}
        title={collapsed ? "Expandir menú" : "Colapsar menú"}
      >
        <i
          className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}
          style={{ fontSize: "1.2rem" }}
        />
      </button>

      {/* Avatar y nombre */}
      <div className={`mb-4 d-flex flex-column align-items-center`}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "0.5rem",
            backgroundColor: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={usuario?.NombreUsuario}
        >
          {usuario?.ImagenUrl ? (
            <img
              src={usuario.ImagenUrl}
              alt="Avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <i className="bi bi-person-fill" style={{ fontSize: "1.5rem", color: "#666" }} />
          )}
        </div>


        {!collapsed && (
          <>
            <h6 className="mb-0">{usuario?.NombreUsuario}</h6>
            <small className="text-muted">{usuario?.Email || "Sin email"}</small>
          </>
        )}
      </div>

      {/* Menú */}
      <nav className="flex-grow-1 w-100">
        <ul className="nav flex-column w-100">
          {items.map(({ label, ruta }) => (
            <li key={label} className="nav-item mb-2 w-100">
              <button
                className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center"
                onClick={() => navigate(ruta)}
                title={label}
                style={{
                  whiteSpace: "nowrap",
                  gap: collapsed ? 0 : "0.5rem",
                  justifyContent: collapsed ? "center" : "flex-start",
                  paddingLeft: collapsed ? "0" : undefined,
                  paddingRight: collapsed ? "0" : undefined,
                }}
              >
                <i
                  className={`bi ${iconosPorLabel[label] || "bi-circle"}`}
                  style={{ fontSize: "1.2rem" }}
                />
                {!collapsed && label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón cerrar sesión fijo abajo */}
      <div className="w-100 mt-auto">
        <button
          className="btn btn-outline-danger btn-sm w-100 d-flex justify-content-center align-items-center"
          onClick={onLogout}
          title="Cerrar sesión"
          style={{
            justifyContent: collapsed ? "center" : "flex-start",
            paddingLeft: collapsed ? "0" : undefined,
            paddingRight: collapsed ? "0" : undefined,
          }}
        >
          <i className="bi bi-box-arrow-right" style={{ fontSize: "1.2rem" }} />
          {!collapsed && <span className="ms-2">Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
