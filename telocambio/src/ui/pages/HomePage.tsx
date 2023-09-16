import React from "react";
import { useSession } from "../contexts/SessionContext";
import ModalLoginRegister from "../components/ModalLoginRegister";

export default function HomePage() {
  const { isLogged, login, logout } = useSession();

  if (isLogged) {
    return <p>El usuario está autenticado</p>;
  } else {
    return (
      <>
        <p>El usuario no está autenticado</p>
        <ModalLoginRegister />
      </>
    );
  }
}
