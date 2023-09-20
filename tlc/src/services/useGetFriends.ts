import { useQuery } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios";

export interface FriendInfo {
  idFriend: string;
  addedOn: Date;
}

const fetchFriends = async (
  friendsInfo: FriendInfo[] | undefined
): Promise<(Usuario & { addedOn: Date })[]> => {
  if (!friendsInfo || friendsInfo.length === 0) return [];

  const friendIds = friendsInfo.map((friend) => friend.idFriend);

  const fetchPromises = friendIds.map((id) => axiosInstance.get(`/user/${id}`));

  const responses = await Promise.all(fetchPromises);

  const friendsData = responses.map((res) => res.data);

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
    refetchOnWindowFocus: false,
  });
  debugger;
  return {
    friends,
    isLoading,
    isError,
    error: error as any,
  };
};

export default useGetFriends;
