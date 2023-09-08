import React, { useEffect, useRef, useState } from "react";
import { DashboardMenu } from "../components/";
import { isAuthenticated } from "../auth/Auth";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  useFetchUserById,
  useGetPayloadFromToken,
  useValidateToken,
} from "teloc-hooks";
import Visor from "./Visor";
import ModalWindowFillData from "../components/ModalWindowFillData";

export const Dashboard = () => {
  const [dashConsole, setDashConsole] = useState<boolean>(false); //activa la consola de depuracion
  const modalRef = useRef<HTMLDivElement>(null);
  let modalInstance: any = null;

  const payload = useGetPayloadFromToken();
  const isValid = useValidateToken();
  const { user } = useFetchUserById(payload?._id);

  const openModal = () => {
    const BootstrapModal = (window as any).bootstrap.Modal;
    modalInstance = new BootstrapModal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });
    modalInstance.show();
  };

  const closeModal = () => {
    if (modalInstance) {
      modalInstance.hide();
    }
  };

  useEffect(() => {
    if (
      //si el nombre y apellidos del usuario no vienen
      //informados abrimos modal para que rellene los datos
      user &&
      (user.firstName == null ||
        user.lastName == null ||
        user.firstName.trim() === "" ||
        user.lastName.trim() === "")
    ) {
      openModal();
    }
  }, [user]);

  if (isValid === null) {
    return <p>Validando...</p>;
  }

  if (!isAuthenticated()) {
    return (
      <div>
        <ErrorProtectedComponent />
        {/* AQUÍ LA REDIRECCIÓN */}
      </div>
    );
  } else {
    return (
      <>
        <ModalWindowFillData
          identUser={payload?._id}
          closeModal={closeModal}
          modalRef={modalRef}
        />
        <div className="dashboard">
          <Visor parametros={{ isValid, dashConsole }} />
          <div className="row">
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
      </>
    );
  }
};
