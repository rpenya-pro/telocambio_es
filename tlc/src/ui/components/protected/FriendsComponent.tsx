import useGetFriends from "../../../services/useGetFriends";
import { useUserData } from "../../../services/useUserData";
import { useAuth } from "../../hooks/useAuth";
import { OwnerIndicator } from "./OwnerIndicator";

export const FriendsComponent = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);

  const { friends, isLoading, isError, error } = useGetFriends(
    data?.friends || []
  );

  if (!friends) {
    return null;
  }
  if (isLoading) return <p>Cargando amigos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <div className="mt-4 activity ownerprofile mt-5 ms-3 me-3 ">
        {friends &&
          friends.map((friend, index) =>
            friend.privateProfile ? null : (
              <div className="cursor" key={index}>
                <OwnerIndicator
                  ownerId={friend._id!}
                  user={data?._id}
                  addedOn={new Date(friend.addedOn).toLocaleDateString()}
                />
              </div>
            )
          )}
      </div>
    </>
  );
};
