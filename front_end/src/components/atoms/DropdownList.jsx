// src/components/atoms/DropdownList.jsx
import React from "react";

const DropdownList = ({ label, value, onChange, options = [], disabled = false, id }) => {
  return (
    <div className="mb-3">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">-- Seleccione --</option>
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownList;
