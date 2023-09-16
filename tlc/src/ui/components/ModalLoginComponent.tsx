import React from "react";
import Modal from "react-bootstrap/Modal";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";

interface ModalLoginProps {
  show: boolean;
  onHide: () => void;
}

export const ModalLoginComponent: React.FC<ModalLoginProps> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="custom-close-button" closeButton></Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-5">
            <LoginComponent onSuccess={props.onHide} />
          </div>
          <div className="col-md-2">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div className="backline"></div>
            </div>
          </div>
          <div className="col-md-5">
            <RegisterComponent onSuccess={props.onHide} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
