import React, { useState } from "react";
import { useAuthRegister } from "../hooks/useAuthRegister";
import { useValidateRegisterForm, useAuth } from "teloc-hooks"; // Importa el nuevo hook de autenticación
import { Usuario } from "../../../repo-hooks-yarn/src/interfaces/usuario";
import { useAuthContext } from "./AuthContext";

interface RegisterProps {
  handleClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ handleClose }) => {
  const initialRegisterFields = {
    email: "",
    password: "",
    repeat: "",
  };

  //----------- realiza el registro del usuario
  const isAuthenticated = useAuthContext();

  const {
    isRegisteredUser,
    successMessage,
    errorMessage,
    registerUser,
    loginUser,
    clearMessages,
  } = useAuthRegister();

  const [user, setUser] = useState<Usuario>({
    email: "",
    password: "",
  });

  //----------------valida los campos -----------------------------
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const { values, errors, isValid, handleChange } = useValidateRegisterForm(
    initialRegisterFields,
    isCheckboxChecked
  );
  const handleRegister = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    user.email = values.email;
    user.password = values.password;
    await registerUser(user);
    clearMessages();
  };

  //---------- comprueba que el registro ha tenido éxito y logea, cierra la modal y refresca
  if (isRegisteredUser) {
    console.log("LLisRegisteredUser", isRegisteredUser);
    loginUser(values.email, values.password);

    //     handleClose();
    //     window.location.reload();
  }
  console.log("Sesion iniciada?", isAuthenticated);
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
