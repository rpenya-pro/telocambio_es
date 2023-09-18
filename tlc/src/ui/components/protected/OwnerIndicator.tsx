import React from "react";
import { useGetOwnerData } from "../../../services/useGetOwnerData";
import { useNavigate } from "react-router-dom";

interface PropsOwner {
  ownerId: string;
  addedOn?: string;
  user: string | undefined;
}
const baseUrl = import.meta.env.VITE_HOST_URL;
export const OwnerIndicator: React.FC<PropsOwner> = ({
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
      {ownerId === user ? (
        <div className="mb-3 small sans-serif text-color-magenta">
          Este Thred es tuyo
        </div>
      ) : (
        <>
          {OwnerData?.privateProfile ? (
            <div className="mt-2 mb-4 small sans-serif text-color-bluegrey">
              <p>
                <strong>Usuario anónimo.</strong>
              </p>
              <p className="p-0 m-0">
                Este usuario ha preferido mantenerse en el anonimato.{" "}
              </p>
              <p>
                En el momento de proceder al intercambio se identificará
                adecuadamente.
              </p>
            </div>
          ) : (
            <div className="card p-2 mt-2 mb-3" onClick={handleNavigateProfile}>
              <div className="d-flex justify-content-start align-items-center">
                <div>
                  <div className="circular-image-container">
                    <img
                      src={`${OwnerData?.avatar}`}
                      alt={`${OwnerData?.firstName} ${OwnerData?.lastName}`}
                    />
                  </div>
                </div>
                <div className="ms-3">
                  <h5>
                    {OwnerData?.firstName} {OwnerData?.lastName}
                  </h5>
                  <p className="small">Amigo desde: {addedOn}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
