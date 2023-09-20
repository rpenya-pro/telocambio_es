import { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { EnemiesComponent } from "../EnemiesComponent";
import CustomButton from "../../CustomButton";

interface ProfilePeopleBlockedProps {
  user: string | undefined;
}

export const EditProfilePeopleBlocked: FC<ProfilePeopleBlockedProps> = ({
  user,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="row edition">
      <div className="col-md-12">
        <div className="edition__preferences-title mb-4">
          <strong>Persona Bloqueadas</strong>
        </div>
        <div className="row mb-1">
          <div className="col-6">
            <p>Pulsa para ver la lista de personas bloqueadas.</p>
          </div>
          <div className="col-3 globals">
            <CustomButton
              fontSize="14px"
              padding=""
              height="40px"
              onClick={handleShow}
            >
              Personas bloqueadas
            </CustomButton>
          </div>
        </div>
      </div>

      <BlockedPeopleModal user={user} show={showModal} onHide={handleClose} />
    </div>
  );
};

interface BlockedPeopleModalProps {
  user: string | undefined;
  show: boolean;
  onHide: () => void;
}

const BlockedPeopleModal: FC<BlockedPeopleModalProps> = ({
  user,
  show,
  onHide,
}) => {
  console.log(user);
  return (
    <Modal centered size="lg" show={show} onHide={onHide}>
      <Modal.Body>
        <h3>Personas bloqueadas</h3>
        <p>
          Estas son las personas que has bloqueado, no podrán ver tu contenido.
          Para desbloquearlas usa el botón desbloquear.
        </p>

        <EnemiesComponent />
      </Modal.Body>
    </Modal>
  );
};
