import { useState } from "react";

const useModal = () => {
  const [mostrar, setMostrar] = useState(false);

  const abrir = () => setMostrar(true);
  const cerrar = () => setMostrar(false);

  return { mostrar, abrir, cerrar };
};

export default useModal;
