// hooks/useDeleteProposal.tsx

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Proposal from "../interfaces/proposal";

const API_URL = import.meta.env.VITE_API_URL || "";

const deleteProposal = async (proposalId: string): Promise<Proposal> => {
  const { data } = await axios.delete<Proposal>(
    `${API_URL}/proposal/delete/${proposalId}`
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
