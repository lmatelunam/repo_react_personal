const API_URL = "https://localhost:44317/api/perfiles"; // Ajusta si es necesario

export const obtenerPerfiles = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("No se pudieron obtener los perfiles");
  }
  return await response.json();
};

export const guardarPerfilApi = async (perfil) => {
const metodo = perfil.PerfilId && perfil.PerfilId > 0 ? "PUT" : "POST";
const url = metodo === "PUT" ? `${API_URL}/${perfil.PerfilId}` : API_URL;

console.log("Enviando a API:", perfil);

  const response = await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
                PerfilId: perfil.PerfilId || 0,
                NombrePerfil: perfil.NombrePerfil,
                Descripcion: perfil.Descripcion,
                        }),
  });

  if (!response.ok) {
    throw new Error("No se pudo guardar el perfil");
  }

  return await response.json();
};
