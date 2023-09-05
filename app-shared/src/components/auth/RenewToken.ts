import axios from "axios";
import jwtDecode from "jwt-decode";

import Cookies from "js-cookie";
import process from "process";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const token = Cookies.get("authToken");
const decodedToken = jwtDecode(token);
const userEmail =
  typeof decodedToken === "object" && "email" in decodedToken
    ? decodedToken.email
    : "";

export async function renewToken(): Promise<string | null> {
  try {
    console.error("token renovado:");
    const response = await axios.post(`${apiUrl}/renew`, {
      email: userEmail,
    });
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Error renewing token:", error);
    // Manejar el error, como mostrar un mensaje al usuario
    return null;
  }
}
