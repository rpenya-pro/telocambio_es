import React from "react";
import { useGetOwnerData } from "../../../services/useGetOwnerData";
import { useNavigate } from "react-router-dom";

interface PropsOwner {
  ownerId: string;
  addedOn?: string;
  user: string | undefined;
}

export const OwnerIndicatorNoAnonim: React.FC<PropsOwner> = ({
  ownerId,
  addedOn,
  user,
}) => {
  const navigate = useNavigate();

  if (ownerId === "") {
    return;
  }

  const { data: OwnerData, isLoading, isError } = useGetOwnerData(ownerId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching owner data</div>;
  }

  const handleNavigateProfile = () => {
    navigate(`/profiles/${OwnerData?.slug}`);
  };

  return (
    <div className="globals">
      <>
        {OwnerData?.privateProfile ? (
          <div className="mt-2 mb-4 small sans-serif text-color-bluegrey">
            <p className="p-0 m-0">
              <strong>Usuario anónimo.</strong>
            </p>
            <p className="small p-0 m-0">
              Este usuario ha preferido mantenerse en el anonimato.
            </p>
            {/* comm //TODO cuando el usuario responda a la propuestadejará de ser anonimo para este caso */}
            <p className="small p-0 m-0">
              En el momento de proceder al intercambio se identificará
              adecuadamente.
            </p>
          </div>
        ) : (
          <div onClick={handleNavigateProfile}>
            <div className="d-flex justify-content-start align-items-center">
              <div>
                <div className="circular-image-container">
                  <img
                    src={`/images/${OwnerData?.avatar}`}
                    alt={`${OwnerData?.firstName} ${OwnerData?.lastName}`}
                  />
                </div>
              </div>
              <div className="ms-3">
                <p className="p-0 m-0">
                  <strong>
                    {OwnerData?.firstName} {OwnerData?.lastName}
                  </strong>
                </p>
                <p className="small p-0 m-0">Amigo desde: {addedOn}</p>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
