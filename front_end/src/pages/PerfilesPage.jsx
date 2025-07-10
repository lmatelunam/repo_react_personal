import React, { useState, useEffect } from "react";
import ContainerCard from "../components/particulas/ContainerCard";
import usePerfiles from "../hooks/usePerfiles"; // Tu hook para consumir la API

const PerfilesPage = () => {
  const { perfiles, loading, error, recargar, guardarPerfil } = usePerfiles();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);

  const [formulario, setFormulario] = useState({
        PerfilId: 0,
        NombrePerfil: "",
        Descripcion: "",
  });

  const toggleFormulario = () => {
    setMostrarFormulario((prev) => !prev);
    if (!mostrarFormulario) {
      // Reset al abrir
      setFormulario({ NombrePerfil: "", Descripcion: "" });
      setPerfilSeleccionado(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    if (!formulario.NombrePerfil.trim()) {
      alert("Debe ingresar un nombre de perfil");
      return;
    }

    await guardarPerfil({ ...formulario, PerfilId: perfilSeleccionado?.PerfilId || 0 });
    toggleFormulario();
    recargar();
  };

  const seleccionarPerfil = (perfil) => {
    setPerfilSeleccionado(perfil);
    setFormulario({
      NombrePerfil: perfil.NombrePerfil,
      Descripcion: perfil.Descripcion,
    });
    setMostrarFormulario(true);
  };

  return (
    <ContainerCard titulo="Mantenimiento de Perfiles">
      <div className="mb-3 d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary btn-sm" onClick={recargar}>Actualizar</button>
        <button className="btn btn-success btn-sm" onClick={toggleFormulario}>
          {mostrarFormulario ? "Cancelar" : "Nuevo Perfil"}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card mb-4 p-3 border border-success-subtle">
          <h5 className="mb-3">{perfilSeleccionado ? "Modificar Perfil" : "Nuevo Perfil"}</h5>
          <div className="mb-2">
            <label className="form-label">Nombre Perfil</label>
            <input
              type="text"
              name="NombrePerfil"
              className="form-control"
              value={formulario.NombrePerfil}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="Descripcion"
              className="form-control"
              value={formulario.Descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary btn-sm" onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </div>
      )}

      {loading && <div className="alert alert-info">Cargando perfiles...</div>}

      {error && (
        <div className="alert alert-danger">
          {error} <button className="btn btn-link" onClick={recargar}>Reintentar</button>
        </div>
      )}

      {!loading && !error && (
        <ul className="list-group">
          {perfiles.map((perfil) => (
            <li
              key={perfil.PerfilId}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => seleccionarPerfil(perfil)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <strong>{perfil.NombrePerfil}</strong><br />
                <small className="text-muted">{perfil.Descripcion || "Sin descripción"}</small>
              </div>
              <span className="badge bg-secondary">ID: {perfil.PerfilId}</span>
            </li>
          ))}
        </ul>
      )}
    </ContainerCard>
  );
};

export default PerfilesPage;
