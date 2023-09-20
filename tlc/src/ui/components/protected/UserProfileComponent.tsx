import useDateFormat from "../../hooks/useDateFormat";

import { useUserData } from "../../../services/useUserData";
import { FriendsComponent } from "./FriendsComponent";
import { useAuth } from "../../hooks/useAuth";

export const UserProfileComponent = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const { formatDate } = useDateFormat();

  return data?.privateProfile ? (
    <>Este perfil es privado</>
  ) : (
    <div className="ownerprofile">
      <div className="d-flex justify-content-center mt-5">
        <div className="circular-image-container-big">
          <img
            src={`${data?.avatar}`}
            alt={`${data?.firstName} ${data?.lastName}`}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4 text-center">
        <h2>
          {data?.firstName} {data?.lastName}
        </h2>
      </div>
      <div className="d-flex justify-content-center  text-center">
        <h5 className=" small">@{data?.slug}</h5>
      </div>

      <hr className=" mb-4" />
      <div>
        <p className="p-0 m-0  small sans-serif">Miembro desde:</p>
        <p className="p-0 m-0 small">
          {data ? formatDate(data.memberSince!, "fullDate") : ""}
        </p>
        <hr className=" mb-2" />
      </div>

      <div className="mt-3">
        <p className="p-0 m-0  small sans-serif">Calificación:</p>
        <p className="p-0 m-0 ">{data?.rating}</p> <hr className=" mb-2" />
      </div>

      <div className="mt-2">
        <p className="p-0 m-0 mb-3  small sans-serif">Temas preferidos:</p>
        <div className="p-0 m-0  ">
          {/* <ThemeBadges themes={data?.themesprefered} section={""} /> */}
        </div>
        <hr className=" mb-2" />
      </div>
      <div className="mt-4 ">
        <p className="p-0 m-0  small sans-serif">Amigos:</p>
        <hr className=" " />
        <FriendsComponent />
      </div>
    </div>
  );
};
