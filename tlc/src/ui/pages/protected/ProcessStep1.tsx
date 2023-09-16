import React, { useEffect, useState } from "react";
import { useProposition } from "../../../infrastructure/context/propositionContext";
import { flechas } from "../../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import { usePostProposal } from "../../../services/usePostProposal";
import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../../services/useUserData";
import { useUserProposals } from "../../../services/useUserProposals";

export const ProcessStep1 = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const { proposition } = useProposition();
  const { cookieName } = useParams<{ cookieName: string }>();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { data: proposals, isLoading, isError } = useUserProposals(data?._id!);

  // Si no hay un ID de usuario, salimos.
  // if (!data?._id) {
  //   return null;
  // }

  // Si estamos cargando las propuestas, mostramos un indicador de carga.
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // Si hay un error cargando las propuestas, mostramos un mensaje de error.
  if (isError) {
    return <p>Hubo un error al cargar las propuestas.</p>;
  }

  // Verifica si alguna propuesta del usuario tiene un proposalReference que coincida con cookieName.
  const hasProposalStoredBefore = proposals.some(
    (proposal: { proposalReference: string | undefined }) =>
      proposal.proposalReference === cookieName
  );

  // Si encontramos una coincidencia, mostramos el mensaje de error.
  if (hasProposalStoredBefore) {
    return <>Esta propuesta ya fue almacenada antes</>;
  }

  const mutation = usePostProposal({
    onSuccess: () => {
      navigate("/current-proposals");
    },
  });

  const handleSendProposal = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      isChecked &&
      proposition?.owner &&
      proposition?.ident &&
      data?._id &&
      cookieName
    ) {
      const proposalData = {
        owner: proposition?.owner,
        articleInterested: proposition?.ident,
        myOfferArticle: proposition?.selectedThread!,
        user: data?._id,
        proposalDate: new Date(),
        proposalReference: cookieName,
      };
      mutation.mutate(proposalData);
    }
  };

  useEffect(() => {
    if (!proposition) {
      navigate(`/proposal/${cookieName}`);
    }
  }, [proposition, navigate]);

  return (
    <div className="container proposition mt-5 mb-5">
      <h1 className="mb-4">Proceso de intercambio</h1>
      <div className="row">
        <div className="col-md-4">
          <h6>
            A continuación se va a proceder a establecer la petición de
            intercambio. Esta petición consta de 3 factores clave
          </h6>

          <ol className="custom-list mt-5 mb-5">
            <li>Envías la proposición de intercambio al usuario</li>
            <li>
              Este la recibe y la valora. Si le interesa, acepta y propone la
              forma de materializar el intercambio
            </li>
            <li>
              Tú recibes esa propuesta y si estás de acuerdo, solamente tienes
              que cerrar el trato.
            </li>
          </ol>
          <h6>
            A partir de entonces cualquier transacción se llevará a cabo al
            margen de la plataforma telocambio.es
          </h6>
        </div>
        <div className="col-md-8 p-5">
          <div className="d-flex justify-content-between align-items-center p-5">
            <div>
              <h5>Quiero esto</h5>
              <div className="card p-3">
                {proposition?.owner} {proposition?.ident}
              </div>
            </div>
            <div>
              <img
                src={flechas}
                alt="Flechas de intercambio"
                className="process-icon-arrow"
              />
            </div>
            <div>
              <h5>Ofrezco esto</h5>
              <div className="card p-3">{proposition?.selectedThread}</div>
            </div>
          </div>
          <div className="text-center mt-4">
            {!isChecked && (
              <div className="small sans-serif text-color-magenta">
                Debes aceptar la mecánica de telocambio.es y la política de
                privacidad para continuar.
              </div>
            )}

            <hr />
            <form onSubmit={handleSendProposal}>
              <input
                type="checkbox"
                className="me-2"
                onChange={(e) => setIsChecked(e.target.checked)}
                checked={isChecked}
              />
              Acepto la mecánica de telocambio.es y la política de privacidad
              <hr />
              <button
                className="landing__button-primary mt-3"
                type="submit"
                disabled={!isChecked}
              >
                Enviar propuesta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
