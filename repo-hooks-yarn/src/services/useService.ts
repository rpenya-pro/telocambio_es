import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const BASE_URL = `http://localhost:9000`; // URL del endpoint
const apiUrl = "http://localhost:3000";
const secretKey = "a1b2c3d4e5f67890abcdef1234567890"; // Clave secreta de ejemplo

const useService = () => {
  async function register(email: string, password: string) {
    try {
      Cookies.remove("authToken");

      const response = await axios.post(`${apiUrl}/user/register`, {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Usuario registrado!",
          text: "Has sido registrado, pulsa Aceptar y entrarás en tu área de usuario",
        });
        return { success: true, message: "User successfully registered" };
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo ha fallado",
        });
        return {
          success: false,
          message: response.data.message || "Registration failed",
        };
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El usuario ya existe, prueba con otro e-mail!",
        });
        return {
          success: false,
          message: "El usuario ya existe, prueba con otro e-mail",
        };
      }
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        const token = response.data.access_token;
        Cookies.set("authToken", token);
        Cookies.set("stored_email", email);
        return { success: true, message: "User successfully logged in" };
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Los datos de autenticación no parecen correctos",
        });
        return {
          success: false,
          message: response.data.message || "Authentication failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }

  async function getUserById(id: any) {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el usuario.");
    }
  }

  async function updateUser(
    id: string,
    user: {
      firstName: string;
      lastName: string;
      address: {
        street: string;
        postalCode: string;
        city: string;
        state: string;
        country: string;
      };
    }
  ) {
    try {
      console.log("SERV", id, user);
      const response = await axios.put(`${apiUrl}/user/${id}`, user);
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el usuario.");
    }
  }

  async function deleteUser(id: any) {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al eliminar el usuario.");
    }
  }

  return {
    register,
    login,
    getUserById,
    updateUser,
    deleteUser,
  };
};

export default useService;
