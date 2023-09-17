import { useQuery } from "react-query";
import axios from "axios";
import { Thread } from "../interfaces";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchThreadById = async (id: string): Promise<Thread> => {
  if (!id || id === "Cargando propietario") {
    throw new Error("ID no válido");
  }

  const response = await axios.get(`${API_URL}/thread/${id}`);
  if (response.status !== 200) {
    throw new Error(`Error fetching thread: ${response.statusText}`);
  }
  return response.data;
};

const useFetchThreadById = (id: string) => {
  return useQuery<Thread, Error>(["thread", id], () => fetchThreadById(id), {
    enabled: !!id && id !== "Cargando propietario",
    retry: 3, // Intenta de nuevo 3 veces antes de marcar la consulta como fallida
    refetchOnWindowFocus: false, // Evita refetch cuando la ventana gana el foco
    placeholderData: {
      // Datos de marcador de posición
      owner: "",
      description: "",
      typeOfThread: "Cargando tipo...",
      // Agrega más campos según la estructura de tu interface Thread
    },
  });
};

export default useFetchThreadById;
