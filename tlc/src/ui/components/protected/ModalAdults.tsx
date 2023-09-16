import React from "react";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

interface ModalAdultsThreadProps {
  show: boolean;
  onHide: () => void;
}

export const ModalAdults: React.FC<ModalAdultsThreadProps> = ({
  show,
  onHide,
}) => {
  const navigate = useNavigate();

  const handleOk = () => {
    Cookies.set("accept_adult", "true");
    onHide();
  };

  return (
    <div className="activity">
      <Modal size="lg" show={show} onHide={onHide} centered backdrop="static">
        <Modal.Body>
          <h1>
            El contenido que va a visualizar es solamente apto para adultos
          </h1>
          <p>
            Si tienes menso de 18 años, por favor, pulsa "Abandonar", de lo
            contrario pulsa en "Ok, continuar"
          </p>
          <div className="d-flex justify-content-between align-items-center mt-5">
            <div>
              <button className="btn red-button" onClick={() => navigate("/")}>
                Abandonar
              </button>
            </div>
            <div>
              <button className="btn blue-button" onClick={handleOk}>
                Ok, continuar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
