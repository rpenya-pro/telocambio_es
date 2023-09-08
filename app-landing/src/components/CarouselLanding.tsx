import React, { useRef, useState } from "react";
import { logoTeLoCambio } from "../assets/images";
import { Carousel } from "./Carousel";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "../auth/Login";
import ModalWindow from "./ModalWindow";
import { useGetPayloadFromToken, useValidateToken } from "teloc-hooks";

export const CarouselLanding = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const payload = useGetPayloadFromToken();
  const isValid = useValidateToken();

  return (
    <>
      <div className="container landing mt-5 mb-5">
        <div className="row">
          <div className="col-md-5 order-2 pe-5 order-md-1">
            <div>
              <Carousel />
            </div>
          </div>
          <div className="col-md-7 order-1 ps-5 order-md-">
            <div className="mb-3 mt-5">
              <img
                src={logoTeLoCambio}
                alt="TeLoCambioEs, conecta con personas e intercambia"
                className="landing__logotipo"
              />
            </div>
            <div>
              <h4>
                Conecta con personas y cambia lo que tienes por lo que deseas.
              </h4>
            </div>
            <div className="mt-5">
              {payload && isValid ? (
                <>
                  <a
                    className="btn landing__button-primary pt-2"
                    href="/dashboard"
                  >
                    Entra en tu área de usuario
                  </a>
                </>
              ) : (
                <button
                  className="btn landing__button-primary"
                  onClick={handleShow}
                >
                  ¡Intercambia ahora!
                </button>
              )}
            </div>
            <div className="mt-5">
              <h5>
                ¿Aún no tienes claro cómo hacerlo?{" "}
                <a href="/faq" className="landing__link-context">
                  te loexplico!
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <ModalWindow show={show} handleClose={handleClose} />
    </>
  );
};
