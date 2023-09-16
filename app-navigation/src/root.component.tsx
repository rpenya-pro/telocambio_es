import React from "react";
import HeaderNavBar from "./components/HeaderNavBar";
import { ErrorProtectedComponent } from "@app-shared/react-shared";
import { AuthProvider } from "./helpers/AuthContext";

export default function Root(props) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <div className="container">
          <HeaderNavBar />
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}
