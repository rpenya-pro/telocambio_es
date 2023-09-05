import axios from "axios";
import Swal from "sweetalert2";

import Cookies from "js-cookie";
import process from "process";
import { KJUR, KEYUTIL } from "jsrsasign";
import { User } from "../models"; // Importa el modelo de usuario
import { UserDocument } from "../interfaces"; // Importa la interfaz del usuario

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

const privateKey = process.env.JWT_SECRET;

export async function registerUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  Cookies.remove("authToken");

  try {
    const response = await axios.post(`${apiUrl}/user/register`, {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: "User successfully registered",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Registration failed",
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario ya existe, prueba con otro e-mail!",
      });
      return {
        success: false,
        message: "El usuario ya existe, prueba con otro e-mail",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

/**
 * AUTHENTICATE
 * @param email
 * @param password
 * @returns
 */
export async function authenticate(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${apiUrl}/user/login`, {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      const token = response.data.access_token;
      Cookies.set("authToken", token);

      return {
        success: true,
        token,
      };
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Los datos de autenticación no parecen correctos",
      });
      return {
        success: false,
        message: response.data.message || "Authentication failed",
      };
    }
  } catch (error) {
    console.error("Error while authenticating", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export function isAuthenticated(): boolean {
  const token = Cookies.get("authToken");
  return Boolean(token);
}

export function logout(): void {
  Cookies.remove("authToken");
}

export async function renewToken(email: string): Promise<string | null> {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/renew`,
      {
        email: email,
      }
    );
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Error renewing token:", error);
    // Manejar el error, como mostrar un mensaje al usuario
    return null;
  }
}
