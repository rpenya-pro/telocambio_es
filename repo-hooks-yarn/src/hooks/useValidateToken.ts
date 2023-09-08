import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { KJUR } from "jsrsasign";

interface Payload {
  email?: string;
  exp?: number;
}

export function useValidateToken() {
  const [isValid, setIsValid] = useState(false);

  // ¡Nunca almacenes claves secretas directamente en el código!
  // Esto es solo un ejemplo, y deberías usar una solución más segura.
  const secretKey = "a1b2c3d4e5f67890abcdef1234567890";

  useEffect(() => {
    function validateToken() {
      try {
        // Capturar el stored_email de las cookies
        const storedEmail = Cookies.get("stored_email");
        if (!storedEmail) {
          console.error("No se encontró el stored_email en las cookies");
          return false;
        }

        // Obtener el token de las cookies
        const token = Cookies.get("authToken");
        if (!token) {
          console.error("No se encontró el token en las cookies");
          return false;
        }

        const isValidToken = KJUR.jws.JWS.verify(token, secretKey, ["HS256"]);
        if (!isValidToken) {
          return false;
        }

        // Decodifica el token para extraer el payload
        const decodedToken = KJUR.jws.JWS.parse(token);
        if (
          decodedToken.payloadObj &&
          typeof decodedToken.payloadObj === "object"
        ) {
          const payload: Payload = decodedToken.payloadObj;
          const email = payload.email;

          if (email != null) {
            console.log("El Email", email);
            console.log("Stored", storedEmail);
          }

          // Valida que email y stored_email sean iguales
          // TODO: almacenar y recoger el email de cookies encryptado, actualmente está visible
          return email === storedEmail;
        } else {
          console.error("El token decodificado no contiene un payload válido.");
          return false;
        }
      } catch (error) {
        console.error("Error validando el token:", error);
        return false;
      }
    }

    setIsValid(validateToken());
  }, []);

  return isValid;
}
