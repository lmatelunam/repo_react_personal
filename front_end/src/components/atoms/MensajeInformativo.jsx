// src/components/atoms/MensajeInformativo.jsx
import React from "react";

const MensajeInformativo = ({ tipo = "info", children, onClose }) => {
  // tipo puede ser: info, success, warning, danger (correspondiente a bootstrap alert-*)
  return (
    <div className={`alert alert-${tipo} alert-dismissible fade show`} role="alert">
      {children}
      {onClose && (
        <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
      )}
    </div>
  );
};

export default MensajeInformativo;
