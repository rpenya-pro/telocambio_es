import { useParams } from "react-router-dom";
import DetailEventComponent from "../../components/protected/DetailEventComponent";
import useEventDetail from "../../../services/useEventDetail";

/**
 * Página detalle de un Evento
 * @returns
 */
export const EventDetail = () => {
  const { slugEvent } = useParams<{ slugEvent: string }>();
  const { data: eventData, isLoading, isError } = useEventDetail(slugEvent!);

  if (isLoading) return <div>Cargando...</div>;
  if (isError || !eventData) return <div>Error al cargar el evento.</div>;

  return (
    <div className="container activity">
      <div className="row">
        <div className="col-12">
          <DetailEventComponent eventData={eventData} />
        </div>
      </div>
    </div>
  );
};
