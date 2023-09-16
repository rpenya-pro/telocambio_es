import { returnIsTypeOf } from "../../../infrastructure/helpers/returnIsTypeOf";
import useFetchThreadById from "../../../services/useFetchThreadById";
import { useUserData } from "../../../services/useUserData";
import { useAuth } from "../../hooks/useAuth";
import useDateFormat from "../../hooks/useDateFormat";
import { DetailCharacteristics } from "./DetailCharacteristics";

import { InteractiveImage } from "./InteractiveImage";

import { OwnerIndicator } from "./OwnerIndicator";
import { ThemeBadges } from "./ThemeBadges";

interface DetailComponentProps {
  identificador: string;
}

/**
 * Página Detalle de un thread para el proposal
 * @returns
 */

export const ThreadDetailProposal: React.FC<DetailComponentProps> = ({
  identificador,
}) => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const { formatDate } = useDateFormat();
  const { data: dataByType } = useFetchThreadById(identificador);

  if (!dataByType) return null;

  return (
    <>
      <div className="mt-2">
        <div className="row thread-item">
          <div className="col-md-12 pe-4">
            <InteractiveImage
              allImages={dataByType?.threadImages}
              alt={dataByType.description || ""}
            />
            <hr />
          </div>
          <div className="col-md-12">
            <div className="mb-3">
              {returnIsTypeOf(dataByType?.typeOfThread)}
            </div>
            <h2>{dataByType.description || ""}</h2>
            <h3>{dataByType?.author || ""}</h3>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <p>
                {formatDate(dataByType.publishDate!, "fullDate")} a las{" "}
                {formatDate(dataByType.publishDate!, "time")}
              </p>
              {dataByType.owner &&
                data?._id &&
                (dataByType.owner !== "Cargando propietario" ? (
                  <OwnerIndicator ownerId={dataByType.owner} user={data?._id} />
                ) : null)}
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
