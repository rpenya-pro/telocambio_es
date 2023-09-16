import React from "react";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../infrastructure/api";
import { useSession } from "../contexts/SessionContext";

interface AxiosLoginResponse {
  data: LoginResponse;
}

interface LoginResponse {
  access_token: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail es requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña es requerida"),
});

function LoginComponent() {
  const { login } = useSession();

  const mutationLogin = useMutation(
    (loginData: { email: string; password: string }) =>
      api.post("/user/login", loginData)
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: (values) => {
      mutationLogin.mutate(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (response: AxiosLoginResponse) => {
            // Aquí puedes manejar la respuesta del inicio de sesión. Por ejemplo, guardar el token en el almacenamiento local o en una cookie.
            // localStorage.setItem('token', data.token); // Suponiendo que la respuesta tiene un token
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

      <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
        Registrarse
      </button>
    </form>
  );
}

export default LoginComponent;
