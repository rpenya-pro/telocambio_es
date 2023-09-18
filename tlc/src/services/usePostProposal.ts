import { useMutation } from "react-query";
import { axiosInstance } from "../infrastructure/api/axios"; // Importamos la nueva instancia
import Proposal from "../interfaces/proposal";
import Swal from "sweetalert2";

interface UsePostProposalConfig {
  onSuccess?: (...args: any[]) => void;
  onError?: (error: any) => void;
  // Puedes añadir más propiedades aquí si necesitas otras configuraciones personalizadas.
}

const postProposal = async (proposal: Proposal) => {
  const response = await axiosInstance.post(`/proposal/new`, proposal); // Usamos la instancia y no necesitamos el URL base
  return response.data;
};

export const usePostProposal = (config: UsePostProposalConfig = {}) => {
  return useMutation((proposal: Proposal) => postProposal(proposal), {
    ...config,
    onSuccess: (...args) => {
      // Mostrar SweetAlert2 cuando la operación sea exitosa
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Tu propuesta ha sido enviada con éxito.",
        confirmButtonText: "Entendido",
      });

      // Llamar a onSuccess del config si existe
      config.onSuccess?.(...args);
    },
    onError: (error: any) => {
      // Mostrar SweetAlert2 cuando ocurra un error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al enviar tu propuesta.",
        confirmButtonText: "Intentar de nuevo",
      });

      // Llamar a onError del config si existe
      config.onError?.(error);
    },
  });
};
