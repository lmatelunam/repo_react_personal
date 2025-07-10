import { useState } from "react";

const PasswordInput = ({ label, value, onChange, name, placeholder }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <div className="input-group">
        <input
          type={mostrar ? "text" : "password"}
          className="form-control"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setMostrar((prev) => !prev)}
          tabIndex={-1}
        >
          <i className={`bi ${mostrar ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
