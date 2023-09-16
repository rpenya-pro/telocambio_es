import axios from "axios";
import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchOwnerSlugData = async (slug: string, fetchCounter: number) => {
  const response = await axios.get(`${API_URL}/user/slug/${slug}`);
  if (response.status !== 200) {
    throw new Error(`Error fetching owner data: ${response.statusText}`);
  }
  return response.data;
};

export const useGetOwnerSlugData = (slug: string, fetchCounter: number) => {
  return useQuery<Usuario, Error>(
    ["owner", slug, fetchCounter], // Agrega fetchCounter a la clave de la consulta
    () => fetchOwnerSlugData(slug, fetchCounter) // Pasa fetchCounter a fetchOwnerSlugData
  );
};
