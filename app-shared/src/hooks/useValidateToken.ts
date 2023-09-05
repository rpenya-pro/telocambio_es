import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { KJUR } from "jsrsasign";
import { validateToken } from "../components/auth/Service";

interface Payload {
  email?: string;
  exp?: number;
  // otras propiedades que podrían estar en el payload
}

export function useValidateToken() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    try {
      // Obtener el token de las cookies
      const token = Cookies.get("authToken");
      if (!token) {
        console.error("No se encontró el token en las cookies");
        setIsValid(false);
        return;
      }

      // Decodifica el token para extraer el payload
      const decodedToken = KJUR.jws.JWS.parse(token);
      const payload: Payload = decodedToken.payloadObj;
      const { email, exp } = payload;

      // Si el correo electrónico no está presente en el token, algo salió mal.
      if (!email) {
        console.error("Token no contiene email");
        setIsValid(false);
        return;
      }

      // Verificar si el token ha expirado
      const now = Math.floor(Date.now() / 1000);
      if (exp && exp < now) {
        console.error("Token ha expirado");
        setIsValid(false);
        return;
      }

      // Usar la función validateToken para validar el token
      const validationResult = validateToken(email);
      setIsValid(validationResult);
    } catch (error) {
      console.error("Error validando el token:", error);
      setIsValid(false);
    }
  }, []);

  return isValid;
}
