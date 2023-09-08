import React, { useEffect, useState } from "react";
import { logoTeLoCambio, homeIcon, profileIcon } from "../assets/images";

import {
  ErrorProtectedComponent,
  LoaderGenericComponent,
  LoaderComponent,
} from "@app-shared/react-shared";

import {
  useGetPayloadFromToken,
  useValidateToken,
  useFetchUserById,
} from "teloc-hooks";

import ErrorBoundary from "./ErrorBoundary";

const HeaderNavBar: React.FC = () => {
  const payload = useGetPayloadFromToken();
  const isValid = useValidateToken();
  const { user, loading, error } = useFetchUserById(payload?._id);
  const [isLanding, setIsLanding] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleLogout = () => {};

  useEffect(() => {
    setIsAuth(payload ? true : false);
  }, [payload]);

  return isValid && loading ? (
    <LoaderGenericComponent />
  ) : (
    <ErrorBoundary>
      <nav className="navbar navbar-expand-lg navbar-light  navigation">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logoTeLoCambio}
              alt="TeLoCambioEs, conecta con personas e intercambia"
              className="navigation__logotipo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item navigation__item me-3">
                <a className="nav-link active" aria-current="page" href="/">
                  <img
                    src={homeIcon}
                    alt="Home Page"
                    className="navigation__iconos-nav"
                  />
                </a>
              </li>
              <li className="nav-item navigation__item">
                <a className="nav-link" href="/contacta">
                  Contacta
                </a>
              </li>
              <li className="nav-item navigation__item navigation__item--divider">
                <a className="nav-link" href="/faq">
                  Cómo funciona
                </a>
              </li>

              {isAuth && isValid ? (
                loading ? (
                  <LoaderComponent />
                ) : (
                  <li className="nav-item dropdown navigation__item navigation__item--accede">
                    <div className="d-flex align-items-center justify-content-between">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/dashboard"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={profileIcon}
                          alt="Profile"
                          className="navigation__profile-icon me-3"
                        />
                        {user?.firstName?.length > 10
                          ? user?.firstName?.substring(0, 10) + "..."
                          : user?.firstName}{" "}
                        {user?.lastName?.length > 10
                          ? user?.lastName?.substring(0, 10) + "..."
                          : user?.lastName}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a className="dropdown-item" href="/profile">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Historial de intercambio
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Historial de intercambio
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="btn dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                )
              ) : (
                <li className="nav-item dropdown navigation__item navigation__item--accede">
                  <a className="nav-link" href="#">
                    Accede
                  </a>
                </li>
              )}
            </ul>
            {isLanding ? null : (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </ErrorBoundary>
  );
};

export default HeaderNavBar;
