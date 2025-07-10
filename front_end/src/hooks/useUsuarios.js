import { useState, useEffect } from "react";
import { obtenerUsuarios,
          crearUsuario,
          actualizarUsuario, } 
  from "../services/usuariosService";

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Guardar un usuario nuevo
  const guardarUsuario = async (usuario, esFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      // Usamos el servicio para crear usuario, adaptado para manejar FormData
      const nuevoUsuario = await crearUsuario(usuario, esFormData);
      setUsuarios((prev) => [...prev, nuevoUsuario]);
      return nuevoUsuario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Modificar un usuario existente
  const modificarUsuario = async (id, usuario, esFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      await actualizarUsuario(id, usuario, esFormData);

      if (!esFormData) {
        setUsuarios((prev) =>
          prev.map((u) =>
            u.UsuarioId === id ? { ...u, ...usuario } : u
          )
        );
      } else {
        // Si es FormData, recargamos lista entera (opcional, pero recomendado)
        await cargarUsuarios();
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { usuarios, 
            loading, 
            error, 
            recargar: cargarUsuarios,
            guardarUsuario,
            modificarUsuario };
};

export default useUsuarios;
