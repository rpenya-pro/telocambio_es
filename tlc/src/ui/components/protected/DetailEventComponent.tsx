import React from "react";

// import noImage from "../../../assets/images/noimage.png";

import useDateFormat from "../../hooks/useDateFormat";
import { InteractiveImage } from "./InteractiveImage";
import Eventos from "../../../interfaces/events";

interface DetailEventComponentProps {
  eventData: Eventos;
}

export const DetailEventComponent: React.FC<DetailEventComponentProps> = ({
  eventData,
}) => {
  //comentado por si hace falta usar la data del user logeado
  // const { userData } = useAuth();
  // const { data } = useUserData(userData?._id);
  const { formatDate } = useDateFormat();

  // const imageUrl = eventData.imagesEvent && eventData?.imagesEvent[0];
  // const src = imageUrl ? `/images/${imageUrl}` : noImage;

  return (
    <>
      <div className="mt-4 mt-5">
        <div className="row thread-item">
          <div className="col-md-4 pe-4">
            <InteractiveImage
              allImages={eventData?.imagesEvent}
              alt={eventData.contentEvent || ""}
            />
          </div>
          <div className="col-md-8">
            <div>Eventos</div>
            <h1>{eventData.contentEvent || ""}</h1>
            <h3>{eventData?.publishedBy || ""}</h3>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <p>
                {formatDate(eventData.dateEvent!, "fullDate")} a las{" "}
                {formatDate(eventData.dateEvent!, "time")}
              </p>
            </div>
            <hr />
            <div>
              <h5>Categorías:</h5>
            </div>
            <hr />
            <div className="mt-4">
              <h5>Descripción del intercambio:</h5> {eventData?.contentEvent}
            </div>
            <hr />

            <div className="mt-4 mb-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailEventComponent;
