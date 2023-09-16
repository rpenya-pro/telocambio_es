import React, { useEffect, useState } from "react"; //propositionNumber
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { safeBase64Decode } from "../../../infrastructure/helpers/encodeAndDecode";
import { ThreadDetailProposal } from "../../components/protected/ThreadDetailProposal";
import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../../services/useUserData";
import useGetThreadsByMe from "../../../services/useGetThreadsByMe";
import MyThreads from "../../components/protected/MyThreads";
import useFetchThreadById from "../../../services/useFetchThreadById";
import { useProposition } from "../../../infrastructure/context/propositionContext";
import { useUserProposals } from "../../../services/useUserProposals";
import Proposal from "../../../interfaces/proposal";

interface DoPropositionProps {
  description: string | undefined;
}

export const DoProposition: React.FC<DoPropositionProps> = ({
  description,
}) => {
  const [proposition, setProposition] = useState<{
    owner: string;
    ident: string;
    descr: string;
    selectedThread?: string;
    reference?: string;
  } | null>(null);
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const { threads } = useGetThreadsByMe(data!);
  const { cookieName } = useParams<{ cookieName: string }>();
  const {
    data: selectedThreadData,
    isError,
    isLoading,
  } = useFetchThreadById(proposition?.selectedThread || "");
  const { setProposition: setGlobalProposition } = useProposition();
  const { data: userProposalsData } = useUserProposals(userData?._id!);
  const [coincidence, setCoincidence] = useState(false);

  useEffect(() => {
    const foundProposal = userProposalsData?.find(
      (proposal: Proposal) => proposal.proposalReference === cookieName
    );
    if (foundProposal) {
      setCoincidence(true);
    } else {
      setCoincidence(false);
    }
  }, [cookieName, userProposalsData]);

  const handleButtonClick = () => {
    setGlobalProposition(proposition);
    navigate(`/step1/${cookieName}`);
  };

  useEffect(() => {
    if (cookieName) {
      const cookieValue = Cookies.get(cookieName);
      if (cookieValue) {
        const decodedProposition = safeBase64Decode(cookieValue);
        setProposition(decodedProposition);
      }
    }
  }, [cookieName]);

  if (!proposition) {
    return null;
  }

  const handleThreadSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedThreadId = event.target.value;
    setProposition((prevProp) => {
      if (prevProp) {
        return {
          ...prevProp,
          selectedThread: selectedThreadId,
          reference: cookieName,
        };
      }
      return prevProp;
    });
  };

  if (isLoading) {
    return <p>Cargando información del thread...</p>;
  }

  if (isError) {
    return <p>Error al cargar el thread.</p>;
  }

  return (
    data && (
      <div className="container proposition mt-5 mb-5">
        <h2>Proposición {proposition && cookieName}</h2>
        {proposition ? (
          <>
            {/* <p>Owner: {proposition.owner}</p>
          <p>Ident: {proposition.ident}</p>
          <p>Name: {proposition.descr}</p>
          <p>Referencia: {cookieName}</p> */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card p-4">
                  <h5>Quiero esto.</h5>
                  <p>Este es el artículo que deseas.</p>
                  <ThreadDetailProposal identificador={proposition.ident} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card p-4">
                  {coincidence ? (
                    <>
                      <h2>
                        Ya existe una propuesta para este artículo, puedes verla
                        en (LINK)
                      </h2>
                    </>
                  ) : (
                    <>
                      <h5>Ofrezco esto.</h5>
                      <p className="mb-3">
                        A continuación tienes una lista de todos tus threads
                        creados. Si deseas utilizar alguno de ellos para
                        proponer un cambio, seleccionalo.
                      </p>
                      <div>
                        <MyThreads
                          threads={threads}
                          onThreadSelect={handleThreadSelection}
                        />
                      </div>
                    </>
                  )}

                  {selectedThreadData &&
                  selectedThreadData.description &&
                  selectedThreadData.description.trim() !== "" ? (
                    <div className="mt-3">
                      <p>Has seleccionado tu Thread</p>
                      <div className="card p-2">
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            className="mini-image me-4"
                            src={`/images/${
                              selectedThreadData.threadImages![0]
                            }`}
                            alt={selectedThreadData.description}
                          />
                          <h5>{selectedThreadData.description}</h5>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        {coincidence ? (
                          <>Esta propuesta ya se hizo.</>
                        ) : (
                          <button
                            className="landing__button-primary"
                            onClick={handleButtonClick}
                          >
                            ¡Ok, hagámoslo!
                          </button>
                        )}
                      </div>

                      <p className="mt-4 small sans-serif text-color-bluegrey">
                        Cuando pulses el botón se iniciará el proceso para el
                        intercambio. Puedes retirar la propuesta cuando creas
                        conveniente.
                      </p>
                    </div>
                  ) : null}

                  {coincidence ? (
                    <></>
                  ) : (
                    <>
                      <p className="mt-5 small sans-serif text-color-bluegrey">
                        Si por el contrario deseas crear un nuevo artículo para
                        cambiar por el artículo "<b>{proposition.descr}</b>"",
                        puedes crearlo en tu área privada y volver después a
                        esta proposición en tu espacio "Mis Propuestas &gt;
                        almacenadas"
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No se encontró la proposición.</p>
        )}
      </div>
    )
  );
};
