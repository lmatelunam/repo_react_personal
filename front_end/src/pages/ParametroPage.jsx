import React from 'react';
import BotonesOrganismo from '../components/organisms/BotonesOrganismo';

const ParametrosPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Parámetros</h2>

      <div className="accordion" id="accordionParametros">
        {/* Sección 1: Botones */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingUno">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUno"
              aria-expanded="true"
              aria-controls="collapseUno"
            >
              Botones
            </button>
          </h2>
          <div
            id="collapseUno"
            className="accordion-collapse collapse show"
            aria-labelledby="headingUno"
          >
            <div className="accordion-body">
              <BotonesOrganismo/>
            </div>
          </div>
        </div>

        {/* Sección 2: Permisos */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingDos">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseDos"
              aria-expanded="false"
              aria-controls="collapseDos"
            >
              Permisos
            </button>
          </h2>
          <div
            id="collapseDos"
            className="accordion-collapse collapse"
            aria-labelledby="headingDos"
          >
            <div className="accordion-body">
              Aquí va el contenido de <strong>PermisosOrganismo</strong>.
            </div>
          </div>
        </div>

        {/* Sección 3: Asociaciones */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTres">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTres"
              aria-expanded="false"
              aria-controls="collapseTres"
            >
              Perfil - Botón
            </button>
          </h2>
          <div
            id="collapseTres"
            className="accordion-collapse collapse"
            aria-labelledby="headingTres"
          >
            <div className="accordion-body">
              Aquí va el contenido de <strong>PerfilBotonOrganismo</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParametrosPage;
