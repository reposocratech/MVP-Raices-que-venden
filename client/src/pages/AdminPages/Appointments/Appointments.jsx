import { Container, Row , Col} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContextProvider.jsx";

import { Boton } from "../../../components/Boton/Boton.jsx";
import { AdminAppointmentList } from "../../../components/AdminAppointmentList/AdminAppointmentList.jsx";
import AdminAppointmentCalendar from "../../../components/AdminAppointmentCalendar/AdminAppointmentCalendar.jsx";
import { fetchData } from "../../../helpers/axiosHelper.js";




const Appointments = () => {
    const { token } = useContext(AuthContext);
    const [view, setView] = useState('list');
    const [appointments, setAppointments] = useState([])
    const [statusFilter, setStatusFilter] = useState([])

    useEffect(() => {
        try {
           const fetchAppoitment = async () => {
            const result = await fetchData('/admin/getAppoitment', 'GET', null, token)
            setAppointments(result.data.citas)
            setStatusFilter(result.data.citas)
          }
          fetchAppoitment()
        } catch (error) {
          console.log(error)
        }
    },[])
    
    const onConfirm = async (appointment_id) => {
      try {
        const data = {
          appointment_id
        }
        await fetchData('/admin/appointmentConfirm', 'PUT', data, token)
        const result = await fetchData('/admin/getAppoitment', 'GET', null, token)
        setAppointments(result.data.citas)
        setStatusFilter(result.data.citas)
        
      } catch (error) {
        console.log(error)
      }
    }

    const onCanceled = async (appointment_id) => {
      try {
        const data = {
          appointment_id
        }
        await fetchData('/admin/appointmentCanceled', 'PUT', data, token)
        const result = await fetchData('/admin/getAppoitment', 'GET', null, token)
        setAppointments(result.data.citas)
        setStatusFilter(result.data.citas)
        
      } catch (error) {
        console.log(error)
      }
    }
 
  return (
    
     <Container>
      <Row lg={2}>
        <Col>
          <h2>Gestión de citas</h2>
        </Col>
        <Col className="d-flex gap-2 justify-content-end">
          <Boton 
            icon="bi bi-list-ul"
            aspecto={view === "list" ? "btn-1" : "btn-2"}
            valor="Lista"
            onClick={() => setView('list')}
          />
          <Boton 
            icon="bi bi-calendar4-week"
            aspecto={view === "calendar" ? "btn-1" : "btn-2"}
            valor="Calendario"
            onClick={() => setView('calendar')}
          />
        </Col>
      </Row>
      <hr />
      { view === "list" && <AdminAppointmentList 
                              appointments={appointments} 
                              setAppointments={setAppointments}
                              statusFilter={statusFilter}
                              setStatusFilter={setStatusFilter}
                              onConfirm={onConfirm}
                              onCanceled={onCanceled}
                              />}
      { view === "calendar" && <AdminAppointmentCalendar appointments={appointments}/>}
     </Container>
     
  )
}

export default Appointments;