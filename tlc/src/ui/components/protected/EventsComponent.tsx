import { useState } from "react";
import Cookie from "js-cookie";
import { cogIcon } from "../../../assets/images";
import { useUserData } from "../../../services/useUserData";
import { FetchEventsParams, useEvents } from "../../../services/useEvents";
import Eventos from "../../../interfaces/events";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { truncateText } from "../../../infrastructure/helpers/truncateText";

export const EventsComponent = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const [selectedThemeEvent, setSelectedThemeEvent] = useState("");

  const fetchParams: FetchEventsParams = {
    tagsEvent: selectedThemeEvent,
    publishedBy: "",
    orderBy: "asc",
  };
  const { data: eventsData, isLoading, isError } = useEvents(fetchParams);

  const handleThemeEventChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValueEvent = event.target.value;
    setSelectedThemeEvent(newValueEvent);
    if (newValueEvent === "") {
      Cookie.remove("selectedThemeEvent");
    } else {
      Cookie.set("selectedThemeEvent", newValueEvent);
    }
  };

  const handleNavigate = (slugEvent: string) => {
    navigate(`/event/${slugEvent}`);
  };

  return (
    <div className="events">
      <div className="activity d-flex justify-content-between align-items-center mt-5 ms-3 me-3">
        <div>
          <h3>Eventos</h3>
        </div>
        <div>
          <button className="btn">
            <img src={cogIcon} alt="Settings" className="navbar-cog-icon" />
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5 ms-3 me-3">
        <select
          className="form-control-global"
          value={selectedThemeEvent}
          onChange={handleThemeEventChange}
        >
          <option value="">Eventos por tus temas</option>
          {data?.themesprefered!.map((themes: string, index: number) => (
            <option key={index} value={themes}>
              {themes}
            </option>
          ))}
        </select>
      </div>
      <div className=" mt-5 ms-3 me-3">
        {isLoading ? (
          <div className="loading">Cargando eventos...</div>
        ) : isError ? (
          <div className="error">
            Hubo un error al cargar los eventos. Por favor, intenta nuevamente
            más tarde.
          </div>
        ) : (
          eventsData?.events &&
          eventsData.events.map(
            (
              event: Eventos // use the SingleEvent type here
            ) => (
              <div className="card p-3 mb-3 globals" key={event.eventId}>
                <div onClick={() => handleNavigate(event?.slugEvent)}>
                  <h3>{event.titleEvent}</h3>
                  <p className="small sans-serif m-0 mt-2">
                    {new Date(event.dateEvent).toLocaleDateString()}
                  </p>
                  <p className="small sans-serif m-0 mb-3">
                    Publicado por: {event.publishedBy}
                  </p>
                  <p>
                    {event.imagesEvent && (
                      <img
                        className="img-fluid"
                        src={`/images/${event.imagesEvent[0]}`}
                        alt="Imagen del evento"
                      />
                    )}
                  </p>
                </div>

                <p className="resume-text">
                  {truncateText(event.contentEvent, 140)}...
                </p>
                <p>
                  <a
                    href={event.urlEvent || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enlace al evento
                  </a>
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};
