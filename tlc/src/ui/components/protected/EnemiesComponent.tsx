import useGetEnemies from "../../../services/useGetEnemies";
import { useUserData } from "../../../services/useUserData";
import { useAuth } from "../../hooks/useAuth";
import CustomButton from "../CustomButton";
import { OwnerIndicator } from "./OwnerIndicator";

export const EnemiesComponent = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);

  const { enemies, isLoading, isError, error, unblockEnemy } = useGetEnemies(
    data?.peopleBlocked || []
  );

  if (!enemies) {
    return null;
  }
  if (isLoading) return <p>Cargando personas bloqueadas...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="mt-4 activity ownerprofile mt-5 ms-3 me-3 ">
        {enemies &&
          enemies.map((enemy, index) =>
            enemy.privateProfile ? null : (
              <div
                key={index}
                className="d-flex justify-content-start align-items-center globals"
              >
                <div className="cursor me-3" style={{ flex: 9 }}>
                  <OwnerIndicator ownerId={enemy._id!} user={data?._id} />
                </div>
                <div style={{ flex: 1 }}>
                  <CustomButton
                    fontSize="14px"
                    padding=""
                    height="40px"
                    onClick={() =>
                      unblockEnemy({ userId: data?._id!, enemyId: enemy._id! })
                    }
                  >
                    Desbloquear
                  </CustomButton>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};
