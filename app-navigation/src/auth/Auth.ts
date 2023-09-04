import Cookies from "js-cookie";
import users from "./users.json";
import { Usuario } from "../interfaces";

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export function authenticate(correo: string, password: string): AuthResponse {
  const user: Usuario | undefined = users.find(
    (u) => u.correo === correo && u.password === password
  );

  if (user) {
    // Simulamos un token JWT
    const token = btoa(`${user.correo}:${user.password}`);
    Cookies.set("authToken", token);
    return {
      success: true,
      token,
    };
  } else {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }
}

export function isAuthenticated(): boolean {
  const token = Cookies.get("authToken");
  return Boolean(token);
}

export function logout(): void {
  Cookies.remove("authToken");
  window.location.href = "http://localhost:9000/";
}
