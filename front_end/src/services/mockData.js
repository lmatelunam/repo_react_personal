// src/services/mockData.js

export const perfilesMock = [
  { perfil_id: 1, nombre_perfil: "Administrador", descripcion: "Perfil con todos los permisos" },
  { perfil_id: 2, nombre_perfil: "Usuario", descripcion: "Perfil estándar" },
];

export const permisosMock = [
  { permiso_id: 1, nombre_permiso: "Ver Usuarios", descripcion: "Puede ver usuarios" },
  { permiso_id: 2, nombre_permiso: "Editar Usuarios", descripcion: "Puede editar usuarios" },
  { permiso_id: 3, nombre_permiso: "Eliminar Usuarios", descripcion: "Puede eliminar usuarios" },
];

export const permisosPorPerfilMock = {
  1: [ // Admin
    { permiso_id: 1 },
    { permiso_id: 2 },
    { permiso_id: 3 },
  ],
  2: [ // Usuario
    { permiso_id: 1 },
  ],
};
