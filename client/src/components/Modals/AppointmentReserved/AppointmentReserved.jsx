  import React from 'react'
import { Button, Modal } from 'react-bootstrap';


  
  export const AppointmentReserved = ({ reserved, showModal, setShowModal}) => {


    const enviaReserva = () => {
        console.log("Reserva enviada", reserved)
        setShowModal(false)
    }

    return (

    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserva pendiente de confirmar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Has seleccionado una cita libre de{" "}
          {new Date(reserved?.start).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          a{" "}
          {new Date(reserved?.end).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          .
          <br />
          Tu reserva está pendiente de aprobación.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={enviaReserva}>
            Enviar reserva
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  
  