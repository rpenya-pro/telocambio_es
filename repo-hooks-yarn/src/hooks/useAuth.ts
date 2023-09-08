import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { KJUR, KEYUTIL } from "jsrsasign";
import { useService } from "../services";

type AuthResult = {
  success: boolean;
  message?: string;
};

export const useAuth = () => {
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);
  const { register, login } = useService();

  const handleRegister = async (email: string, password: string) => {
    const result = await register(email, password); // Llama a la función de registro desde useService

    if (result.success) {
      setAuthResult(result);
    } else {
      setAuthResult(result);
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: result.message || "Ocurrió un error durante el registro.",
      });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password); // Llama a la función de inicio de sesión desde useService

    if (result.success) {
      setAuthResult(result);
    } else {
      setAuthResult(result);
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: result.message || "Ocurrió un error durante el inicio de sesión.",
      });
    }
  };

  const renew = async (email: string) => {
    try {
      const response = await axios.post(`http://localhost:9000/renew`, {
        email: email,
      });
      const { access_token } = response.data;
      return access_token;
    } catch (error) {
      console.error("Error renewing token:", error);
      return null;
    }
  };

  return {
    authResult,
    register,
    login,
    renew,
  };
};
