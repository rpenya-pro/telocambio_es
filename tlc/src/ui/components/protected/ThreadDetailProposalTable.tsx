import useFetchThreadById from "../../../services/useFetchThreadById";

import useDateFormat from "../../hooks/useDateFormat";

interface DetailComponentProps {
  identificador: string;
}
const baseUrl = import.meta.env.VITE_HOST_URL;
/**
 * Página Detalle de un thread para el proposal
 * @returns
 */

export const ThreadDetailProposalTable: React.FC<DetailComponentProps> = ({
  identificador,
}) => {
  // const { userData } = useAuth();
  // const { data } = useUserData(userData?._id);
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
              src={`${baseUrl}/images/${
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
