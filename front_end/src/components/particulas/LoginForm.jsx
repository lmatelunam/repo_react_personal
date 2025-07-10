// src/components/particulas/LoginForm.jsx
import { useState } from "react";

const LoginForm = ({ onLogin, error, isLoading }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(usuario, clave);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ minWidth: '300px', maxWidth: '400px', width: '100%' }}>
        
        {/* Avatar sin imagen */}
        <div className="mb-3 d-flex justify-content-center">
          <div
            style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#dee2e6",  // gris claro (Bootstrap light)
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6c757d",            // gris más oscuro (Bootstrap secondary)
                fontSize: "2rem",
                userSelect: "none",
              }}
            title="LogoEmpresa"
          >
            <i className="bi bi-hourglass-split"></i>
          </div>
        </div>

        <h4 className="mb-4 text-center">Acceso al sistema</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="clave" className="form-label">Clave</label>
            <div className="input-group">
              <input
                type={mostrarClave ? 'text' : 'password'}
                className="form-control"
                id="clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
              />
              <span className="input-group-text" onClick={() => setMostrarClave(!mostrarClave)} style={{ cursor: 'pointer' }}>
                <i className={`bi ${mostrarClave ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </span>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Acceder</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
