import { FC } from "react";
import CustomButton from "../../CustomButton";

import { useProfileActions } from "../../../../services/useProfileActions";

interface ProfileImageProps {
  user: string | undefined;
  privateProfile: boolean;
  freezeProfile: boolean;
}

export const EditProfileAccountShow: FC<ProfileImageProps> = ({
  user,
  privateProfile,
  freezeProfile,
}) => {
  const { togglePrivateProfile, toggleFreezeProfile, handleDeleteUser } =
    useProfileActions();

  if (!user) return null;

  return (
    <div className="row edition mt-5">
      <div className="col-md-12">
        <div className="edition__preferences-title mb-4">
          <strong>Gestión del perfil</strong>
        </div>
        <div className="row mb-1">
          <div className="col-12">
            <table className="table custom-border globals">
              <tbody>
                <tr>
                  <td className="col-9 align-middle">
                    Ocultar perfil
                    <p className="small sans-serif">
                      El perfil seguirá activo, nadie podrá verlo, pero sí
                      enviarte propuestas.
                    </p>
                  </td>
                  <td className="bordered-cell col-3  align-middle">
                    <CustomButton
                      fontSize="14px"
                      height="40px"
                      onClick={() => togglePrivateProfile(user, privateProfile)}
                    >
                      {privateProfile ? "Desocultar" : "Ocultar"}
                    </CustomButton>
                  </td>
                </tr>
                <tr>
                  <td className="col-9 align-middle">
                    Congelar perfil
                    <p className="small sans-serif">
                      Tu perfil quedará oculto y nadie podrá enviarte porpuestas
                      ni ver tu contenido.
                    </p>
                  </td>

                  <td className="bordered-cell col-3  align-middle">
                    <CustomButton
                      fontSize="14px"
                      height="40px"
                      onClick={() => toggleFreezeProfile(user, freezeProfile)}
                    >
                      {freezeProfile ? "Reactivar" : "Congelar"}
                    </CustomButton>
                  </td>
                </tr>
                <tr>
                  <td className="col-9 align-middle">
                    Eliminar cuenta
                    <p className="small sans-serif">
                      Tu cuenta quedará definitivamente eliminada y tus datos
                      borrados.
                    </p>
                  </td>

                  <td className="bordered-cell col-3  align-middle">
                    <CustomButton
                      fontSize="14px"
                      height="40px"
                      onClick={() => handleDeleteUser(user)} // Asegúrate de tener el identificador del usuario disponible
                    >
                      Eliminar
                    </CustomButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
