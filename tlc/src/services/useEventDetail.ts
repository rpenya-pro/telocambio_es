import { useQuery } from "react-query";
import axios from "axios";
import Eventos from "../interfaces/events";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchEventDetail = async (slugEvent: string): Promise<Eventos> => {
  const url = `${API_URL}/event/slug/${slugEvent}`;
  const response = await axios.get<Eventos>(url);
  return response.data;
};

const useEventDetail = (slugEvent: string) => {
  return useQuery<Eventos, Error>(["eventDetail", slugEvent], () =>
    fetchEventDetail(slugEvent)
  );
};

export default useEventDetail;
