import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios"; // Importa la nueva instancia

export interface FriendInfo {
  idFriend: string;
  addedOn: Date;
}

// Este es tu fetch original convertido para usar axios
const fetchFriends = async (
  friendsInfo: FriendInfo[] | undefined
): Promise<(Usuario & { addedOn: Date })[]> => {
  if (!friendsInfo || friendsInfo.length === 0) return [];

  // Extraemos sólo los idFriend para hacer las solicitudes
  const friendIds = friendsInfo.map((friend) => friend.idFriend);

  // Crear un array de promesas para cada ID
  const fetchPromises = friendIds.map((id) => axiosInstance.get(`/user/${id}`));

  // Esperar a que todas las solicitudes se completen
  const responses = await Promise.all(fetchPromises);

  // Convertir las respuestas en JSON (en axios ya lo hace automáticamente)
  const friendsData = responses.map((res) => res.data);

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
    error: error as any, // Tipo modificado para coincidir con axios
  };
};

export default useGetFriends;
