// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "teloc-hooks";

type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
};

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { authResult, login } = useAuth(); // Utiliza tu hook useAuth

  const authState: AuthState = {
    isAuthenticated: !!authResult?.success, // Puedes ajustar esta lógica según tu necesidad
    loading: authResult === null,
  };

  // Agrega un console.log para ver el estado de autenticación
  useEffect(() => {
    console.log("Auth State:", authState);
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
