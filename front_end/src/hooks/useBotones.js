import { useState, useEffect } from "react";
import {
  obtenerBotones,
  crearBoton,
  actualizarBoton,
  eliminarBoton,
} from "../services/botonesServices";

export default function useBotones() {
  const [botones, setBotones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarBotones = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerBotones();

      setBotones(data);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBotones();
  }, []);

  const guardarBoton = async (boton) => {
    console.log(boton);
    setLoading(true);
    setError(null);
    try {
      const nuevo = await crearBoton(boton);
      setBotones((prev) => [...prev, nuevo]);
      return nuevo;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const modificarBoton = async (id, boton) => {
    setLoading(true);
    setError(null);
    try {
      await actualizarBoton(id, boton);
      setBotones((prev) =>
        prev.map((b) => (b.BotonId === id ? { ...b, ...boton } : b))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarBotonPorId = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarBoton(id);
      setBotones((prev) => prev.filter((b) => b.BotonId !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    botones,
    loading,
    error,
    recargar: cargarBotones,
    guardarBoton,
    modificarBoton,
    eliminarBoton: eliminarBotonPorId,
  };
}
