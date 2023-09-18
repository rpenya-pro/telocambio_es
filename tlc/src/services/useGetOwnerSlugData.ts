import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios"; // Importamos la nueva instancia

const fetchOwnerSlugData = async (slug: string) => {
  const response = await axiosInstance.get(`/user/slug/${slug}`); // Usamos la instancia y no necesitamos el URL base
  if (response.status !== 200) {
    throw new Error(`Error fetching owner data: ${response.statusText}`);
  }
  return response.data;
};

export const useGetOwnerSlugData = (slug: string) => {
  return useQuery<Usuario, Error>(
    ["owner", slug], // Agrega fetchCounter a la clave de la consulta
    () => fetchOwnerSlugData(slug) // Pasa fetchCounter a fetchOwnerSlugData
  );
};
