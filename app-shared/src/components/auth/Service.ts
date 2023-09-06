import Cookies from "js-cookie";
import axios from "axios";
import process from "process";
import { KJUR, KEYUTIL } from "jsrsasign";

interface Payload {
  email?: string;
  exp?: number;
}

export function isAuthenticated(): boolean {
  const token = Cookies.get("authToken");
  return Boolean(token);
}

export function logout(): void {
  Cookies.remove("authToken");
}
