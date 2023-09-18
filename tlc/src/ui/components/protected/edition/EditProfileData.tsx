import React, { FC } from "react";

interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfileData: FC<ProfileImageProps> = ({ user }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">user</div>
      </div>
      <div className="row">
        <div className="col-12">alias</div>
      </div>
      <div className="row">
        <div className="col-12">Email</div>
      </div>
      <div className="row">
        <div className="col-12">Cambiar password</div>
      </div>
    </>
  );
};
