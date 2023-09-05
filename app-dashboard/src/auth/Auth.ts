import Cookies from "js-cookie";
import axios from "axios";
import process from "process";
import { KJUR, KEYUTIL } from "jsrsasign";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
interface Payload {
  email?: string;
  exp?: number;
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

export function isAuthenticated(): boolean {
  const token = Cookies.get("authToken");
  return Boolean(token);
}

export function logout(): void {
  Cookies.remove("authToken");
}
