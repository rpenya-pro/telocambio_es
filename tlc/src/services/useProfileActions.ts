// hooks/useProfileActions.ts
import { useMutation, useQueryClient } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios";
import { useAuth } from "../ui/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const updateProfile = async (data: {
  userId: string;
  field: keyof Usuario;
  value: any;
}) => {
  console.log("MOSTRAMOS EL USER ID", data.userId);
  const response = await axiosInstance.patch(`/user/${data.userId}`, {
    [data.field]: data.value,
  });

  return response.data;
};

const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/user/${userId}`);
  return response.data;
};

export const useProfileActions = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { logout } = useAuth();

  const mutationUpdate = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
  });

  const mutationDelete = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
      Swal.fire({
        title: "¡Hecho!",
        text: "Tu cuenta ha sido eliminada, ¡vuelve pronto!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        navigation("/");
        logout();
      });
    },
  });

  const togglePrivateProfile = (userId: string, privateProfile: boolean) => {
    console.log("Toggling private profile for:", userId);
    mutationUpdate.mutate({
      userId: userId,
      field: "privateProfile",
      value: !privateProfile,
    });
  };

  const toggleFreezeProfile = (userId: string, freezeProfile: boolean) => {
    mutationUpdate.mutate({
      userId: userId,
      field: "freezeProfile",
      value: !freezeProfile,
    });
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminada, no podrás recuperar tu cuenta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      mutationDelete.mutate(userId);
    }
  };

  return {
    togglePrivateProfile,
    toggleFreezeProfile,
    handleDeleteUser,
  };
};
