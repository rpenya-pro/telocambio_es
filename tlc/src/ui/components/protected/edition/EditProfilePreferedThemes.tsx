import React, { FC } from "react";
interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfilePreferedThemes: FC<ProfileImageProps> = ({ user }) => {
  return <div>Temas preferidos</div>;
};
