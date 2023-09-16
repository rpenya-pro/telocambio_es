import { useEffect } from "react";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Hook personalizado para renovar el token de acceso automáticamente.
 * Este hook intenta renovar el token de acceso cada 50 minutos.
 * Si la renovación es exitosa, actualiza la cookie del token de acceso.
 * Si la renovación falla o no se obtiene un token en la respuesta, se ejecuta la función de logout.
 *
 * @param logout - Una función que se ejecutará si la renovación del token falla.
 */
const useRenewToken = (logout: () => void) => {
  useEffect(() => {
    /**
     * Función asíncrona para renovar el token de acceso.
     */
    const renewToken = async () => {
      try {
        const response = await fetch(`${API_URL}/user/renew`);
        const data = await response.json();

        if (data.token) {
          Cookies.set("access_token", data.token);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error al renovar el token: ", error);
        logout();
      }
    };

    const renewInterval = 50 * 60 * 1000;
    const renewTimer = setTimeout(renewToken, renewInterval);

    return () => clearTimeout(renewTimer);
  }, [logout]);
};

export default useRenewToken;
