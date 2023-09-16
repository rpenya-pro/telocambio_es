import { useState } from "react";
import { ModalLoginComponent } from "../components/ModalLoginComponent";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent";
import { duoLibros, duoRopa, logoTeLoCambioNoPic } from "../../assets/images";
import { Skeleton } from "../components/Skeleton";
import { useUserData } from "../../services/useUserData";
import { useAuth } from "../hooks/useAuth";

/**
 * Página inicial - Home Page
 * @returns
 */

function HomePage() {
  const [modalShow, setModalShow] = useState(false);

  const { isAuthenticated, isLoading, userData } = useAuth();
  const { data } = useUserData(userData?._id);

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="homepage ">
      <div className="row landing">
        <div className="col-12">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card p-3 mt-5 mb-5">
                  <div className="row">
                    <div className="col-md-5 order-md-1 order-2 landing__only-padding-long">
                      <CarouselComponent />
                    </div>
                    <div className="col-md-7 order-md-2 order-1">
                      <div className="mt-4">
                        <img
                          src={logoTeLoCambioNoPic}
                          alt="TeLoCambioEs, conecta con personas e intercambia"
                          className="landing__logotipo"
                        />
                      </div>
                      <div className="mt-2 mb-5">
                        <h4>
                          Conecta con personas y cambia lo que tienes por lo que
                          deseas.
                        </h4>
                      </div>
                      {isAuthenticated ? (
                        <>
                          <Link to={`/${data?.slug}`}>
                            <Button
                              className="landing__button-primary"
                              variant="primary"
                            >
                              Entra en tu área
                            </Button>
                          </Link>

                          {/* <Button variant="primary" onClick={logout}>
                            Logout
                          </Button> */}
                        </>
                      ) : (
                        <>
                          <Button
                            className="landing__button-primary"
                            variant="primary"
                            onClick={() => setModalShow(true)}
                          >
                            ¡Intercambia ahora!
                          </Button>
                          <ModalLoginComponent
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </>
                      )}

                      <div className="mt-4">
                        <h5>
                          ¿Aún no tienes claro cómo hacerlo?{" "}
                          <Link to="/faq" className="landing__link-context">
                            te lo explico!
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="row landing-white">
        <div className="row">
          <div className="col-12">
            <div>
              <div className="container">
                <div className="row mt-5">
                  <div className="col-md-12 mt-5"></div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-5 mt-5 ps-5 pe-5">
                    <div className="ps-5 pe-5">
                      <img
                        src={duoLibros}
                        alt="duoLibros"
                        className="landing__icon-1"
                      />
                    </div>
                  </div>
                  <div className="col-md-7 mt-5">
                    <div>
                      <h3>¿Qué puedo intercambiar aquí?</h3>
                      <p className="mt-4">
                        Es sencillo, cosas tangibles, habilidades... por
                        ejemplo, tus vinilos, tus libros, algunas prendas de
                        ropa...
                      </p>
                      <p>
                        Se te da bien dibujar? los idiomas? el macramé o el
                        punto? puedes intercambiar tus habilidades conectando
                        con otras personas que tengan algo que cambiar.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12 mt-5"></div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-5  ps-5 pe-5">
                    <div className="ps-5 pe-5">
                      <img
                        src={duoRopa}
                        alt="duoRopa"
                        className="landing__icon-1"
                      />
                    </div>
                  </div>
                  <div className="col-md-7 pe-4">
                    <div>
                      <h3>¿Cuánto cuesta?</h3>
                      <p className="mt-4">
                        No cuesta nada. No hay ninguna transacción comercial
                        entre la gente que conecta.
                      </p>
                      <p>
                        La manera en la que llevarás a cabo el intercambio
                        depende de ti, solo conecta y el resto es sencillo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12 mb-5"></div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12 mb-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row landing-white">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row mt-5 mb-5">
                <hr />
                <div className="col-12 mt-5 mb-5">
                  <div>
                    <h3>Vale, ¿qué tengo que hacer?</h3>
                    <p className="mt-4">
                      Regístrate y sube tus cosas o habilidades. Ya está.
                    </p>
                    <p>
                      En tu area de usuario podrás configurar tu privacidad y
                      tus datos. Cuando alguien busque algo que tú tengas,
                      aparecerá en la búsqueda, la persona contactará contigo a
                      través de esta aplicación y podréisrealizar el intercambio
                      como queráis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-12 text-center mb-5">
                  <div>
                    {isAuthenticated ? (
                      <>
                        <a
                          className="btn landing__big-button-primary pt-2"
                          href={`/${data?.slug}`}
                        >
                          Entra en tu área de usuario
                        </a>
                      </>
                    ) : (
                      <>
                        <Button
                          className=" landing__big-button-primary"
                          variant="primary"
                          onClick={() => setModalShow(true)}
                        >
                          ¡Intercambia ahora!
                        </Button>
                        <ModalLoginComponent
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </>
                    )}
                  </div>

                  <div className="mt-4">
                    {isAuthenticated ? null : (
                      <h6>
                        Si ya estás registrada/o, puedes acceder a tu cuenta{" "}
                        <a href="#" className="landing__link-context">
                          aquí.
                        </a>
                      </h6>
                    )}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
