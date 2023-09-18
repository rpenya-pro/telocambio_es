import { useMutation } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios"; // Importamos la instancia que has creado
import { Usuario } from "../interfaces/user";

const updateUserData = async (data: Usuario) => {
  const userId = data._id;
  const response = await axiosInstance.put(`/user/${userId}`, data); // Usamos la instancia y no necesitamos el URL base

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
