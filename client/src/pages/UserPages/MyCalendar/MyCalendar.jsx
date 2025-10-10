import { useContext, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ftnArrCalendar, ftnFechaDisponibilidad } from "../../../middlewares/generadorCitas.js";
import { AppointmentReserved } from "../../../components/Modals/AppointmentReserved/AppointmentReserved.jsx";


export default function MyCalendar() {

      const { token } = useContext(AuthContext)
 
    // Array de las horas de disponibilidad semanal
    const [availability, setAvailability] = useState([])
  
    // Funcionalidad para transpormar availability
    const fechasDisponibilidad = ftnFechaDisponibilidad(availability);
  
    // Funcionalidad para generar Appointments
    const arrCalendar =  ftnArrCalendar(fechasDisponibilidad)
    console.log(arrCalendar)
 
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false);
    const [reserved, setReserved] = useState(null);

    const handleReservedEvent = (event) => {
  setReserved(event);
  setShowModal(true);
};
 
 
    const locales = {
      'es': es,
    }
    
    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
      getDay,
      locales,
    })
 
  
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
 
 

return (
  <>
    <div className="h-[600px] p-4 bg-gray-50 rounded-2xl shadow-md">
      <Calendar
        localizer={localizer}
        events={arrCalendar}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        view={view}
        date={date}
        onNavigate={setDate}
        onView={(newView) => setView(newView)}
     
        
        onSelectEvent={handleReservedEvent}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango.',
        }}
        
        style={{ height: 500 }}
      />
     </div> 
    <AppointmentReserved 
 reserved={reserved}
 showModal={showModal}
 setShowModal={setShowModal} />

 </>
  )
}
    


  

