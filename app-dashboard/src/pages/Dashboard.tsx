import React, { useEffect, useState } from "react";
import { DashboardMenu } from "../components/";
import { isAuthenticated } from "../auth/Auth";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useValidateToken } from "@app-shared/react-hooks";

//TODO implementar el hook de validacion
export const Dashboard = () => {
  const isValid = useValidateToken();

  if (isValid === null) {
    return <p>Validando...</p>;
  }

  if (!isAuthenticated()) {
    return (
      <div>
        <ErrorProtectedComponent />
        AQUI LA REDIRECCION
      </div>
    );
  } else {
    return (
      <div className="dashboard">
        {!isValid ? "token no valido" : "token valido"}
        {/* Renderiza tus componentes aquí */}
        <div className="row ">
          <DashboardMenu />
        </div>
        <div className="row landing__carousel">
          <div className="col-12">
            {/* {isValid ? "El token es válido." : "El token no es válido."} hola */}
          </div>
        </div>
        <div className="row landing__how">
          <div className="col-12">buenas tardes</div>
        </div>
        <div className="row landing__start">
          <div className="col-12">huenas noches</div>
        </div>
      </div>
    );
  }
};
