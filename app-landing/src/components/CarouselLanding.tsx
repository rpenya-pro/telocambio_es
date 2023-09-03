import React, { useRef } from "react";
import { logoTeLoCambio } from "../assets/images";
import { Carousel } from "./Carousel";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "../auth/Login";

export const CarouselLanding = () => {
  const modalRef = useRef(null);
  let modalInstance: any = null;

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
              <button
                className="btn landing__button-primary"
                onClick={openModal}
              >
                ¡Intercambia ahora!
              </button>
            </div>
            <div className="mt-5">
              <h5>
                ¿Aún no tienes claro cómo hacerlo?{" "}
                <a href="" className="landing__link-context">
                  te loexplico!
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="landing modal fade" tabIndex={-1} ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered landing__modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Título del Modal</h5>
            </div>
            <div className="modal-body">
              <Login closeModal={closeModal} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
