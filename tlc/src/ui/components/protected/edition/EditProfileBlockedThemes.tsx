import React, { FC } from "react";
interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfileBlockedThemes: FC<ProfileImageProps> = ({ user }) => {
  return <div> Temas bloqueados</div>;
};
