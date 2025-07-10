import { useState, useEffect } from "react";
import { obtenerPerfiles, guardarPerfilApi } from "../services/perfilesService";

const usePerfiles = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarPerfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerPerfiles();
      setPerfiles(data);
    } catch (err) {
      setError(err.message || "Error al cargar perfiles");
    } finally {
      setLoading(false);
    }
  };

  const guardarPerfil = async (perfil) => {
    try {
      await guardarPerfilApi(perfil);
    } catch (err) {
      console.error("Error al guardar el perfil:", err);
      throw err;
    }
  };

  useEffect(() => {
    cargarPerfiles();
  }, []);

  return {
    perfiles,
    loading,
    error,
    recargar: cargarPerfiles,
    guardarPerfil,
  };
};

export default usePerfiles;
