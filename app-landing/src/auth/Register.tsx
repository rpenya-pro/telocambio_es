import React, { useState } from "react";
import process from "process";
import { authenticate, registerUser } from "./Auth";
import useValidateForm from "../hooks/useValidateForm"; // Asegúrate de que la ruta sea la correcta
import Swal from "sweetalert2";

interface RegisterProps {
  closeModal: () => void;
}

const Register: React.FC<RegisterProps> = ({ closeModal }) => {
  const initialState = {
    email: "",
    password: "",
    repeat: "",
  };

  const [isCheckboxChecked, setCheckboxChecked] = useState(false);

  const { values, errors, isValid, handleChange } = useValidateForm(
    initialState,
    isCheckboxChecked
  );

  const handleRegister = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const { success, message } = await registerUser(
        values.email,
        values.password
      );

      if (success) {
        await Swal.fire({
          icon: "success",
          title: "Has sido registrado!",
          text: "Ya estás registrado",
          allowOutsideClick: false, // Evita que el usuario haga clic fuera del SweetAlert
          showCancelButton: false, // No se muestra el botón "Cancelar"
          confirmButtonText: "OK",
        });

        // Realizar inicio de sesión del usuario
        const loginResult = await authenticate(values.email, values.password);

        if (loginResult.success) {
          closeModal();
          window.location.href = `/dashboard`;
        } else {
          // Manejar error de inicio de sesión
          alert(loginResult.message || "Error de inicio de sesión");
        }
      }
    } catch (error) {
      console.error("Ocurrió un error durante el registro", error);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="w-100 mb-5">
          Si todavía no tienes una cuenta, crea una ahora!
        </div>
        <div className="container-vertical-login">
          {/* Email Field */}
          <div className="row mt-3 mb-4">
            <div className="col-md-12">
              <input
                type="email"
                className="form-control"
                placeholder="E-mail"
                autoComplete="off"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
          </div>

          {/* Password Field */}
          <div className="row">
            <div className="col-md-12">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={values.password}
                autoComplete="new-password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>

          {/* Repeat Password Field */}
          <div className="row mt-3">
            <div className="col-md-12">
              <input
                type="password"
                className="form-control"
                name="repeat"
                placeholder="Repite password"
                value={values.repeat}
                onChange={(e) => handleChange("repeat", e.target.value)}
              />
              {errors.repeat && <span>{errors.repeat}</span>}
            </div>
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="row mt-3 landing__texto-small">
            <div className="col-md-12">
              <input
                type="checkbox"
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />{" "}
              Acepto la política de privacidad
            </div>
          </div>

          {/* Register Button */}
          <div className="row ">
            <div className="col-md-12">
              <button
                type="submit"
                id="registerButton"
                title="Create your account"
                className="btn landing__form-btn mt-5"
                disabled={!isValid}
              >
                Crea tu cuenta
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
