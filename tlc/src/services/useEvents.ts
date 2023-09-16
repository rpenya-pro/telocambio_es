import { useQuery } from "react-query";
import axios from "axios";
import Eventos from "../interfaces/events";

interface EventsResponse {
  events: Eventos[];
  hasMore: boolean;
}

export interface FetchEventsParams {
  tagsEvent?: string;
  publishedBy?: string;
  orderBy?: "asc" | "desc";
  page?: number;
  limit?: number;
}

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchEvents = async ({
  tagsEvent,
  publishedBy,
  orderBy,
  page = 1,
  limit = 10,
}: FetchEventsParams): Promise<EventsResponse> => {
  const baseURL = `${API_URL}/event/all`;
  const queryParams = [];
  if (page) queryParams.push(`page=${page}`);
  if (limit) queryParams.push(`limit=${limit}`);
  if (tagsEvent) queryParams.push(`tagsEvent=${tagsEvent}`);
  if (publishedBy) queryParams.push(`publishedBy=${publishedBy}`);
  if (orderBy) queryParams.push(`orderBy=${orderBy}`);

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  const url = baseURL + queryString;

  const response = await axios.get<EventsResponse>(url);
  console.log("Server Response:", response.data);

  return response.data;
};

export const useEvents = (params?: FetchEventsParams) => {
  const cacheKey = [
    "events",
    params?.tagsEvent,
    params?.publishedBy,
    params?.orderBy,
  ];

  return useQuery<EventsResponse, Error>(
    cacheKey,
    () => fetchEvents(params || {}),
    {
      refetchInterval: 600000, // Refetch cada 10 minutos
    }
  );
};
