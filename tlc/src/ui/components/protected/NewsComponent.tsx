import { useState, useEffect } from "react";
import { cogIcon } from "../../../assets/images";

import useGetThreads from "../../../services/useGetThreads";
import { useUserData } from "../../../services/useUserData";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderMini } from "../LoaderMini";
import { Thread } from "../../../interfaces";
import ThreadItem from "./ThreadItem";
import Cookie from "js-cookie";
import { useAuth } from "../../hooks/useAuth";

export const NewsComponent = () => {
  const { userData } = useAuth();
  const { data } = useUserData(userData?._id);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");
  const [selectedTheme, setSelectedTheme] = useState("");

  const { threads, hasNextPage, fetchNextPage } = useGetThreads(
    userData?._id,
    data?.themesprefered,
    orderBy,
    selectedTheme
  );

  useEffect(() => {
    const orderByFromCookie = Cookie.get("orderBy");
    const selectedThemeFromCookie = Cookie.get("selectedTheme");

    if (orderByFromCookie) {
      setOrderBy(orderByFromCookie as "asc" | "desc");
    }

    if (selectedThemeFromCookie) {
      setSelectedTheme(selectedThemeFromCookie);
    }
  }, []);

  const handleOrderByChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value as "asc" | "desc";
    setOrderBy(newValue);
    Cookie.set("orderBy", newValue);
  };

  const handleThemeChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setSelectedTheme(newValue);

    if (newValue === "") {
      Cookie.remove("selectedTheme");
    } else {
      Cookie.set("selectedTheme", newValue);
    }
  };

  // const threads = threads.filter((thread) =>
  //   selectedTheme ? thread.threadTemathic!.includes(selectedTheme) : true
  // );

  const hasMoreData = !!hasNextPage && threads.length > 0;

  return (
    <>
      <div className="activity d-flex justify-content-between align-items-center mt-5 ms-3 me-3">
        <div>
          <h3>Novedades</h3>
        </div>

        <div>
          <button className="btn">
            <img src={cogIcon} alt="Settings" className="navbar-cog-icon" />
          </button>
        </div>
      </div>

      <div className=" d-flex justify-content-between align-items-center mt-5 ms-3 me-3">
        <select
          className="form-control-global"
          value={orderBy}
          onChange={handleOrderByChange}
        >
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguos primero</option>
        </select>
        <div className="divisor">&nbsp;</div>
        <select
          className="form-control-global"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value="">Selecciona por tus temas</option>
          {userData?.themesprefered?.map((theme: string, index: number) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 activity mt-5">
        <InfiniteScroll
          dataLength={threads.length}
          next={fetchNextPage}
          hasMore={hasMoreData}
          loader={<LoaderMini />}
          endMessage={
            threads.length > 0 ? (
              <p>
                <b>¡Has visto todas las novedades!</b>
              </p>
            ) : null
          }
          scrollThreshold={0.9}
        >
          {threads && threads.length > 0 ? (
            threads
              .sort((a, b) => {
                if (orderBy === "asc") {
                  return (
                    new Date(a.publishDate!).getTime() -
                    new Date(b.publishDate!).getTime()
                  );
                } else {
                  return (
                    new Date(b.publishDate!).getTime() -
                    new Date(a.publishDate!).getTime()
                  );
                }
              })
              .map((thread: Thread, index: number) => {
                try {
                  return (
                    <ThreadItem key={index} allData={thread} user={data?._id} />
                  );
                } catch (error) {
                  console.error("Error mapeando hilo:", error);
                  return null;
                }
              })
          ) : (
            <p className="text-center">
              No hay novedades disponibles para los temas solicitados
            </p>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};
