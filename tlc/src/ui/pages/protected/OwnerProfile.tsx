import { useEffect, useState } from "react";
import { useGetOwnerSlugData } from "../../../services/useGetOwnerSlugData";
import { useParams } from "react-router-dom";
import useDateFormat from "../../hooks/useDateFormat";
import { OwnerIndicator } from "../../components/protected/OwnerIndicator";
import { ThemeBadges } from "../../components/protected/ThemeBadges";

/**
 * Página del Propietario de un Thread
 * llamamos propietario a todo usuario que no sea el logeado
 * @returns
 */
export const OwnerProfile = () => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { slug } = useParams();
  const { data: OwnerData, isLoading, isError } = useGetOwnerSlugData(slug!);

  const { formatDate } = useDateFormat();

  // Almacenar la fecha de la última actualización cuando se cargan los datos
  useEffect(() => {
    if (!isLoading && !isError) {
      setLastUpdated(new Date());
    }
  }, [isLoading, isError]);

  // Actualizar los datos cada 60 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {}, 60000); // 60 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return OwnerData?.privateProfile ? (
    <>Este perfil es privado</>
  ) : (
    <div className="container ownerprofile">
      <div className="row">
        <div className="col-md-3 ownerprofile__left">
          <div className="d-flex justify-content-center">
            <div className="circular-image-container-big">
              <img
                src={`${OwnerData?.avatar}`}
                alt={`${OwnerData?.firstName} ${OwnerData?.lastName}`}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4 text-center">
            <h2 className="texto-blanco">
              {OwnerData?.firstName} {OwnerData?.lastName}
            </h2>
          </div>
          <div className="d-flex justify-content-center  text-center">
            <h5 className="texto-blanco small">@{OwnerData?.slug}</h5>
          </div>

          <hr className="white-hr mb-4" />
          <div>
            <p className="p-0 m-0 texto-blanco small sans-serif">
              Miembro desde:
            </p>
            <hr className="white-hr" />
            <p className="p-0 m-0 texto-blanco">
              {OwnerData ? formatDate(OwnerData.memberSince!, "fullDate") : ""}
            </p>
          </div>

          <div className="mt-4">
            <p className="p-0 m-0 texto-blanco small sans-serif">
              Calificación:
            </p>
            <hr className="white-hr mb-4" />
            <p className="p-0 m-0 texto-blanco">{OwnerData?.rating}</p>
          </div>

          <div className="mt-4">
            <p className="p-0 m-0 texto-blanco small sans-serif">
              Temas preferidos:
            </p>
            <hr className="white-hr " />
            <div className="p-0 m-0 texto-blanco ">
              <ThemeBadges themes={OwnerData?.themesprefered} section={""} />
            </div>
          </div>
          <div className="mt-5">
            <p className="p-0 m-0 texto-blanco small sans-serif">Amigos:</p>
            <hr className="white-hr " />
            <ul className="p-0 m-0 texto-blanco">
              {OwnerData?.friends &&
                OwnerData.friends.map((friend, index) => (
                  <div key={index} className="cursor">
                    <OwnerIndicator
                      ownerId={friend.idFriend}
                      user={OwnerData?._id}
                      addedOn={""}
                    />
                  </div>
                ))}
            </ul>
          </div>

          {lastUpdated && (
            <div className="text-white small sans-serif mt-5">
              (Última actualización: {formatDate(lastUpdated, "fullDate")})
            </div>
          )}
        </div>
        <div className="col-md-9 ownerprofile__right">
          {isLoading && <div>Cargando...</div>}{" "}
          {/* Muestra un mensaje de carga si isLoading es true */}
          {isError && <div>Error al cargar los datos</div>}{" "}
          {/* Muestra un mensaje de error si isError es true */}
          {!isLoading && !isError && (
            /* Renderiza los datos si no hay carga ni errores */
            <div>
              Threads de este owner:{" "}
              {/* Puedes mostrar aquí los datos de OwnerData */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
