import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import useFetchThreadById from "../../../services/useFetchThreadById";
import { useUserData } from "../../../services/useUserData";
import useDateFormat from "../../hooks/useDateFormat";
import { ModalAdults } from "./ModalAdults";
import { InteractiveImage } from "./InteractiveImage";
import { OwnerIndicator } from "./OwnerIndicator";
import { ThemeBadges } from "./ThemeBadges";
import { useAuth } from "../../hooks/useAuth";
import { returnIsTypeOf } from "../../../infrastructure/helpers/returnIsTypeOf";
import { DetailCharacteristics } from "./DetailCharacteristics";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { safeBase64Encode } from "../../../infrastructure/helpers/encodeAndDecode";
import { generateRandomString } from "../../../infrastructure/helpers/randomChars";
import { findCookieKeyForArticle } from "../../../infrastructure/helpers/findCookieKey";

interface DetailComponentProps {
  originalData: string;
}

const randomString = generateRandomString();

/* verificamos si el valor de la cookie no está duplicado**/
const doesCookieValueExist = (valueToCheck: string): boolean => {
  const allCookies = Cookies.get();
  for (const key in allCookies) {
    if (allCookies[key] === valueToCheck) {
      return true; // El valor ya existe
    }
  }
  return false;
};

export const DetailComponent: React.FC<DetailComponentProps> = ({
  originalData,
}) => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const { formatDate } = useDateFormat();
  const { data: dataByType } = useFetchThreadById(originalData);

  const [showModal, setShowModal] = useState<boolean>(true);
  const accept = Cookies.get("accept_adult");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    accept === "true" ? setShowModal(false) : setShowModal(true);
  }, [accept]);

  if (!dataByType) return null;

  const joinedData = {
    owner: dataByType.owner,
    ident: dataByType._id!,
    descr: dataByType.description!,
  };
  const encodedData = safeBase64Encode(joinedData);

  // const imageUrl = dataByType.threadImages && dataByType?.threadImages[0];
  // const src = imageUrl ? `/images/${imageUrl}` : noImage;

  const handleProposition = () => {
    // Comprobar si el valor de la cookie ya existe
    if (doesCookieValueExist(encodedData)) {
      Swal.fire({
        icon: "info",
        title: "El valor de la proposición ya ha sido guardado previamente.",
        text: "Consulta el estado de tus propuestas.",
        footer: "<small>Si tienes alguna duda, contáctanos.</small>",
      });
      return;
    }

    // Agregar un timestamp para hacer la cookie única.
    const timestamp = Date.now();
    Cookies.set(`${randomString}-${timestamp}`, encodedData);

    navigate(`/proposal/${randomString}-${timestamp}`);
  };

  const cookieKey = findCookieKeyForArticle(encodedData);

  let randomPart = "";
  let timestampPart = "";
  if (cookieKey) {
    const parts = cookieKey.split("-");
    randomPart = parts[0];
    timestampPart = parts[1];
  }

  const goToProposal = () => {
    if (randomPart && timestampPart) {
      navigate(`/proposal/${randomPart}-${timestampPart}`);
    }
  };

  return (
    <>
      {dataByType?.isAdultContent && (
        <ModalAdults show={showModal} onHide={handleCloseModal} />
      )}

      <div className="mt-4 mt-5">
        <div className="row thread-item">
          <div className="col-md-4 pe-4">
            <InteractiveImage
              allImages={dataByType?.threadImages}
              alt={dataByType.description || ""}
            />

            <hr />
            <div className="text-center mt-5">
              {doesCookieValueExist(encodedData) ? (
                <>
                  <p>
                    Esta propuesta ya se ha realizado, puedes ir a verla
                    directamente
                  </p>
                  <button
                    className="landing__button-primary"
                    onClick={goToProposal}
                  >
                    Ir a la propuesta
                  </button>
                </>
              ) : data?._id === dataByType.owner ? (
                <p>No puedes intercambiar un thread tuyo!</p>
              ) : (
                <button
                  className="landing__button-primary"
                  onClick={() => handleProposition()}
                >
                  Proponer cambio
                </button>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              {returnIsTypeOf(dataByType?.typeOfThread)}
            </div>
            <h1>{dataByType.description || ""}</h1>
            <h3>{dataByType?.author || ""}</h3>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <p>
                {formatDate(dataByType.publishDate!, "fullDate")} a las{" "}
                {formatDate(dataByType.publishDate!, "time")}
              </p>
              {dataByType.owner && data?._id && (
                <OwnerIndicator ownerId={dataByType.owner} user={data?._id} />
              )}
            </div>
            <hr />
            <div>
              <ThemeBadges themes={dataByType?.threadTemathic} />
            </div>
            <hr />
            <div className="mt-4">
              <h5>Descripción del intercambio:</h5> {dataByType?.content}
            </div>
            <hr />
            <div className="mt-4">{dataByType?.threadDescription}</div>
            <div className="mt-4 mb-4">
              <DetailCharacteristics dataByType={dataByType} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailComponent;
