const BASE_URL = "https://localhost:44317/api/botones";

// Obtener todos los botones
export const obtenerBotones = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener botones");

  // Lee una sola vez el body como JSON
  const data = await res.json();
    // Muestra los datos reales recibidos
  console.log("Datos desde el backend:", data);

  return data;
};

// Crear un nuevo botón
export const crearBoton = async (boton) => {
    const botonParseado = {
        BotonId: boton.BotonId,
        NombreBoton: boton.NombreBoton, 
        Descripcion: boton.Descripcion,
    };

  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(botonParseado),
  });

  if (!res.ok) throw new Error("Error al crear botón");
  return await res.json(); // Asume que retorna el botón creado o su ID
};

// Actualizar un botón existente
export const actualizarBoton = async (id, boton) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boton),
  });

  if (!res.ok) throw new Error("Error al actualizar botón");
};

// Eliminar un botón por ID
export const eliminarBoton = async (id) => {
    console.log("id: ", id);
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar botón");
};