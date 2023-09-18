import { useEffect } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "../infrastructure/api/axios";
import Swal from "sweetalert2";

const useRenewToken = (logout: () => void) => {
  useEffect(() => {
    /**
     * Función asíncrona para renovar el token de acceso.
     */
    const renewToken = async () => {
      try {
        const { data } = await axiosInstance.post("/user/renew", {
          email: "userEmail@example.com",
        });

        if (data.access_token) {
          Cookies.set("access_token", data.access_token);
        } else {
          logout();
          // Aquí emitirías el SweetAlert
          Swal.fire("Error", "No se pudo renovar el token de acceso", "error");
        }
      } catch (error) {
        console.error("Error al renovar el token: ", error);
        logout();
        Swal.fire(
          "Error",
          "Ocurrió un error al renovar el token de acceso",
          "error"
        );
      }
    };

    const renewInterval = 50 * 60 * 1000;
    const renewTimer = setTimeout(renewToken, renewInterval);

    return () => clearTimeout(renewTimer);
  }, [logout]);
};

export default useRenewToken;
