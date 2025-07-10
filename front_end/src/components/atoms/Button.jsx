// src/components/atoms/Button.jsx
import React from "react";

const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {
  const className = `btn btn-${variant}`;
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
