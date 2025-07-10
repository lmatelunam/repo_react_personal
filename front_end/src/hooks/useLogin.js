// src/hooks/useLogin.js
import { useState } from "react";
import { autenticarUsuario } from "../services/usuariosService";

const API_BASE = "https://localhost:44317"; // puedes luego mover esto a una variable de entorno

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (nombreUsuario, clave) => {
        setError(null);
        setIsLoading(true);

        try {
            const data = await autenticarUsuario(nombreUsuario);

            // Comparamos la clave manualmente si viene desde la BD
            if (data.PasswordHash !== clave) {
                setError("Clave incorrecta");
                return false;
            }

            // ✅ Normalizar la URL de la imagen
            if (data.ImagenUrl && !data.ImagenUrl.startsWith("http")) {
                data.ImagenUrl = `${API_BASE}${data.ImagenUrl}`;
            }

            setUsuario(data);
            // console.log("localStorage: ",JSON.stringify(data));

            localStorage.setItem("usuario", JSON.stringify(data));
            return true;

        } catch (err) {
            setError(err.message || "Error de autenticación");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { usuario, login, error, isLoading };
};
