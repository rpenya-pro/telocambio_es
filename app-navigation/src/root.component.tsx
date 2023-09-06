// Asignar React y ReactDOM desde el objeto window
const React = window.React;
const ReactDOM = window.ReactDOM;

import HeaderNavBar from "./components/HeaderNavBar";
import { isAuthenticated, logout } from "./auth/Auth";
// import {
//   Error404Component,
//   ErrorProtectedComponent,
//   renewToken,
// } from "@app-shared/react-shared";
import { useEffect } from "react";

export default function Root(props) {
  // useEffect(() => {
  //   renewToken();
  // }, []);

  return (
    <>
      <div className="container">
        <HeaderNavBar authenticated={isAuthenticated()} logout={logout} />
      </div>
    </>
  );
}
