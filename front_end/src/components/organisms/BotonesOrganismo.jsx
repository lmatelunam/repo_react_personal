import React, { useState } from "react";
import useBotones from "../../hooks/useBotones";
import MensajeInformativo from "../atoms/MensajeInformativo";

const BotonesOrganismo = () => {
    const { botones,
            loading,
            error,
            recargar: cargarBotones,
            guardarBoton,
            modificarBoton,
            eliminarBoton,
        } = useBotones();

    const [form, setForm] = useState({
        BotonId: 0,
        NombreBoton: "",
        Descripcion: "",
    });

    const [modoEdicion, setModoEdicion] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 3;

    const totalPaginas = Math.ceil(botones.length / registrosPorPagina);
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const botonesPaginados = botones.slice(
        indiceInicial,
        indiceInicial + registrosPorPagina
    );

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const guardar = async () => {
        try {
        if (!form.NombreBoton) {
            setMensaje({ tipo: "warning", texto: "Debe ingresar un nombre de botón." });
            return;
        }

        if (modoEdicion) {
            await modificarBoton(form.BotonId, form);
            setMensaje({ tipo: "success", texto: "Botón actualizado correctamente." });
        } else {
            await guardarBoton(form);
            setMensaje({ tipo: "success", texto: "Botón creado correctamente." });
        }

        setForm({ BotonId: 0, NombreBoton: "", Descripcion: "" });
        setModoEdicion(false);
        cargarBotones();
        } catch (error) {
        setMensaje({ tipo: "danger", texto: error.message });
        } finally {
        setTimeout(() => setMensaje(null), 4000);
        }
    };

    const editar = (boton) => {
        setForm(boton);
        setModoEdicion(true);
    };

    const eliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este botón?")) return;

    try {
        await eliminarBoton(id);
        setMensaje({ tipo: "success", texto: "Botón eliminado correctamente." });

        // ⚠️ Verificamos si es el último elemento visible en la página actual
        const totalActual = botones.length;
        const restantesEnPagina = totalActual - (paginaActual - 1) * registrosPorPagina - 1;

        if (restantesEnPagina === 0 && paginaActual > 1) {
        setPaginaActual(paginaActual - 1);
        }

        cargarBotones();
    } catch (err) {
        setMensaje({ tipo: "danger", texto: err.message });
    } finally {
        setTimeout(() => setMensaje(null), 4000);
    }
    };


    const cancelar = () => {
        setForm({ BotonId: 0, NombreBoton: "", Descripcion: "" });
        setModoEdicion(false);
    };

  return (
    <div>
      <h5>{modoEdicion ? "Modificar Botón" : "Nuevo Botón"}</h5>

      {mensaje && (
        <MensajeInformativo tipo={mensaje.tipo} onClose={() => setMensaje(null)}>
          {mensaje.texto}
        </MensajeInformativo>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            name="NombreBoton"
            value={form.NombreBoton}
            onChange={manejarCambio}
            placeholder="Nombre del botón"
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            name="Descripcion"
            value={form.Descripcion}
            onChange={manejarCambio}
            placeholder="Descripción"
          />
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-success" onClick={guardar}>
            {modoEdicion ? "Actualizar" : "Guardar"}
          </button>
          {modoEdicion && (
            <button className="btn btn-secondary" onClick={cancelar}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {loading && <div>Cargando botones...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th style={{ width: "150px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {botonesPaginados.length === 0 && !loading ? (
            <tr>
              <td colSpan="4">No hay botones registrados.</td>
            </tr>
          ) : (
            botonesPaginados.map((boton) => (
              <tr key={boton.BotonId}>
                <td>{boton.BotonId}</td>
                <td>{boton.NombreBoton}</td>
                <td>{boton.Descripcion}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => editar(boton)}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminar(boton.BotonId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPaginaActual(paginaActual - 1)}>
                Anterior
              </button>
            </li>

            {Array.from({ length: totalPaginas }, (_, i) => (
              <li
                key={i}
                className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => setPaginaActual(paginaActual + 1)}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BotonesOrganismo;
