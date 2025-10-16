import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";
import { Boton } from "../../Boton/Boton";
import "./AppointmentReserved.css"

export const AppointmentReserved = ({
  reserved,
  showModal,
  setShowModal,
  handleClose,
}) => {
  console.log(reserved);

  const { user, token } = useContext(AuthContext);
  const [reservaEnviada, setReservaEnviada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false)



  const enviaReserva = async () => {
    setEnviando(true);
    try {
      const datos = {
        user_id: user.user_id,
        email: user.email,
        app_status: 1,
        app_day: reserved.start.getDay(),
        app_hour: reserved.start.getHours(),
        app_date: reserved.start.toISOString().split("T")[0], // → '2025-10-13'
      };

      let result = await fetchData(
        "/appointment/reservedAppointment",
        "POST",
        datos,
        token
      );

      console.log(result);

      //cierro y elimino tramo reservado del calendario
      handleClose({
        app_date: datos.app_date,
        app_hour: datos.app_hour,
      });

      setReservaEnviada(true);
      setShowConfirmModal(true);

    } catch (error) {
      console.log(error);
    } finally {
      setEnviando(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      setReservaEnviada(false);
    }
  }, [showModal]);

  return (
    <>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="modal-title fw-bold">
          Reserva pendiente de confirmar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-text text-gray-700">
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
        <p className="modal-text">
          Tu reserva está pendiente de aprobación. Te enviaremos un email con la
          confirmación.
        </p>
        
      </Modal.Body>
      <Modal.Footer>
        <Button 
        variant="outline-secondary" 
        onClick={() => setShowModal(false)}
        className="boton-cancelar rounded-pill"
        >
          Cancelar
        </Button>
          <Button 
          variant="success"
          onClick={enviaReserva} 
          disabled={reservaEnviada || enviando}
          className={`boton rounded-pill {reservaEnviada ? "pulse": ""}`}
          >

        {enviando ? (
          <>
          <span className="spinner-border spinner-border-sm me2" role="status"/>
          Enviando...
          </>
         ) : reservaEnviada ? "✅ Enviada" : "Enviar reserva"}   
          </Button>
      
      </Modal.Footer>
    </Modal>
    <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title className="modal-title-green fw-bold">Reserva enviada 🗓️</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className="modal-text">Tu reserva ha sido enviada correctamente y está pendiente de confirmación.</p>
    <hr />
    <p className="modal-text"><strong>Fecha:</strong> {reserved?.start.toLocaleDateString("es-ES")}</p>
    <p className="modal-text"><strong>Hora:</strong> {reserved?.start.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })} - {reserved?.end.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })}<span>hrs</span></p> 
  </Modal.Body>
  <Modal.Footer>
    <Boton onClick={() => setShowConfirmModal(false)}
    aspecto="btn-1" valor="Cerrar"
      />
   
  </Modal.Footer>
</Modal>

    </>
  );
};
