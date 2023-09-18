import { useQuery } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios"; // Importa la nueva instancia
import { Thread } from "../interfaces";

const fetchThreadById = async (id: string): Promise<Thread> => {
  if (!id || id === "Cargando propietario") {
    throw new Error("ID no válido");
  }

  const response = await axiosInstance.get(`/thread/${id}`);
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
