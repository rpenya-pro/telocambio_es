import React, { useEffect, useState } from "react";
import { authenticate, renewToken } from "./Auth";
import useValidateForm from "../hooks/useValidateFormLogin"; // Asegúrate de que la ruta sea la correcta
import Swal from "sweetalert2";

interface LoginProps {
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  const initialState = {
    email: "rafa@webentorn.com",
    password: "111111",
  };

  const { values, errors, isValid, handleChange } =
    useValidateForm(initialState);

  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const { success, message } = await authenticate(
        values.email,
        values.password
      );

      if (success) {
        closeModal();
        window.location.href = `/dashboard`;
      } else {
        setError(message);
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: message || "Ocurrió un error durante el inicio de sesión.",
        });
      }
    } catch (error) {
      console.error("Ocurrió un error durante la autenticación", error);
      setError("Ocurrió un error inesperado");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="w-100 mb-5">
        Si ya tienes tu cuenta en telocambio.es, accede desde aquí.
      </div>
      <div className="container-vertical-login">
        <div className="row mt-3 mb-4">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="E-mail"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
        </div>
        {/* Resto del formulario */}
        {/* ... */}
        <div className="row mt-4">
          <div className="col-md-12 mt-4">
            <button
              type="submit"
              id="loginButton"
              title="Login"
              className="btn landing__form-btn mt-5"
              disabled={!isValid}
            >
              Accede
            </button>
          </div>
        </div>
        <p>{error}</p>
      </div>
    </form>
  );
};

export default Login;
