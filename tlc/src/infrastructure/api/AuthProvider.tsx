import Cookies from "js-cookie";
import { ReactNode, useState, useEffect } from "react";
import Swal from "sweetalert2"; // <-- Importamos SweetAlert2
import { Usuario } from "../../interfaces/user";
import useRenewToken from "../../services/useRenewToken";
import { AuthContext } from "../auth/authContext";
import { base64UrlDecoded } from "../helpers/base64UrlDecoded";
import { isExpired } from "react-jwt";

/**
 * Propiedades esperadas para el proveedor de autenticación.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor de autenticación que encapsula toda la lógica de autenticación y
 * renueva automáticamente el token de acceso.
 * @param children - Componentes hijos que serán envueltos por el proveedor.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<Usuario | null>(null);
  // const [isValid, setIsValid] = useState(false);

  /**
   * Cierra la sesión del usuario y elimina el token.
   */
  const logout = (showAlert = false) => {
    Cookies.remove("access_token");
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);

    if (showAlert) {
      Swal.fire({
        title: "Sesión finalizada",
        text: "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }
  };

  /**
   * Efecto para verificar la validez del token al montar el componente.
   */
  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      const isMyTokenExpired = isExpired(token);

      //  setIsValid(!isMyTokenExpired); // Cambiar la posición de esta línea para que se ejecute antes de las condiciones

      if (isMyTokenExpired) {
        // Sólo comprueba si el token ha expirado
        console.error("Token inválido o expirado.");
        logout(true); // <-- Aquí especificamos que queremos mostrar el SweetAlert
      } else {
        setIsAuthenticated(true);
        const payloadStr = base64UrlDecoded(token.split(".")[1]);
        const payload = JSON.parse(payloadStr);
        setUserData(payload);
      }
    }
    setIsLoading(false);
  }, []);

  useRenewToken(logout);

  /**
   * Inicia la sesión del usuario.
   */
  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, isLoading, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
