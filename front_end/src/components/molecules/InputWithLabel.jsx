import Input from "../atoms/Input";

const InputWithLabel = ({ label, type, placeholder, value, onChange, className }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

export default InputWithLabel;