import React, { useState, useEffect } from "react";
import { renewToken } from "./Auth";

import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export const RenewToken: React.FC = () => {
  const [renewedToken, setRenewedToken] = useState<string | null>(null);

  useEffect(() => {
    const renewalInterval = setInterval(async () => {
      const token = await renewToken(getUserEmailFromToken());
      if (token) {
        setRenewedToken(token);
      } else {
        console.log("error renovando token");
      }
    }, 1800000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(renewalInterval);
    };
  }, []);

  const getUserEmailFromToken = () => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      return decodedToken.email || "";
    }
    return "";
  };

  return <div>{/* Contenido del dashboard */}</div>;
};
