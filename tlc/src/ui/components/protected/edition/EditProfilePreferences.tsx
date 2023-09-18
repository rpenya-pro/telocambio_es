import React, { FC } from "react";
interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfilePreferences: FC<ProfileImageProps> = ({ user }) => {
  return <div>Preferencias de la aplicación</div>;
};
