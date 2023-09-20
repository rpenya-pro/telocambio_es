import { FC } from "react";
interface ProfileImageProps {
  user: string | undefined;
}

export const EditProfilePreferences: FC<ProfileImageProps> = ({ user }) => {
  console.log(user);
  return (
    <div className="row mt-5 mb-5">
      <div className="col-md-12">
        <div className="edition__preferences-title mb-4">
          <strong>Preferencias de la aplicación</strong>
        </div>
        <div className="edition__preferences-content">
          Preferencias de la aplicación
        </div>
      </div>
    </div>
  );
};
