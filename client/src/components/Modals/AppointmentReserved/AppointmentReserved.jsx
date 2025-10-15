import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";

export const AppointmentReserved = ({
  reserved,
  showModal,
  setShowModal,
  handleClose,
}) => {
  console.log(reserved);

  const { user, token } = useContext(AuthContext);
  const [reservaEnviada, setReservaEnviada] = useState(false);

  const enviaReserva = async () => {
    setShowModal(false);

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
     
      setReservaEnviada(true)


    } catch (error) {
      console.log(error);
    }
  };

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
        Tu reserva está pendiente de aprobación. Te enviaremos un email con la confirmación.
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
  );
};
