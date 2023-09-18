// hooks/useDeleteProposal.tsx

import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios"; // Importa la nueva instancia
import Proposal from "../interfaces/proposal";

const deleteProposal = async (proposalId: string): Promise<Proposal> => {
  const { data } = await axiosInstance.delete<Proposal>(
    `/proposal/delete/${proposalId}`
  );
  return data;
};

export const useDeleteProposal = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteProposal, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userProposals", userId]);
    },
  });
};
