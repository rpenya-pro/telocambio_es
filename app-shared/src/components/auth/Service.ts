import Cookies from "js-cookie";
import axios from "axios";
import process from "process";
import { KJUR, KEYUTIL } from "jsrsasign";

interface Payload {
  email?: string;
  exp?: number;
}

export function isAuthenticated(): boolean {
  const token = Cookies.get("authToken");
  return Boolean(token);
}

export function logout(): void {
  Cookies.remove("authToken");
}

/**
 * VALIDATE TOKEN
 * @param token
 * @param userEmail
 * @returns
 */
export function validateToken(userEmail) {
  try {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No se encontró el token en las cookies");
      return false;
    }

    // Valida el token con jsrsasign y la clave secreta
    const isValid = KJUR.jws.JWS.verifyJWT(
      token,
      process.env.REACT_APP_JWT_SECRET,
      {
        alg: ["HS256"],
      }
    );

    if (!isValid) {
      console.error("Token inválido o expirado");
      return false;
    }

    // Decodifica el token para extraer el payload
    const decodedToken = KJUR.jws.JWS.parse(token);

    // Aquí puedes acceder al payload decodificado
    const payload: Payload = decodedToken.payloadObj;

    const { email, exp } = payload;

    const now = Math.floor(Date.now() / 1000);
    if (exp && exp < now) {
      console.error("Token ha expirado");
      return false;
    }

    if (!email) {
      console.error("Token no contiene email");
      return false;
    }

    if (email != userEmail) {
      console.error("Token no coinciden los mails");
      return false;
    }

    // En este punto, el token es válido y has accedido al email y la fecha de expiración
    // Puedes retornar true o el payload dependiendo de tus necesidades
    return true;
  } catch (error) {
    console.error("Error validando el token:", error);
    return false;
  }
}
