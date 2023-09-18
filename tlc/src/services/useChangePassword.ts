import { useMutation } from "react-query";
import axios from "axios";

const changePasswordAPI = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  // Aquí puedes ajustar la dirección y método de la API según sea necesario
  const response = await axios.put("/api/user/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const useChangePassword = () => {
  return useMutation(changePasswordAPI);
};
