// import { useEffect } from "react";
import React, { useState } from "react";
import useUsuarios from "../hooks/useUsuarios";
import ContainerCard from "../components/particulas/ContainerCard";
import DropdownList from "../components/atoms/DropdownList";
import usePerfiles from "../hooks/usePerfiles";
import MensajeInformativo from "../components/atoms/MensajeInformativo";
import Button from "../components/atoms/Button";
import SimpleTable from "../components/molecules/SimpleTable";

const UsuariosPage = () => {
  const { perfiles, 
          loadingPerfil, 
          errorPerfil, 
          recargarPerfil } = usePerfiles();
  const { usuarios, 
          loading, 
          error, 
          recargar,
          guardarUsuario,
          modificarUsuario, 
        } = useUsuarios();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear"); // "crear" o "editar"
  const [modalInfo, setModalInfo] = useState({ mostrar: false, tipo: "info", mensaje: "" });
  const [mensaje, setMensaje] = useState(null); // { tipo: "success", texto: "Usuario creado correctamente" }
  const [imagenUsuario, setImagenUsuario] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    NombreUsuario: "",
    Password: "",
    PerfilId: "",
    Estado: "activo",
  });

  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

  const obtenerUrlCompleta = (url) => {
    if (!url || url.trim() === "" || url === "https://localhost:44317") return null;
    if (url.startsWith("http")) return url;
    return `https://localhost:44317${url}`;
  };

  // Función para validar URL de imagen y evitar mostrar url inválidas
  const obtenerUrlImagenValida = (url) => {
    if (!url || url.trim() === "" || url === "https://localhost:44317") return null;
    return url;
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (mostrarFormulario) {
      setModoFormulario("crear");
      setUsuarioSeleccionadoId(null);
      setNuevoUsuario({ NombreUsuario: "", Password: "", PerfilId: "", Estado: "activo" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    try {
      if (!nuevoUsuario.NombreUsuario || !nuevoUsuario.Password || !nuevoUsuario.PerfilId) {
        setModalInfo({ tipo: "warning", texto: "Por favor complete todos los campos obligatorios." });
        return;
      }

      let respuesta;

      if (imagenUsuario) {
        const formData = new FormData();
        for (const clave in nuevoUsuario) {
          formData.append(clave, nuevoUsuario[clave]);
        }
        formData.append("imagen", imagenUsuario);

        if (modoFormulario === "crear") {
          respuesta = await guardarUsuario(formData, true); // el segundo parámetro indica que es FormData
        } else if (modoFormulario === "editar" && usuarioSeleccionadoId) {
          respuesta = await modificarUsuario(usuarioSeleccionadoId, formData, true);
        }
      } else {
        // Sin imagen, envía JSON normal
        if (modoFormulario === "crear") {
          respuesta = await guardarUsuario(nuevoUsuario);
        } else if (modoFormulario === "editar" && usuarioSeleccionadoId) {
          respuesta = await modificarUsuario(usuarioSeleccionadoId, nuevoUsuario);
        }
      }

      setModalInfo({ tipo: "success", texto: modoFormulario === "crear" ? "Usuario creado correctamente." : "Usuario actualizado correctamente." });

      setMostrarFormulario(false);
      setModoFormulario("crear");
      setUsuarioSeleccionadoId(null);
      setNuevoUsuario({ NombreUsuario: "", Password: "", PerfilId: "", Estado: "activo" });
      setImagenUsuario(null); // Limpiar imagen
      setPreviewUrl(null);
      recargar();

    } catch (error) {
      setModalInfo({ tipo: "danger", texto: error.message });
    }
  };

  const handleSeleccionarUsuario = (id) => {
    setUsuarioSeleccionadoId((prev) => (prev === id ? null : id));
  };

  const handleModificar = () => {
    if (!usuarioSeleccionadoId) {
      setModalInfo({ tipo: "success", texto: "Debe seleccionar un usuario." });
      return;
    }

    const usuario = usuarios.find((u) => u.UsuarioId === usuarioSeleccionadoId);
    if (usuario) {
      setNuevoUsuario({
        NombreUsuario: usuario.NombreUsuario,
        PasswordHash: "",
        PerfilId: usuario.PerfilId ?? "",
        Estado: usuario.Estado || "activo",
      });

      setImagenUsuario(null); // 🔁 Limpia cualquier imagen previa cargada

      const urlValida = obtenerUrlCompleta(usuario.ImagenUrl);
      setPreviewUrl(urlValida);

      setModoFormulario("editar");
      setMostrarFormulario(true);
    }
  };

  return (
    <ContainerCard titulo="Listado de Usuarios">
      {modalInfo.mostrar && (
        <MensajeInformativo
          tipo={modalInfo.tipo}
          mensaje={modalInfo.mensaje}
          onCerrar={() => setModalInfo({ ...modalInfo, mostrar: false })}
        />
      )}

      {loading && <div className="alert alert-info">Cargando usuarios...</div>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}{" "}
          <Button className="btn btn-link" onClick={recargar}>
            Reintentar
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="table-responsive mb-3">
          <SimpleTable
            columnas={["Usuario", "Perfil", "Estado", "Acción"]}
            datos={usuarios}
            rowKey="UsuarioId"
            renderFila={(user) => (
              <>
                <td>
                  <div className="d-flex align-items-center">
                    {obtenerUrlImagenValida(user.ImagenUrl) ? (
                      <img
                        src={obtenerUrlImagenValida(user.ImagenUrl)}
                        alt="avatar"
                        style={{ width: "45px", height: "45px", objectFit: "cover" }}
                        className="rounded-circle"
                      />
                    ) : (
                      <div
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                          backgroundColor: "#6c757d",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1rem",
                          color: "#fff",
                          fontWeight: "bold",
                          userSelect: "none",
                          textTransform: "uppercase",
                        }}
                        title={user.NombreUsuario}
                      >
                        {user.NombreUsuario ? user.NombreUsuario.substring(0, 2) : ""}
                      </div>
                    )}

                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.NombreUsuario}</p>
                    </div>
                  </div>
                </td>
                <td>{user.NombrePerfil || "Sin perfil"}</td>
                <td>
                  <span
                    className={`badge rounded-pill d-inline ${
                      user.Estado === "activo"
                        ? "bg-success"
                        : user.Estado === "inactivo"
                        ? "bg-secondary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {user.Estado}
                  </span>
                </td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleSeleccionarUsuario(user.UsuarioId)}
                  >
                    {user.UsuarioId === usuarioSeleccionadoId ? "Seleccionado" : "Seleccionar"}
                  </Button>
                </td>
              </>
            )}
          />
        </div>
      )}

      {mostrarFormulario && (
        <div className="card mb-4 p-3 border border-success-subtle">
          <h5 className="mb-3">{modoFormulario === "crear" ? "Nuevo Usuario" : "Modificar Usuario"}</h5>

          {loadingPerfil && (
            <div className="alert alert-info py-2">Cargando perfiles...</div>
          )}

          {errorPerfil && (
            <div className="alert alert-danger py-2">
              Error al cargar perfiles: {errorPerfil}
              <Button className="btn btn-link btn-sm" onClick={recargarPerfil}>
                Reintentar
              </Button>
            </div>
          )}

          <div className="mb-2">
            <label className="form-label">Nombre Usuario</label>
            <input
              type="text"
              name="NombreUsuario"
              className="form-control"
              value={nuevoUsuario.NombreUsuario}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Clave</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              value={nuevoUsuario.Password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Perfil</label>
            <DropdownList
              label="Seleccione un Perfil:"
              options={perfiles.map((p) => ({
                label: p.NombrePerfil,
                value: p.PerfilId,
              }))}
              onChange={(val) => setNuevoUsuario((prev) => ({ ...prev, PerfilId: val }))}
              value={nuevoUsuario.PerfilId}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              name="Estado"
              className="form-select"
              value={nuevoUsuario.Estado}
              onChange={handleChange}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen de Usuario</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (!file.type.startsWith("image/")) {
                    alert("Por favor selecciona una imagen válida.");
                    return;
                  }

                  setImagenUsuario(file);

                  if (previewUrl) URL.revokeObjectURL(previewUrl);

                  const url = URL.createObjectURL(file);
                  setPreviewUrl(url);
                }
              }}
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <Button className="btn btn-primary" onClick={handleGuardar}>
              Guardar
            </Button>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        <Button className="btn btn-sm btn-success" onClick={toggleFormulario}>
          {mostrarFormulario ? "Cancelar" : "Nuevo Usuario"}
        </Button>

        <Button className="btn btn-sm btn-primary" onClick={handleModificar}>
          Modificar
        </Button>
      </div>
    </ContainerCard>
  );

};

export default UsuariosPage;
