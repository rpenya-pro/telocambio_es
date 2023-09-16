import { useState, useEffect } from "react";
import { returnIsTypeOf } from "../../../infrastructure/helpers/returnIsTypeOf";
import useFetchThreadById from "../../../services/useFetchThreadById";
import { useUserData } from "../../../services/useUserData";
import { useAuth } from "../../hooks/useAuth";
import useDateFormat from "../../hooks/useDateFormat";
import { DetailCharacteristics } from "./DetailCharacteristics";
import { DetailComponent } from "./DetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { InteractiveImage } from "./InteractiveImage";
import { ModalAdults } from "./ModalAdults";
import { OwnerIndicator } from "./OwnerIndicator";
import { ThemeBadges } from "./ThemeBadges";
import { DoProposition } from "../../pages/protected/DoProposition";

interface DetailComponentProps {
  identificador: string;
}

/**
 * Página Detalle de un thread para el proposal
 * @returns
 */

export const ThreadDetailProposalTable: React.FC<DetailComponentProps> = ({
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
          <div className="d-flex justify-content-start">
            <img
              className="img-fluid me-2"
              src={`/images/${
                dataByType?.threadImages && dataByType?.threadImages![0]
              }`}
              alt={dataByType.description || ""}
            />
            <div>
              <p className="m-0 p-0">
                <strong>{dataByType.description || ""}</strong>
              </p>
              <p className="m-0 p-0">
                {formatDate(dataByType.publishDate!, "shortDate")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
