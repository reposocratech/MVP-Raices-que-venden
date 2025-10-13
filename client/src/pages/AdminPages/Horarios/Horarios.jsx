import { Col, Container, Row } from "react-bootstrap";
import { converteNumInTextDay, diasHoras} from "../../../middlewares/diasyHorarios.js";
import { useContext, useEffect, useState } from "react";
import { Boton } from "../../../components/Boton/Boton";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { AuthContext } from "../../../context/AuthContextProvider.jsx";
import './horarios.css'
import { ftnArrCalendar, ftnFechaDisponibilidad } from "../../../middlewares/generadorCitas.js";


const hourDayPanel = {
  day: 5,
  starHourAllDay: "08:00",
  endHourAllDay: "20:00",
  duration:"01:00"
}
const Horarios = () => {

  const { token } = useContext(AuthContext)

  const ftnHourDay = diasHoras( hourDayPanel.day,
                                hourDayPanel.starHourAllDay,
                                hourDayPanel.endHourAllDay,
                                hourDayPanel.duration)
  
  const [hourDay, setHourDay] = useState(ftnHourDay)

  //------------
/*   const [appointment, setAppointment] = useState([]) */

  // Array de las horas de disponibilidad semanal
  const [availability, setAvailability] = useState([])

  // Funcionalidad para transpormar availability
  const fechasDisponibilidad = ftnFechaDisponibilidad(availability);

  // Funcionalidad para generar Appointments
  const arrCalendar =  ftnArrCalendar(fechasDisponibilidad)
  console.log(arrCalendar)


  useEffect(() => {
    try {
      const getAllDaysHours = async () => {
        let result = await fetchData('/admin/getAllDaysHours', 'GET', null, token);
        setAvailability([...availability, ...result.data.daysHours]);
        
      }
     
      getAllDaysHours()
    } catch (error) {
      console.log(error)
    }

  
  },[])



  //
  const getDayHour = async(availability_day, availability_hour) => {

    try {
      let datos = {
        day: availability_day,
        hour: availability_hour
      }
    
      const existe = availability.some(e => e.availability_day === availability_day && e.availability_hour === availability_hour)

      if (existe) {
        await fetchData('/admin/deleteDayHour', 'DELETE', datos, token);

        setAvailability(availability.filter(e => !(e.availability_day === availability_day && e.availability_hour === availability_hour)))
      }
      else {
        await fetchData('/admin/addDayHour', 'POST', datos, token);
        
        setAvailability([...availability, {
            availability_day,
            availability_hour,
          }]);
      }   
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Container>
      <h2 className="title">Horarios disponibilidad citas</h2>
      <hr />
      <Row lg={hourDayPanel.day}>
        { hourDay.map((e,i) => {
          return(
            <Col className="text-center" key={i+1}>
              <p className="title-days">{converteNumInTextDay(i+1)}</p>
              {e[i+1].map ( h => {
                return (
                  <Boton 
                    key={(i+1) + "-" + h}
                    onClick={() => getDayHour((i+1), h)}
                    aspecto={availability.some(e => e.availability_day === (i+1) && e.availability_hour === h) ? 'btn-1 w-100 my-2' : 'btn-6 w-100 my-2'}
                    valor={h + ":00 - " + (h + 1) + ":00"}
                  />
                )
              })}
            </Col>
          )

        }) }
       
      </Row>
      
    </Container>
  )
}

export default Horarios;