import { UseMutationOptions, useMutation } from "react-query";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { axiosInstance } from "../infrastructure/api/axios"; // Importamos nuestra nueva instancia

type ChangePasswordInputs = {
  _id: string | undefined;
  currentPassword: string;
  newPassword: string;
};

type ReturnTypeAPI = {
  message: string;
};

type APIError = {
  response: any;
  message: string;
};

const changePasswordAPI = async (
  input: ChangePasswordInputs
): Promise<ReturnTypeAPI> => {
  const { _id, currentPassword, newPassword } = input;
  try {
    const response = await axiosInstance.put<ReturnTypeAPI>(
      `/user/change-password/${_id}`,
      { currentPassword, newPassword }
    );

    Swal.fire({
      title: "¡Éxito!",
      text: "Contraseña cambiada correctamente.",
      icon: "success",
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    if (
      axiosError.response?.data?.message ===
      "La contraseña actual es incorrecta."
    ) {
      Swal.fire({
        title: "Error",
        text: "La contraseña actual es incorrecta.",
        icon: "error",
      });
    }
    throw error;
  }
};

export const useChangePassword = (
  options?: UseMutationOptions<ReturnTypeAPI, APIError, ChangePasswordInputs>
) => {
  return useMutation<ReturnTypeAPI, APIError, ChangePasswordInputs>(
    changePasswordAPI,
    options
  );
};
