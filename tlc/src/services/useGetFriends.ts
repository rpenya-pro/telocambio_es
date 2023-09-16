import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";

//TODO cargar más amigos por cada usuario y probar estas medidas
//TODO USAR AXIOS
// Rendimiento de la API: En primer lugar, realizar solicitudes individuales para varios miles de registros no es práctico. Afectaría tanto la velocidad de tu aplicación como la carga en tu servidor. En lugar de esto, deberías considerar implementar paginación o filtrado en tu API para recuperar datos en lotes. También podrías considerar cargar datos adicionales sólo cuando es necesario (por ejemplo, al hacer clic en un amigo específico).
// Gestión de estados: En el contexto de manejar datos de gran volumen, usar un gestor de estados como Redux puede ser beneficioso, pero no solucionará el problema principal de hacer demasiadas solicitudes a la API. Redux te ayuda a manejar y organizar el estado global de tu aplicación, facilita la comunicación entre componentes y puede mejorar el rendimiento a través de la memorización, pero aún necesitas ser eficiente en cómo y cuándo cargas datos.
// Virtualización: Si planeas mostrar una lista larga de amigos en la interfaz de usuario, la virtualización puede ser crucial. Librerías como react-window te permiten renderizar sólo los elementos que actualmente se muestran en la vista, lo que puede mejorar significativamente el rendimiento.
// Cache: Considera usar una capa de caché para almacenar los datos recuperados. Esto puede reducir la cantidad de solicitudes a la API y acelerar la carga de datos. react-query, que ya estás utilizando, tiene un sistema de caché incorporado que podría ser útil en este contexto.
// En resumen, mientras que Redux podría ayudar a gestionar el estado de la aplicación, el problema principal que veo es cómo estás recuperando y gestionando los datos de la API. Mi recomendación principal sería revisar cómo estás recuperando los datos y considerar la paginación, el filtrado, la virtualización y la caché como soluciones potenciales para gestionar grandes cantidades de datos.

// Interfaz para el posible error que pueda devolver la API
interface ApiError {
  message: string;
  // puedes agregar otros campos si tu API los devuelve
}

const API_URL = import.meta.env.VITE_API_URL || "";

export interface FriendInfo {
  idFriend: string;
  addedOn: Date;
}

const fetchFriends = async (
  friendsInfo: FriendInfo[] | undefined
): Promise<(Usuario & { addedOn: Date })[]> => {
  if (!friendsInfo || friendsInfo.length === 0) return [];

  // Extraemos sólo los idFriend para hacer las solicitudes
  const friendIds = friendsInfo.map((friend) => friend.idFriend);

  // Crear un array de promesas para cada ID
  const fetchPromises = friendIds.map((id) => fetch(`${API_URL}/user/${id}`));

  // Esperar a que todas las solicitudes se completen
  const responses = await Promise.all(fetchPromises);

  // Convertir las respuestas en JSON
  const friendsData = await Promise.all(
    responses.map((res) => {
      if (!res.ok) {
        // Aquí puedes intentar extraer un mensaje de error más descriptivo si tu API lo proporciona
        throw new Error("Error fetching a friend");
      }
      return res.json();
    })
  );

  // Ahora, vamos a mezclar la data obtenida con el friendsInfo para tener el addedOn junto a cada friend
  const enrichedFriendsData = friendsData.map((friendData: Usuario, index) => ({
    ...friendData,
    addedOn: friendsInfo[index].addedOn,
  }));
  return enrichedFriendsData;
};

const useGetFriends = (friendsInfo: FriendInfo[] | undefined) => {
  const {
    data: friends,
    isLoading,
    isError,
    error,
  } = useQuery(["getFriends", friendsInfo], () => fetchFriends(friendsInfo), {
    enabled: !!friendsInfo,
  });

  return {
    friends,
    isLoading,
    isError,
    error: error as ApiError,
  };
};

export default useGetFriends;
