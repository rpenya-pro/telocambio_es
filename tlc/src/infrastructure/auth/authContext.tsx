import { createContext } from "react";

import { Usuario } from "../../interfaces/user";

/**
 * Propiedades esperadas para el contexto de autenticación.
 */
interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  userData: Usuario | null;
}

/**
 * Contexto de autenticación que provee y consume información sobre el estado de la sesión.
 */
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
