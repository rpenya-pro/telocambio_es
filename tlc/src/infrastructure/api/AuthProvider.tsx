import { KJUR } from "jsrsasign";
import Cookies from "js-cookie";
import { ReactNode, useState, useEffect } from "react";
import { Usuario } from "../../interfaces/user";
import useRenewToken from "../../services/useRenewToken";
import { AuthContext } from "../auth/authContext";
import { base64UrlDecoded } from "../helpers/base64UrlDecoded";

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
  /**
   * Cierra la sesión del usuario y elimina el token.
   */
  const logout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  /**
   * Efecto para verificar la validez del token al montar el componente.
   */
  useEffect(() => {
    const token = Cookies.get("access_token");
    const sKey = import.meta.env.VITE_JWS_SECRET_KEY || "";

    if (token) {
      const isValid = KJUR.jws.JWS.verifyJWT(token, sKey, { alg: ["HS256"] });
      if (!isValid) {
        console.error("Token inválido.");
        logout();
      } else {
        setIsAuthenticated(true);
      }
    }

    if (token && KJUR.jws.JWS.verifyJWT(token, sKey, { alg: ["HS256"] })) {
      const payloadStr = base64UrlDecoded(token.split(".")[1]);
      const payload = JSON.parse(payloadStr);
      setUserData(payload);
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
