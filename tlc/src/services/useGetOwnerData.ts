import axios from "axios";
import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchOwnerData = async (ownerId: string) => {
  if (!ownerId) return null;
  const response = await axios.get(`${API_URL}/user/${ownerId}`);
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
