import { FC, useState } from "react";

import { useChangePassword } from "../../../../services/useChangePassword";
import Swal from "sweetalert2";
import CustomButton from "../../CustomButton";

interface PropsChange {
  idUser: string | undefined;
}

export const EditChangePassword: FC<PropsChange> = ({ idUser }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useChangePassword({
    onSuccess: () => {},
    onError: (error: any) => {
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al cambiar la contraseña"
      );
    },
    onSettled: () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
  });

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "¡ERROR!",
        text: "La nueva contraseña no coincide con el campo Repite el nuevo password.",
        icon: "error",
      });
      return;
    }
    if (newPassword.length < 6) {
      Swal.fire({
        title: "¡ERROR!",
        text: "La nueva contraseña debe tenerl al menos 6 carácteres.",
        icon: "error",
      });
      return;
    }

    mutation.mutate({ _id: idUser, currentPassword, newPassword });
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
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
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
              onChange={(e) => setNewPassword(e.target.value)}
            />
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2 globals mt-3">
          <CustomButton
            fontSize="16px"
            padding="4px 10px"
            height="40px"
            onClick={handlePasswordChange}
          >
            Cambiar contraseña
          </CustomButton>
          {mutation.isLoading && <div>Cambiando contraseña...</div>}
        </div>
      </div>
    </>
  );
};
