import { useMutation } from "react-query";
import axios from "axios";
import { Usuario } from "../interfaces/user";

const API_URL = import.meta.env.VITE_API_URL || "";

const updateUserData = async (data: Usuario) => {
  const userId = data._id;
  const response = await axios.put(`${API_URL}/user/${userId}`, data);

  if (response.status !== 200) {
    throw new Error("Error al actualizar la data.");
  }
  console.log(userId);
  return response.data;
};

const useUpdateData = () => {
  return useMutation<Usuario, Error, Usuario>(updateUserData);
};

export default useUpdateData;
