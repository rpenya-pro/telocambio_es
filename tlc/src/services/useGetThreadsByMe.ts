import { useQuery } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios";
import { Thread } from "../interfaces";
import { Usuario } from "../interfaces/user";

const API_URL = import.meta.env.VITE_API_URL || "";

type FetchThreadsResponse = {
  threads: Thread[];
};

const fetchThreadsByOwner = async (
  user: Usuario,
  page: number = 1,
  limit: number = 9999999999999990
) => {
  const url = `${API_URL}/thread/all`;

  if (!user || !user._id) {
    throw new Error("User ID is required");
  }

  const params = {
    owner: user._id,
    page,
    limit,
  };

  const response = await axiosInstance.get(url, { params });
  return response.data as FetchThreadsResponse;
};

const useGetThreadsByMe = (
  user: Usuario,
  page: number = 1,
  limit: number = 10
) => {
  const queryKey = ["threads", user?._id, page, limit];

  const { data, isLoading, isError, error } = useQuery<
    FetchThreadsResponse,
    Error
  >(queryKey, () => fetchThreadsByOwner(user, page, limit), {
    enabled: !!user?._id, // Esto hará que el hook no ejecute la query hasta que user._id exista
  });

  return {
    threads: data?.threads || [],
    isLoading,
    isError,
    error,
  };
};

export default useGetThreadsByMe;
