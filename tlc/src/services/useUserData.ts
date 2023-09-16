import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchUserData = async (identificador: string): Promise<Usuario> => {
  const response = await axiosInstance.get(`${API_URL}/user/${identificador}`);
  const userData = { ...response.data };
  delete userData.password;
  return userData;
};

const updateUserData = async (
  identificador: string,
  dataToUpdate: Partial<Usuario>
): Promise<Usuario> => {
  const response = await axiosInstance.put(
    `${API_URL}/user/${identificador}`,
    dataToUpdate
  );
  Swal.fire({
    icon: "success",
    title: "Datos actualizados",
    text: "Los datos han sido actualizados exitosamente.",
    confirmButtonText: "OK",
    timer: 2000,
  });

  return response.data;
};

export const useUserData = (identificador: string | undefined) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(!!identificador);

  // Uso de useQuery para obtener datos
  const { data, error, isLoading, isError } = useQuery<Usuario, Error>(
    ["userData", identificador],
    () => fetchUserData(identificador!),
    {
      enabled: shouldFetch,
    }
  );

  // Uso de useMutation para actualizar datos
  const updateMutation = useMutation((dataToUpdate: Partial<Usuario>) =>
    updateUserData(identificador!, dataToUpdate)
  );

  useEffect(() => {
    setShouldFetch(!!identificador);
  }, [identificador]);

  if (isError) {
    console.error(
      "Ocurrió un error al obtener los datos del usuario:",
      error.message
    );
  }

  return { data, error, isLoading, isError, updateUser: updateMutation };
};
