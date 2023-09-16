import React from "react";
import { Modal } from "react-bootstrap";
import { Thread } from "../../../interfaces";

interface ModalThreadProps {
  show: boolean;
  onHide: () => void;
  data: Thread | null; // Aquí especificas que esperas un objeto ModalData o null
}

export const ModalThread: React.FC<ModalThreadProps> = ({
  show,
  onHide,
  data,
}) => {
  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Body>
        <p>{data?.description}</p>
      </Modal.Body>
    </Modal>
  );
};
