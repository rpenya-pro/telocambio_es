import { useInfiniteQuery } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios";
import { Thread } from "../interfaces";

type FetchThreadsResponse = {
  hasMore: any;
  threads: Thread[];
};

const fetchThreads = async (
  { pageParam = 1, limit = 10, orderBy = "desc" },
  //  userId?: string,
  themesPreferred?: string[],
  selectedTheme?: string
) => {
  const params: { [key: string]: string | string[] | number } = {};
  // if (userId) params.owner = userId;
  if (themesPreferred && themesPreferred.length)
    params.threadTemathic = themesPreferred;

  if (selectedTheme) params.selectedTheme = selectedTheme;
  // Agregar parámetros de paginación
  params.page = pageParam;
  params.limit = limit;

  // Usamos el parámetro 'orderBy' para determinar el orden
  params.sortBy = orderBy === "desc" ? "-publishDate" : "publishDate";

  const response = await axiosInstance.get(`/thread/all`, { params });
  const responseData = response.data as FetchThreadsResponse;
  return responseData;
};

const useGetThreads = (
  userId?: string,
  themesPreferred?: string[],
  orderBy: "asc" | "desc" = "desc",
  selectedTheme?: string
) => {
  const queryKey = ["threads", userId, themesPreferred, orderBy, selectedTheme];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error: rawError,
  } = useInfiniteQuery<FetchThreadsResponse>(
    queryKey,
    ({ pageParam }) =>
      fetchThreads(
        { pageParam, orderBy },
        //  userId,
        themesPreferred,
        selectedTheme
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
      keepPreviousData: true,
    }
  );

  // Filtrado de threads basado en selectedTheme y themesPreferred
  const filteredThreads =
    data?.pages.flatMap((page) =>
      page.threads.filter(
        (thread) =>
          (selectedTheme
            ? thread.threadTemathic!.includes(selectedTheme)
            : true) &&
          thread.threadTemathic!.some((theme) =>
            themesPreferred?.includes(theme)
          )
      )
    ) || [];

  const error = rawError ? (rawError as Error).message : null;

  return {
    threads: filteredThreads,
    fetchNextPage,
    isLoading: isLoading || isFetchingNextPage,
    hasNextPage,
    error,
  };
};

export default useGetThreads;
