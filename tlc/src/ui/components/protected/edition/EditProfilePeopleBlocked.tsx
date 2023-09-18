import React, { FC } from "react";
interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfilePeopleBlocked: FC<ProfileImageProps> = ({ user }) => {
  return <div>Personas bloqueadas</div>;
};
