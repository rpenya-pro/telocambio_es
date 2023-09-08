import React, { useEffect, useState } from "react";
import { useGetPayloadFromToken } from "teloc-hooks";

interface Parametros {
  dashConsole: boolean;
  isValid: boolean;
}

interface VisorProps {
  parametros: Parametros;
}

const Visor: React.FC<VisorProps> = ({ parametros }) => {
  const payload = useGetPayloadFromToken();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    setIsAuth(payload ? true : false);
  }, [payload]);

  return parametros.dashConsole ? (
    <div className="visor">
      <div
        className="alert alert-primary alert-dismissible fade show"
        role="alert"
      >
        <p>
          {isAuth ? (payload?._id, payload?.email, "Autenticación True") : null}
        </p>
        <p>
          {parametros.isValid
            ? "El token es válido."
            : "El token no es válido."}
        </p>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  ) : null;
};

export default Visor;
