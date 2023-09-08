import React, { useEffect, useState } from "react";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  useFetchUserById,
  useGetPayloadFromToken,
  useValidateToken,
} from "teloc-hooks";

export const ProfilePage = () => {
  const payload = useGetPayloadFromToken();
  const isValid = useValidateToken();
  const { user, loading, error } = useFetchUserById(payload?._id);

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleLogout = () => {};

  useEffect(() => {
    setIsAuth(payload._id === undefined ? false : true);
  }, [payload]);

  if (isValid === null) {
    return <p>Validando...</p>;
  }

  if (!isAuth) {
    return (
      <div>
        <ErrorProtectedComponent />
        AQUI LA REDIRECCION
      </div>
    );
  } else {
    return (
      <>
        <div className="profile">aqui elprofile</div>
      </>
    );
  }
};
