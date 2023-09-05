import React, { RefObject, FunctionComponent } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";

interface ModalWindowProps {
  closeModal: () => void;
  modalRef: RefObject<HTMLDivElement>;
}

const ModalWindow: FunctionComponent<ModalWindowProps> = ({
  closeModal,
  modalRef,
}) => {
  return (
    <div className="landing modal fade" tabIndex={-1} ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered landing__modal-dialog">
        <div className="modal-content">
          <div className="modal-body p-5">
            <div className="row">
              <div className="col-md-12 mb-4">
                <h3>Accede o regístrate</h3>
              </div>
            </div>
            <div className="row" id="left">
              <div className="col-md-5 ">
                <Login closeModal={closeModal} />
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div className="borderend"></div>
              </div>
              <div className="col-md-5" id="right">
                <Register closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
