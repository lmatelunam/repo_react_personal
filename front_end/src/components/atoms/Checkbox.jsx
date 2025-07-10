// src/components/atoms/Checkbox.jsx
import React from "react";

const Checkbox = ({ label, checked, onChange, id, disabled = false }) => {
  return (
    <div className="form-check mb-2">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
