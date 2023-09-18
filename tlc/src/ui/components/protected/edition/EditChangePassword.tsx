import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useChangePassword } from "../../../../services/useChangePassword";

export const EditChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useChangePassword();

  const { userData } = useAuth(); // Para obtener los datos del usuario actual, si es necesario
  console.log(userData?.password);
  const handlePasswordChange = async () => {
    if (!currentPassword) {
      alert("Por favor, introduce tu contraseña actual.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 6) {
      alert("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Validar el password actual con el servidor...
    // Dependiendo de tu backend, puedes necesitar hacer esto en otro lugar o de otra manera

    mutation.mutate({ currentPassword, newPassword });
  };

  const handleCurrentPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 mb-2 small">
          Puedes cambiar tu password a continuación:
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2 small">
          <label htmlFor="currentPassword">Escribe tu password actual:</label>
          <div className="input-icon-container">
            <input
              id="currentPassword"
              className="form-control"
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
            {/* No agregamos el icono de cambio aquí porque no estamos verificando un valor original */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2">
          <label htmlFor="newPassword">Escribe el nuevo password:</label>
          <div className="input-icon-container">
            <input
              id="newPassword"
              className="form-control"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {/* No agregamos el icono de cambio aquí porque no estamos verificando un valor original */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2">
          <label htmlFor="confirmPassword">Repite el nuevo password:</label>
          <div className="input-icon-container">
            <input
              id="confirmPassword"
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {/* No agregamos el icono de cambio aquí porque no estamos verificando un valor original */}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-2">
          <button onClick={handlePasswordChange}>Cambiar contraseña</button>
          {mutation.isError ? <div>Error al cambiar contraseña</div> : null}
          {mutation.isSuccess ? (
            <div>Contraseña cambiada exitosamente</div>
          ) : null}
        </div>
      </div>
    </>
  );
};
