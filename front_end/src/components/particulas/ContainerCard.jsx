// src/components/particulas/ContainerCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ContainerCard = ({ titulo, children }) => {
  const navigate = useNavigate();

  const volverHome = () => navigate("/home"); // O a la ruta que desees

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div
        className="card shadow-sm rounded-4 p-4 position-relative"
        style={{ maxWidth: "1000px", width: "100%" }}
      >
        {titulo && (
          <div className="border-bottom pb-2 mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0">{titulo}</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={volverHome}
              title="Volver al inicio"
            >
              Cerrar
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ContainerCard;
