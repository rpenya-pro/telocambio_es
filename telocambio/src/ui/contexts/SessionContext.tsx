import Cookies from "js-cookie";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SessionContextData {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextData | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return !!Cookies.get("access_token");
  });

  const login = () => setIsLogged(true);
  const logout = () => {
    Cookies.remove("access_token");
    setIsLogged(false);
  };

  useEffect(() => {
    // Si necesitas realizar alguna acción cuando `isLogged` cambie, puedes hacerlo aquí
  }, [isLogged]);

  return (
    <SessionContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
