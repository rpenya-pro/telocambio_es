import { useQuery, useMutation, useQueryClient } from "react-query";
import { Usuario } from "../interfaces/user";
import { axiosInstance } from "../infrastructure/api/axios";
import Swal from "sweetalert2";

export interface EnemyInfo {
  idEnemy: string;
  addedOn: Date;
}

const fetchEnemies = async (
  EnemiesInfo: EnemyInfo[] | undefined
): Promise<(Usuario & { addedOn: Date })[]> => {
  if (!EnemiesInfo || EnemiesInfo.length === 0) return [];

  const EnemyIds = EnemiesInfo.map((enemy) => enemy.idEnemy);
  const fetchPromises = EnemyIds.map((id) => axiosInstance.get(`/user/${id}`));
  const responses = await Promise.all(fetchPromises);
  const enemiesData = responses.map((res) => res.data);

  const enrichedEnemieysData = enemiesData.map((enemyData: Usuario, index) => ({
    ...enemyData,
    addedOn: EnemiesInfo[index].addedOn,
  }));

  return enrichedEnemieysData;
};

const unblockEnemyInDB = async (userId: string, enemyId: string) => {
  await axiosInstance.delete(`/user/${userId}/unblock/${enemyId}`, {
    data: {
      userId,
      enemyId,
    },
  });
};

const useGetEnemies = (EnemiesInfo: EnemyInfo[] | undefined) => {
  const queryClient = useQueryClient();

  const enemiesQuery = useQuery(
    ["getEnemies", EnemiesInfo],
    () => fetchEnemies(EnemiesInfo),
    {
      enabled: !!EnemiesInfo,
      cacheTime: 0,
    }
  );

  const unblockEnemyMutation = useMutation(
    (data: { userId: string; enemyId: string }) =>
      unblockEnemyInDB(data.userId, data.enemyId),
    {
      onMutate: ({ enemyId }) => {
        // Backup del estado actual.
        const previousEnemies = queryClient.getQueryData<
          (Usuario & { addedOn: Date })[]
        >(["getEnemies", EnemiesInfo]);

        // Actualización optimista: Elimina al enemigo de la lista.
        queryClient.setQueryData(["getEnemies", EnemiesInfo], (old: any) => {
          if (!old) return undefined;
          return old.filter((enemy: any) => enemy._id !== enemyId);
        });

        return { previousEnemies };
      },
      onError: (err: any, _, context: any) => {
        // En caso de error, revertir al estado anterior.
        console.error(err);
        if (context?.previousEnemies) {
          queryClient.setQueryData(
            ["getEnemies", EnemiesInfo],
            context.previousEnemies
          );
        }
      },
      onSuccess: () => {
        // Aquí es donde mostrarás el SweetAlert2
        Swal.fire({
          title: "Desbloqueado!",
          text: "El usuario ha sido desbloqueado con éxito.",
          icon: "success",
          confirmButtonText: "Entendido",
        });
        queryClient.invalidateQueries([
          "getEnemies",
          JSON.stringify(EnemiesInfo),
        ]);
      },
    }
  );

  return {
    enemies: enemiesQuery.data,
    isLoading: enemiesQuery.isLoading,
    isError: enemiesQuery.isError,
    error: enemiesQuery.error as any,
    unblockEnemy: unblockEnemyMutation.mutate,
  };
};

export default useGetEnemies;
