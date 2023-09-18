import { useQuery } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios"; // Importa la nueva instancia
import Eventos from "../interfaces/events";

const fetchEventDetail = async (slugEvent: string): Promise<Eventos> => {
  const url = `/event/slug/${slugEvent}`;
  const response = await axiosInstance.get<Eventos>(url);
  return response.data;
};

const useEventDetail = (slugEvent: string) => {
  return useQuery<Eventos, Error>(["eventDetail", slugEvent], () =>
    fetchEventDetail(slugEvent)
  );
};

export default useEventDetail;
