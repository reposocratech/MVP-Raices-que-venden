import React from "react";
import "./AlreadyBooked.css"; 
import { Boton } from "../../Boton/Boton";
import { Modal } from "react-bootstrap";

const AlreadyBookedModal = ({ show, onClose }) => {

  return (

<Modal
  className="modal-appReserved"
  show={show}
  onHide={onClose}
>
  <Modal.Header closeButton className="bg-light">
    <Modal.Title className="modal-title fw-bold">
      Cita ya reservada
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="modal-text text-gray-700">
    <p className="modal-text">
      Ya tienes una cita reservada para ese día.
    </p>
  </Modal.Body>

  <Modal.Footer>
    <Boton
      aspecto="btn-3"
      onClick={onClose}
      valor="Cerrar"
    />
    
  </Modal.Footer>
</Modal>

  );
};

export default AlreadyBookedModal;