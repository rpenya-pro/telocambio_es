import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Asegúrate de tener la biblioteca js-cookie instalada
import { Usuario } from "../../../repo-hooks-yarn/src/interfaces/usuario";
import { encryptData } from "../helpers/encrypt";

const API_URL = "http://localhost:3000/user/register";
const LOGIN_API_URL = "http://localhost:3000/user/login"; // URL para el inicio de sesión

export const useAuthRegister = () => {
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Nuevo estado

  /**
   * REGISTRO USUARIO
   * @param user
   */
  const registerUser = async (user: Usuario) => {
    try {
      const response = await axios.post(API_URL, user);

      if (response.status === 200 || response.status === 201) {
        setIsRegisteredUser(true);
        setSuccessMessage("Registro exitoso");
      } else {
        setIsRegisteredUser(false);
        setErrorMessage("Error en el registro");
        console.log("Error en el registro - isRegistered: false");
      }
    } catch (error) {
      setIsRegisteredUser(false);
      setErrorMessage("Error en la solicitud de registro");
      console.error("Error en la solicitud de registro:", error);
    }
  };

  /**
   * LOGIN USUARIO
   * @param email
   * @param password
   */
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(LOGIN_API_URL, {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        const { access_token } = response.data; // Supongo que el token viene en la respuesta

        const encrypted = encryptData(email);
        // Almacena el token y el email en cookies
        Cookies.set("authToken", access_token);
        Cookies.set("stored_email", encrypted);
        setIsLoggedIn(true);
        console.log("hoiok", isLoggedIn);
        // Devuelve un estado true para indicar que el inicio de sesión fue exitoso
        return true;
      } else {
        setErrorMessage("Error en el inicio de sesión");
        console.log("Error en el inicio de sesión");
        return false;
      }
    } catch (error) {
      setErrorMessage("Error en la solicitud de inicio de sesión");
      console.error("Error en la solicitud de inicio de sesión:", error);
      return false;
    }
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return {
    isRegisteredUser,
    successMessage,
    errorMessage,
    registerUser,
    loginUser,
    clearMessages,
    isLoggedIn,
  };
};
