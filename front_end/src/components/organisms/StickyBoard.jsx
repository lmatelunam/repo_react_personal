import { useState, useEffect, useRef } from "react";

const StickyBoard = () => {
  const zMax = useRef(1);
  const [notas, setNotas] = useState([]);

  // Cargar desde localStorage
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("stickyBoardNotas")) || [];
    setNotas(guardadas);
    if (guardadas.length > 0) {
      zMax.current = Math.max(...guardadas.map((n) => n.z || 1), 1);
    }
  }, []);

  // Guardar cuando cambian
  useEffect(() => {
    localStorage.setItem("stickyBoardNotas", JSON.stringify(notas));
  }, [notas]);

  const crearNota = () => {
    const nueva = {
      id: Date.now(),
      texto: "Nueva nota...",
      x: 50,
      y: 50,
      z: ++zMax.current,
    };
    setNotas((prev) => [...prev, nueva]);
  };

  const eliminarNota = (id) => {
    setNotas((prev) => prev.filter((n) => n.id !== id));
  };

  const actualizarTexto = (id, texto) => {
    setNotas((prev) =>
      prev.map((n) => (n.id === id ? { ...n, texto } : n))
    );
  };

  const traerAlFrente = (id) => {
    zMax.current += 1;
    setNotas((prev) =>
      prev.map((n) => (n.id === id ? { ...n, z: zMax.current } : n))
    );
  };

  const handleMouseDown = (id, e) => {
    traerAlFrente(id);
    const nota = notas.find((n) => n.id === id);
    const offsetX = e.clientX - nota.x;
    const offsetY = e.clientY - nota.y;

    const onMouseMove = (e) => {
      setNotas((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, x: e.clientX - offsetX, y: e.clientY - offsetY } : n
        )
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
  <div className="mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6 className="m-0">Notas personales</h6>
      <button className="btn btn-sm btn-primary" onClick={crearNota}>
        + Nueva nota
      </button>
    </div>

    <div
      style={{
        position: "relative",
        height: "400px",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        background: "#f8f9fa",
        overflow: "hidden",
      }}
    >
      {notas.map((nota) => (
        <div
          key={nota.id}
          onMouseDown={(e) => handleMouseDown(nota.id, e)}
          style={{
            position: "absolute",
            left: nota.x,
            top: nota.y,
            zIndex: nota.z,
            width: "200px",
            backgroundColor: "#fff3cd",
            padding: "10px",
            borderLeft: "4px solid #ffc107",
            borderRadius: "4px",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
            cursor: "move",
            userSelect: "none",
          }}
        >
          {/* X para eliminar */}
          <button
            className="btn-close"
            style={{
              position: "absolute",
              top: "4px",
              right: "6px",
              opacity: 0.6,
            }}
            onClick={(e) => {
              e.stopPropagation();
              eliminarNota(nota.id);
            }}
            title="Eliminar nota"
          ></button>

          <textarea
            className="form-control form-control-sm"
            value={nota.texto}
            onChange={(e) => actualizarTexto(nota.id, e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              resize: "none",
              fontSize: "0.9rem",
              height: "80px",
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

};

export default StickyBoard;
