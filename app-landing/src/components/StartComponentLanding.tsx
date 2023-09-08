import { useGetPayloadFromToken, useValidateToken } from "teloc-hooks";
import React, { useRef } from "react";
import ModalWindow from "./ModalWindow";

export const StartComponentLanding = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  let modalInstance: any = null;

  const payload = useGetPayloadFromToken();
  const isValid = useValidateToken();

  const openModal = () => {
    const BootstrapModal = (window as any).bootstrap.Modal;
    const modal = new BootstrapModal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });
    modal.show();
  };

  const closeModal = () => {
    if (modalInstance) {
      modalInstance.hide();
    }
  };

  return (
    <>
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
                En tu area de usuario podrás configurar tu privacidad y tus
                datos. Cuando alguien busque algo que tú tengas, aparecerá en la
                búsqueda, la persona contactará contigo a través de esta
                aplicación y podréisrealizar el intercambio como queráis.
              </p>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12 text-center mb-5">
            <div>
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
                  className="btn landing__big-button-primary"
                  onClick={openModal}
                >
                  ¡Intercambia ahora!
                </button>
              )}
            </div>

            <div className="mt-4">
              <h6>
                Si ya estás registrada/o, puedes acceder a tu cuenta{" "}
                <a href="#" className="landing__link-context">
                  aquí.
                </a>
              </h6>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <ModalWindow closeModal={closeModal} modalRef={modalRef} />
    </>
  );
};
