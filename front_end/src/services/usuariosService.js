const BASE_URL = "https://localhost:44317/api/usuarios";
const API_BASE = "https://localhost:44317"; // base del backend

export const obtenerUsuarios = async () => {
  const resp = await fetch(BASE_URL);

  if (!resp.ok) {
    throw new Error("Error al obtener usuarios");
  }
  const data = await resp.json(); // convierte la respuesta en JSON
  
  // Normalizar URLs de imagen si vienen como rutas relativas
  const dataNormalizada = data.map((usuario) => ({
    ...usuario,
    ImagenUrl: usuario.ImagenUrl?.startsWith("http")
      ? usuario.ImagenUrl
      : `${API_BASE}${usuario.ImagenUrl}`,
  }));

  console.log("dataNormalizada: ", dataNormalizada);
  return dataNormalizada;
};

export const obtenerUsuarioPorId = async (id) => {
  const resp = await fetch(`${BASE_URL}/${id}`);
  if (!resp.ok) throw new Error("Usuario no encontrado");

  const usuario = await resp.json();

  // Normalizar URL de imagen si viene como ruta relativa
  if (usuario.ImagenUrl && !usuario.ImagenUrl.startsWith("http")) {
    usuario.ImagenUrl = `${API_BASE}${usuario.ImagenUrl}`;
  }

  return usuario;
};

export const crearUsuario = async (usuario, esFormData = false) => {
  
  if (esFormData) {
    // usuario es FormData
    const resp = await fetch(`${BASE_URL}/GuardarUsuarioImagen`, {
      method: "POST",
      body: usuario,
    });
    
    if (!resp.ok) throw new Error("Error al crear usuario");
    return await resp.json();
  } else {
    // usuario es objeto JSON normal
    const usuarioParseado = {
      NombreUsuario: usuario.NombreUsuario,
      PasswordHash: usuario.Password,
      PerfilId: parseInt(usuario.PerfilId, 10),
      Estado: usuario.Estado,
    };

    const resp = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioParseado),
    });
    if (!resp.ok) throw new Error("Error al crear usuario");
    return await resp.json();
  }
};

export const actualizarUsuario = async (id, usuario, esFormData = false) => {
  if (esFormData) {
    const resp = await fetch(`${BASE_URL}/actualizarUsuarioImagen/${id}`, {
      method: "PUT",
      body: usuario, // FormData
    });
    if (!resp.ok) throw new Error("Error al actualizar usuario");
    return await resp.text();
  } else {
    const usuarioParseado = {
      UsuarioId: id,
      NombreUsuario: usuario.NombreUsuario,
      PasswordHash: usuario.Password,
      PerfilId: parseInt(usuario.PerfilId, 10),
      Estado: usuario.Estado,
      FechaActualizacion: new Date().toISOString(),
    };

    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioParseado),
    });
    if (!resp.ok) throw new Error("Error al actualizar usuario");
    return await resp.text();
  }
};

export const eliminarUsuario = async (id) => {
  const resp = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!resp.ok) throw new Error("Error al eliminar usuario");
  return await resp.text(); // "Usuario eliminado"
};

export const autenticarUsuario = async (nombreUsuario) => {
  console.log("nombreUsuario: ", nombreUsuario);

  const resp = await fetch(`${BASE_URL}/autenticar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ NombreUsuario: nombreUsuario }),
  });
  if (!resp.ok) {
    if (resp.status === 401) throw new Error("No autorizado");
    else throw new Error("Error al autenticar");
  }
  return await resp.json();
};
