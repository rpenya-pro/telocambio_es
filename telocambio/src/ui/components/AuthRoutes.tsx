import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { validateToken } from "../../infrastructure/auth/tokenService";
import React from "react";

function AuthRoutes() {
  const { isLogged } = useSession();

  // Obtiene el token desde donde lo estás almacenando, por ejemplo localStorage
  const token = localStorage.getItem("token");

  const isTokenValid = token && validateToken(token); // Verifica el token

  // Comprueba si el usuario está autenticado y si el token es válido
  return isLogged && isTokenValid ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
