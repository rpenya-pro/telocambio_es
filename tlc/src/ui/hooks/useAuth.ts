import { useContext } from "react";
import { AuthContext } from "../../infrastructure/auth/authContext";

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * @throws {Error} Si se intenta usar fuera del `AuthProvider`.
 * @returns {AuthContextProps} Propiedades del contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
