import React, { RefObject, FunctionComponent, useRef, useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Button, Modal } from "react-bootstrap";

interface ModalWindowProps {
  show: boolean;
  handleClose: () => void;
}

const ModalWindow: FunctionComponent<ModalWindowProps> = ({
  show,
  handleClose,
}) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="row landing__modal-dialog">
            <div className="col-md-12 mb-4">
              <h3>Accede o regístrate</h3>{" "}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose} // Cierra la modal al hacer clic
              >
                Cerrar
              </button>
            </div>
          </div>
          <div className="row" id="left">
            <div className="col-md-5 ">
              <Login handleClose={handleClose} />
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <div className="borderend"></div>
            </div>
            <div className="col-md-5" id="right">
              <Register handleClose={handleClose} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalWindow;
