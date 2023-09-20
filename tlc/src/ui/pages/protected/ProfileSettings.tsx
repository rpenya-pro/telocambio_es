import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../../services/useUserData";
import { EditProfileImage } from "../../components/protected/edition/EditProfileImage";
import { EditProfileData } from "../../components/protected/edition/EditProfileData";
import { EditProfileAccountShow } from "../../components/protected/edition/EditProfileAccountShow";
import { EditProfileBlockedThemes } from "../../components/protected/edition/EditProfileBlockedThemes";
import { EditProfilePeopleBlocked } from "../../components/protected/edition/EditProfilePeopleBlocked";
import { EditProfilePreferedThemes } from "../../components/protected/edition/EditProfilePreferedThemes";
import { EditProfilePreferences } from "../../components/protected/edition/EditProfilePreferences";

export const ProfileSettings = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);

  if (!data?._id) {
    return;
  }

  const userId = data?._id;

  return (
    <div className="container edition mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <div className="col-12">
              <EditProfileImage userImage={data?.avatar} user={userId} />
            </div>
          </div>
          <EditProfileData usuario={data} />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-12">
              <EditProfilePreferences user={userId} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <EditProfilePreferedThemes user={userId} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <EditProfileBlockedThemes user={userId} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <EditProfilePeopleBlocked user={userId} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <EditProfileAccountShow
                user={userId}
                privateProfile={data?.privateProfile!}
                freezeProfile={data?.freezeProfile!}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
