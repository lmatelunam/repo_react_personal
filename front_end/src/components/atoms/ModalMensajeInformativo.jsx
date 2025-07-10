import React from "react";

const ModalMensajeInformativo = ({ mostrar, tipo = "info", mensaje, onCerrar }) => {
  if (!mostrar) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content border-${tipo}`}>
          <div className={`modal-header bg-${tipo} text-white`}>
            <h5 className="modal-title">Mensaje</h5>
            <button type="button" className="btn-close" onClick={onCerrar}></button>
          </div>
          <div className="modal-body">
            <p>{mensaje}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCerrar}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMensajeInformativo;
