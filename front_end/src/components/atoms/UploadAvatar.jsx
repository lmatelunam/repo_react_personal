import React, { useState } from "react";

const UploadAvatar = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onUpload(file); // Lo envías al componente padre
  };

  return (
    <div className="mb-3">
      <label className="form-label">Imagen de perfil</label>
      <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" className="mt-2" style={{ width: 100, height: 100, borderRadius: "50%" }} />}
    </div>
  );
};

export default UploadAvatar;
