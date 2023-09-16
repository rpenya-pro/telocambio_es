import verify from "idtoken-verifier";

export const validateToken = (token: any): any => {
  try {
    const tokenInfo = verify(token);

    // Token válido
    return tokenInfo;
  } catch (error) {
    console.error("Error al validar el token:", error);
    throw new Error("Token inválido");
  }
};
