import React, { FC, useEffect, useState } from "react";
import { Usuario } from "../../../../interfaces/user";
import { verifyIcon } from "../../../../assets/images";
import ErrorBoundary from "../../ErrorBoundary";
import { EditChangePassword } from "./EditChangePassword";
import useUpdateData from "../../../../services/useUpdateData";

interface ProfileImageProps {
  usuario: Usuario | undefined;
}

export const EditProfileData: FC<ProfileImageProps> = ({ usuario }) => {
  // Estados de los inputs
  const [firstName, setFirstName] = useState(usuario?.firstName || "");
  const [lastName, setLastName] = useState(usuario?.lastName || "");
  const [slug, setSlug] = useState(usuario?.slug || "");
  const [email, setEmail] = useState(usuario?.email || "");

  // Estados que determinan si un campo fue modificado
  const [isFirstNameChanged, setIsFirstNameChanged] = useState(false);
  const [isLastNameChanged, setIsLastNameChanged] = useState(false);
  const [isSlugChanged, setIsSlugChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const mutation = useUpdateData();

  const handleSaveChanges = (field: keyof Usuario) => {
    let dataToUpdate: Partial<Usuario> = {
      _id: usuario?._id,
    };

    switch (field) {
      case "firstName":
        dataToUpdate.firstName = firstName;
        break;
      case "lastName":
        dataToUpdate.lastName = lastName;
        break;
      case "slug":
        dataToUpdate.slug = slug;
        break;
      case "email":
        dataToUpdate.email = email;
        break;
      default:
        break;
    }

    mutation.mutate(dataToUpdate as Usuario);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setIsFirstNameChanged(false);
        setIsLastNameChanged(false);
        setIsSlugChanged(false);
        setIsEmailChanged(false);
      }, 2000);

      // Limpia el temporizador en caso de desmontaje
      return () => {
        clearTimeout(timer);
      };
    }
  }, [mutation.isSuccess]);

  return (
    <ErrorBoundary>
      <div className="row">
        <div className="col-12">
          {showSuccessMessage && (
            <div className="greencolor">Datos actualizados!</div>
          )}
          {mutation.isLoading && <div>Actualizando...</div>}
          {mutation.isError && <div>Error: {mutation.error.message}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-2">
          <label className="d-flex justify-content-between" htmlFor="firstName">
            <div>Nombre</div>
          </label>
          <div className="input-icon-container">
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setIsFirstNameChanged(usuario?.firstName !== e.target.value);
              }}
              onBlur={() => {
                if (isFirstNameChanged) {
                  handleSaveChanges("firstName");
                }
              }}
            />
            {isFirstNameChanged && (
              <img src={verifyIcon} alt="icono" className="input-icon" />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2">
          <label className="d-flex justify-content-between" htmlFor="lastName">
            <div>Apellidos</div>
          </label>
          <div className="input-icon-container">
            <input
              type="text"
              value={lastName}
              className="form-control"
              onChange={(e) => {
                setLastName(e.target.value);
                setIsLastNameChanged(usuario?.lastName !== e.target.value);
              }}
              onBlur={() => {
                if (isLastNameChanged) {
                  handleSaveChanges("lastName");
                }
              }}
            />
            {isLastNameChanged && (
              <img src={verifyIcon} alt="icono" className="input-icon" />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2">
          <label className="d-flex justify-content-between" htmlFor="slug">
            <div>Alias</div>
          </label>
          <div className="input-icon-container">
            <input
              type="text"
              value={slug}
              className="form-control"
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugChanged(usuario?.slug !== e.target.value);
              }}
              onBlur={() => {
                if (isSlugChanged) {
                  handleSaveChanges("slug");
                }
              }}
            />
            {isSlugChanged && (
              <img src={verifyIcon} alt="icono" className="input-icon" />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2">
          <label className="d-flex justify-content-between" htmlFor="email">
            <div>E-mail</div>
          </label>
          <div className="input-icon-container">
            <input
              type="email"
              value={email}
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailChanged(usuario?.email !== e.target.value);
              }}
              onBlur={() => {
                if (isEmailChanged) {
                  handleSaveChanges("email");
                }
              }}
            />
            {isEmailChanged && (
              <img src={verifyIcon} alt="icono" className="input-icon" />
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="row globals">
        <EditChangePassword />
      </div>
    </ErrorBoundary>
  );
};
