import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import React from "react";

function ModalLoginRegister() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <LoginComponent />
          <RegisterComponent />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalLoginRegister;
