import api from "../api";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/user/login", credentials);
  return response.data;
};
