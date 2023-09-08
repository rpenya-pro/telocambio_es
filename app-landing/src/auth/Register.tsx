import React, { useState } from "react";
import { useValidateRegisterForm, useAuth } from "teloc-hooks"; // Importa el nuevo hook de autenticación

interface RegisterProps {
  handleClose: () => void; // Define la prop handleClose
}

const Register: React.FC<RegisterProps> = ({ handleClose }) => {
  const initialRegisterFields = {
    email: "",
    password: "",
    repeat: "",
  };

  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const { values, errors, isValid, handleChange } = useValidateRegisterForm(
    initialRegisterFields,
    isCheckboxChecked
  );

  // Utiliza nuevo hook de autenticación
  const { register, login } = useAuth();

  const handleRegister = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const result = await register(values.email, values.password);

      if (result.success) {
        login(values.email, values.password);
        handleClose();
        window.location.reload();
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
