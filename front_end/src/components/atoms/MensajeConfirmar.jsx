import React from "react";

const MensajeConfirmar = ({ mostrar, mensaje, onConfirmar, onCancelar }) => {
  if (!mostrar) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-warning">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">Confirmar acción</h5>
            <button type="button" className="btn-close" onClick={onCancelar}></button>
          </div>
          <div className="modal-body">
            <p>{mensaje}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            <button className="btn btn-danger" onClick={onConfirmar}>Sí, confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensajeConfirmar;
