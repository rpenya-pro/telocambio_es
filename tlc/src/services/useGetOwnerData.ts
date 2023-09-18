import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios"; // Importa la nueva instancia

const fetchOwnerData = async (ownerId: string) => {
  if (!ownerId) return null;
  const response = await axiosInstance.get(`/user/${ownerId}`); // Usamos la instancia sin el URL base
  if (response.status !== 200) {
    throw new Error(`Error fetching owner data: ${response.statusText}`);
  }
  return response.data;
};

export const useGetOwnerData = (ownerId: string) => {
  return useQuery<Usuario, Error>(["owner", ownerId], () =>
    fetchOwnerData(ownerId)
  );
};
