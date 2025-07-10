const Input = ({ type = "text", placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      className={`form-control ${className || ""}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;