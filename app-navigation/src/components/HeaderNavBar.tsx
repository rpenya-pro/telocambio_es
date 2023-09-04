import React, { useState } from "react";
import { logoTeLoCambio, homeIcon } from "../assets/images";

import ErrorBoundary from "./ErrorBoundary";

interface HeaderNavBarProps {
  authenticated: boolean;
  logout: () => void;
}

const HeaderNavBar: React.FC<HeaderNavBarProps> = ({
  authenticated,
  logout,
}) => {
  const [isLanding, setIsLanding] = useState<boolean>(true);

  const handleLogout = () => {
    logout();
  };

  return (
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
                <a className="nav-link active" aria-current="page" href="#">
                  <img
                    src={homeIcon}
                    alt="Home Page"
                    className="navigation__iconos-nav"
                  />
                </a>
              </li>
              <li className="nav-item navigation__item">
                <a className="nav-link" href="#">
                  Contacta
                </a>
              </li>
              <li className="nav-item navigation__item navigation__item--divider">
                <a className="nav-link" href="#">
                  FAQs
                </a>
              </li>

              {authenticated ? (
                <li className="nav-item dropdown navigation__item navigation__item--accede">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hola, chaval
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
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
                </li>
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
