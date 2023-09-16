import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../infrastructure/api";
import { useSession } from "../contexts/SessionContext";
import React from "react";

interface AxiosLoginResponse {
  data: LoginResponse;
}

interface LoginResponse {
  access_token: string;
}

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail es requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña es requerida"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Las contraseñas deben coincidir"),
});

function RegisterComponent() {
  const { login } = useSession();

  const mutationRegister = useMutation(
    (newUserData: {
      email: string;
      password: string;
      repeatPassword: string;
    }) => api.post("/user/register", newUserData)
  );
  const mutationLogin = useMutation(
    (loginData: { email: string; password: string }) =>
      api.post("/user/login", loginData)
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: registerSchema,

    onSubmit: (values) => {
      mutationRegister.mutate(values, {
        onSuccess: () => {
          // Inicia sesión automáticamente
          mutationLogin.mutate(
            {
              email: values.email,
              password: values.password,
            },
            {
              onSuccess: (response: AxiosLoginResponse) => {
                // Aquí puedes manejar la respuesta del inicio de sesión. Por ejemplo, guardar el token en el almacenamiento local o en una cookie.
                // localStorage.setItem('token', data.token); // Suponiendo que la respuesta tiene un token
                console.log(
                  "response.data.access_token",
                  response.data.access_token
                );
                Cookies.set("access_token", response.data.access_token);
                login();
                console.log("entra al login");
                // Redirecciona o realiza otras acciones después del inicio de sesión exitoso
              },
              onError: (error: any) => {
                if (error?.response?.status === 401) {
                  console.error("Error 401 en login: Credenciales inválidas.");
                } else {
                  console.error("Error desconocido.");
                }
              },
            }
          );
        },
        onError: (error: any) => {
          if (error.response) {
            switch (error.response.status) {
              case 409:
                alert("El usuario ya está registrado");
                break;
              case 401:
                alert("No autorizado. Verifica tus credenciales.");
                break;
              default:
                alert("Ocurrió un error durante el proceso");
                break;
            }
          } else {
            alert("Error de conexión o problema desconocido");
          }
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Campo Email */}
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? "error" : ""}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
      </div>

      {/* Campo Password */}
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
      </div>

      {/* Campo Repeat Password */}
      <div className="form-group">
        <label htmlFor="repeatPassword">Repite la contraseña</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          className={
            formik.touched.repeatPassword && formik.errors.repeatPassword
              ? "error"
              : ""
          }
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
          <div className="error-message">{formik.errors.repeatPassword}</div>
        ) : null}
      </div>

      <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
        Registrarse
      </button>
    </form>
  );
}

export default RegisterComponent;
