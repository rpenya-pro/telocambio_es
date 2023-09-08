import process from "process";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { KJUR } from "jsrsasign";

interface Payload {
  email?: string;
  exp?: number;
}

export function useValidateToken() {
  const [isValid, setIsValid] = useState(null);

  const secretKey = "a1b2c3d4e5f67890abcdef1234567890";

  useEffect(() => {
    try {
      // Capturar el stored_email de las cookies
      const storedEmail = Cookies.get("stored_email");
      if (!storedEmail) {
        console.error("No se encontró el stored_email en las cookies");
        setIsValid(false);
        return;
      }

      // Obtener el token de las cookies
      const token = Cookies.get("authToken");

      if (!token) {
        console.error("No se encontró el token en las cookies");
        setIsValid(false);
        return;
      }

      const isValidToken = KJUR.jws.JWS.verify(token, secretKey, ["HS256"]);

      // Valida que email y stored_email sean iguales
      if (isValidToken) {
        setIsValid(true);
      } else {
        setIsValid(false);
        return;
      }

      // Decodifica el token para extraer el payload
      const decodedToken = KJUR.jws.JWS.parse(token);
      const payload: Payload = decodedToken.payloadObj;
      const email = payload.email;

      if (email != null) {
        console.log("El Email", email);
        console.log("Stored", storedEmail);
      }

      // Valida que email y stored_email sean iguales
      //TODO almacenar y recoger el email de cookies encryptado, actualmente está visibe
      if (email === storedEmail) {
        setIsValid(true);
      } else {
        setIsValid(false);
        return;
      }
    } catch (error) {
      console.error("Error validando el token:", error);
      setIsValid(false);
    }
  }, []);

  return isValid;
}
