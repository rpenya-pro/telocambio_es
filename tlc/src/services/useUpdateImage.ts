import { useMutation } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios"; // Importamos la instancia que has creado

// Esta función subirá la imagen al backend y recibirá la URL de Cloudinary
const uploadImageToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post(`/user/upload`, formData); // Usamos la instancia y no necesitamos el URL base

  if (response.status !== 201 || !response.data.imageUrl) {
    console.log("Response:", response);
    throw new Error("Error al cargar la imagen al servidor");
  }

  console.log(response.data.imageUrl);
  return response.data.imageUrl;
};

const updateImage = async (data: {
  userId: string;
  newAvatar: string; // El URL de la imagen de Cloudinary
}): Promise<any> => {
  const response = await axiosInstance.put(`/user/${data.userId}`, {
    avatar: data.newAvatar,
  });

  if (response.status !== 200) {
    throw new Error("Error al actualizar la imagen del usuario");
  }

  return response.data;
};

export const useUpdateImage = () => {
  const uploadMutation = useMutation<string, Error, File>(uploadImageToServer);
  const updateMutation = useMutation<
    any,
    Error,
    { userId: string; newAvatar: string }
  >(updateImage);

  return { uploadMutation, updateMutation };
};
