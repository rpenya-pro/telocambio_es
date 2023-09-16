import React, { useState } from "react";
import Cookies from "js-cookie";
import { Helmet, HelmetProvider } from "react-helmet-async";
import noImage from "../../assets/images/noimage.png";
import { Badge, Button } from "react-bootstrap";
import useDateFormat from "../hooks/useDateFormat";
import ImageModal from "./ImageModal";
import useFetchThreadById from "../../services/useFetchThreadById";
import { ModalLoginComponent } from "./ModalLoginComponent";

//TODO boton para registrarse PERO guardar en cookies esta página para mostrarla de nuevo en modo protected cuando el usuario esté logeado

interface PublicDetailComponentProps {
  originalData: any;
}
//TODO boton para registrarse PERO guardar en cookies esta página para mostrarla de nuevo en modo protected cuando el usuario esté logeado
export const PublicDetailComponent: React.FC<PublicDetailComponentProps> = ({
  originalData,
}) => {
  // const HOST_URL = import.meta.env.VITE_HOST_URL || "";
  const hostUrl = "http://localhost:9008";

  const [modalShow, setModalShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //modal images
  const { formatDate } = useDateFormat();
  const {
    data: allData,
    isLoading,
    isError,
  } = useFetchThreadById(originalData);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError || !allData) {
    return <p>Error al cargar el thread</p>;
  }

  const handleStoreUrl = () => {
    Cookies.set("url_stored", `${hostUrl}/p/${allData}`);
  };

  const handleUnStoreUrl = () => {
    Cookies.remove("url_stored");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const truncatedDescription =
    allData.content && allData.content.length > 160
      ? `${allData.content.substring(0, 157)}...`
      : allData.content;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{allData.description}</title>
          <meta name="description" content={truncatedDescription} />
          <meta property="og:title" content={allData.description} />
          <meta
            property="og:image"
            content={
              allData.bookImages && allData.bookImages.length > 0
                ? `${hostUrl}/images/${allData.bookImages[0]}`
                : noImage
            }
          />
        </Helmet>
      </HelmetProvider>

      {isModalOpen && (
        <ImageModal
          src={`/images/${allData.bookImages && allData.bookImages[0]}`}
          alt={allData.description!}
          onClose={closeModal}
        />
      )}
      <div className="activity  mt-5 ">
        <div className="mt-4 mt-5">
          <div className="row thread-item">
            <div className="col-md-4">
              <div className="thread__square-container">
                <img
                  className="thread__square-image"
                  src={
                    allData.bookImages && allData.bookImages.length > 0
                      ? `/images/${allData.bookImages[0]}`
                      : noImage
                  }
                  alt={allData.description}
                  onClick={
                    allData.bookImages && allData.bookImages.length > 0
                      ? openModal
                      : () => {}
                  }
                />
              </div>
            </div>
            <div className="col-md-8">
              <h1>{allData.description}</h1>
              {/* isAdultContent? */}
              {/* threadTemathic?: string[];*/}
              <p>
                {formatDate(allData.publishDate!, "fullDate")} a las{" "}
                {formatDate(allData.publishDate!, "time")}
              </p>

              <div>
                {allData &&
                  allData.threadTemathic &&
                  allData.threadTemathic.map(
                    (
                      theme:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => <Badge key={index}>{theme}</Badge>
                  )}
              </div>
              <div className="mt-4">{allData.content}</div>
              <div className="mt-5 mb-5">
                <h6>
                  Para poder saber más sobre este intercambio, debes estar
                  registrado!
                </h6>
                <hr />
                <div className="text-center">
                  <Button
                    className="activity__button-primary"
                    variant="primary"
                    onClick={() => {
                      setModalShow(true);
                      handleStoreUrl();
                    }}
                  >
                    ¡Intercambia ahora!
                  </Button>
                </div>
                <ModalLoginComponent
                  show={modalShow}
                  onHide={() => {
                    setModalShow(false);
                    handleUnStoreUrl();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
