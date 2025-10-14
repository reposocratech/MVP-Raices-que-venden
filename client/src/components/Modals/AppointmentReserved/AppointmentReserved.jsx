  import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';


  
  export const AppointmentReserved = ({ reserved, showModal, setShowModal}) => {
    console.log(reserved)

    const { user, token } = useContext(AuthContext)


    const enviaReserva =  async () => {
        try {
    
            const datos = {
                
                user_id: user.user_id,
                email: user.email,
                app_status: 1,
                app_day: reserved.start.getDay(),
                app_hour: reserved.start.getHours(),
                app_date: reserved.start.toISOString().split("T")[0], // → '2025-10-13'

            
            }

            
            let result = await fetchData('/appointment/reservedAppointment', 'POST', datos, token);
            
            console.log(result);     
            
        } catch (error) {
            
            console.log(error)
        }
        
        setShowModal(true)
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
  
  