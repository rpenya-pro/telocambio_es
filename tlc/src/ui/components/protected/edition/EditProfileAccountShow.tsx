import React, { FC } from "react";
interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfileAccountShow: FC<ProfileImageProps> = ({ user }) => {
  return <div>Ocultar perfil, eliminar cuenta, congelar perfil</div>;
};
