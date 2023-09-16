import React, { createContext, useContext } from "react";
import { useAuthRegister } from "../hooks/useAuthRegister";

const AuthContext = createContext<boolean>(false);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const authRegister = useAuthRegister();
  console.log("authRegister", authRegister);
  const isAuthenticated =
    authRegister.isRegisteredUser || authRegister.isLoggedIn;

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};
