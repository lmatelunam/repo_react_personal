// src/services/permisosService.js

const BASE_URL = "https://localhost:44317/api/";

// Obtener todos los perfiles
export const obtenerPerfiles = async () => {
  const resp = await fetch(`${BASE_URL}/perfiles`);

  if (!resp.ok) throw new Error("Error al obtener perfiles");
  return await resp.json();
};

// Obtener todos los permisos
export const obtenerPermisos = async () => {
  // const resp = await fetch(`${BASE_URL}/permisos`);
  // if (!resp.ok) throw new Error("Error al obtener permisos");
  // return await resp.json();
    return [
    { permiso_id: 1, nombre_permiso: "Ver reportes" },
    { permiso_id: 2, nombre_permiso: "Editar usuarios" }
  ];
};

// Obtener permisos por perfil
export const obtenerPermisosPorPerfil = async (perfilId) => {
  // const resp = await fetch(`${BASE_URL}/perfil/${perfilId}/permisos`);
  // if (!resp.ok) throw new Error("Error al obtener permisos del perfil");
  // return await resp.json();
  return perfilId === 1 ? [{ permiso_id: 1 }] : [];
};

// Actualizar permisos del perfil
export const actualizarPermisosPerfil = async (perfilId, permisos) => {
  // const resp = await fetch(`${BASE_URL}/perfil/${perfilId}/actualizar`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ permisos }),
  // });
  // return resp.ok;
  return true;
};
