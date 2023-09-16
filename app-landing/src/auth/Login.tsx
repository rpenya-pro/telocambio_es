import React from "react";
import singleSpa from "single-spa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useValidateLoginForm, useAuth } from "teloc-hooks";

interface LoginProps {
  handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({ handleClose }) => {
  const initialState = {
    email: "rafa@webentorn.com",
    password: "111111",
  };

  const navigate = useNavigate();
  const { login } = useAuth();
  const { values, errors, isValid, handleChange } =
    useValidateLoginForm(initialState);

  const handleLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const { success, message } = await login(values.email, values.password);

      if (success) {
        //singleSpa.triggerAppChange();
        window.dispatchEvent(new Event("login-success"));
        handleClose();
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text:
            message ||
            "Credenciales incorrectas o error en el inicio de sesión.",
        });
      }
    } catch (error) {
      console.error("Ocurrió un error durante la autenticación", error);
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "Ocurrió un error inesperado.",
      });
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
      </div>
    </form>
  );
};

export default Login;
