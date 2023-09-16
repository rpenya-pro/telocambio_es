import { useQuery } from "react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

const fetchUserProposals = async (userId: string) => {
  const { data } = await axios.get(
    `${API_URL}/proposal/proposalbyuser/${userId}`
  );
  return data;
};

export const useUserProposals = (userId: string) => {
  return useQuery(["userProposals", userId], () => fetchUserProposals(userId));
};
