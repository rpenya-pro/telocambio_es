import { useState, useEffect } from "react";
import { KJUR } from "jsrsasign";
import Cookies from "js-cookie";

// Definimos la estructura del payload
interface TokenPayload {
  _id?: string;
  email?: string;
}

export function useGetPayloadFromToken() {
  const [payload, setPayload] = useState<TokenPayload | null>(null);

  useEffect(() => {
    try {
      const token = Cookies.get("authToken");

      if (!token) {
        console.error("No se encontró el token en las cookies");
        setPayload(null);
        return;
      }

      const decodedToken = KJUR.jws.JWS.parse(token);
      const payloadFromToken: TokenPayload = decodedToken.payloadObj;

      setPayload(payloadFromToken);
    } catch (error) {
      console.error("Error al capturar o decodificar el token:", error);
      setPayload(null);
    }
  }, []);

  return payload || {}; // Devuelve un objeto vacío si payload es nulo
}
