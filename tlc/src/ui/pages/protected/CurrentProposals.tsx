import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../../services/useUserData";
import { useNavigate } from "react-router-dom";
import { useUserProposals } from "../../../services/useUserProposals";
import Proposal from "../../../interfaces/proposal";
import useDateFormat from "../../hooks/useDateFormat";
import { OwnerIndicator } from "../../components/protected/OwnerIndicator";
import { OwnerIndicatorNoAnonim } from "../../components/protected/OwnerIndicatorNoAnonim";
import { ThreadDetailProposal } from "../../components/protected/ThreadDetailProposal";
import { ThreadDetailProposalTable } from "../../components/protected/ThreadDetailProposalTable";
import { useDeleteProposal } from "../../../services/useDeleteProposal";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";

export const CurrentProposals = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const { formatDate } = useDateFormat();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const queryClient = useQueryClient();

  const { data: proposals, isLoading, isError } = useUserProposals(data?._id!);

  const deleteProposalMutation = useDeleteProposal(data?._id!);

  const handleDeleteProposal = (proposalId: string) => {
    Swal.fire({
      title: "Deseas retirar esta propuesta?",
      text: "Una vez retirada, e lusuario no podrá responderla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Retírala!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProposalMutation.mutate(proposalId, {
          onSuccess: () => {
            Swal.fire("¡Borrado!", "El registro ha sido borrado.", "success");
            queryClient.refetchQueries("proposals");
            setRefresh(!refresh);
          },
          onError: () => {
            Swal.fire(
              "Error",
              "Ha ocurrido un error al borrar el registro.",
              "error"
            );
          },
        });
      }
    });
  };

  if (isLoading) {
    return <div>Cargando propuestas...</div>;
  }

  if (isError) {
    return <div>Error al cargar las propuestas.</div>;
  }

  return (
    <div className="container proposition mb-5">
      <div className="row mt-5 mb-4">
        <div className="col-12">
          <h2>Tus propuestas en curso</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Proposal Reference</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Article Interested</th>
                  <th scope="col">My Offer Article</th>
                  <th scope="col">Proposal Date</th>
                  <th scope="col">Expire Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal: Proposal, index: number) => (
                  <tr key={index}>
                    <td>{proposal.proposalReference}</td>
                    <td style={{ maxWidth: "200px" }}>
                      <div className="ownerprofile">
                        <div className="cursor">
                          <OwnerIndicatorNoAnonim
                            ownerId={proposal.owner}
                            user={data?._id!}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ maxWidth: "270px", minWidth: "225px" }}>
                      <div className="thread-table">
                        <ThreadDetailProposalTable
                          identificador={proposal.articleInterested}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="thread-table">
                        <ThreadDetailProposalTable
                          identificador={proposal.myOfferArticle}
                        />
                      </div>
                    </td>
                    <td>
                      {formatDate(proposal.proposalDate!, "shortDate")}:
                      {formatDate(proposal.proposalDate!, "time")}
                    </td>
                    <td>
                      {formatDate(proposal.expireDate!, "shortDate")}:
                      {formatDate(proposal.expireDate!, "time")}
                    </td>
                    <td>
                      mensajes
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProposal(proposal._id!)}
                      >
                        Retirar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
