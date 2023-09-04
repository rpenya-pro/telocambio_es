import mongoose from "mongoose";
import Cookies from "js-cookie";
import process from "process";
import { KJUR, KEYUTIL } from "jsrsasign";
import { User } from "../models"; // Importa el modelo de usuario
import { UserDocument } from "../interfaces"; // Importa la interfaz del usuario

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

const dbConnection = process.env.REACT_APP_MONGODB_URI;
const privateKey = process.env.JWT_SECRET;

export async function connectToDB() {
  try {
    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export async function authenticate(
  email: string,
  password: string
): Promise<AuthResponse> {
  const user = await User.findOne({ email, password }); // Busca en la base de datos usando el modelo de Mongoose

  if (user) {
    const payload = {
      email: user.email,
      id: user._id,
    };

    const header = { alg: "RS256", typ: "JWT" };
    const sHeader = JSON.stringify(header);
    const sPayload = JSON.stringify(payload);

    // Usa KJUR para firmar el token
    const token = KJUR.jws.JWS.sign("RS256", sHeader, sPayload, privateKey);

    Cookies.set("authToken", token);
    return {
      success: true,
      token,
    };
  } else {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }
}

export function isAuthenticated(): boolean {
  const token = Cookies.get("authToken");
  return Boolean(token);
}

export function logout(): void {
  Cookies.remove("authToken");
}
