import { Container } from 'react-bootstrap';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContextProvider.jsx';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function AdminAppointmentCalendar ({appointments}) {

  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    const calendarAdmin = (appoint) => {

      let data = []
  
      for (let i = 0; i < appoint.length; i++) {
        const fecha = new Date(appoint[i].app_date);

        if (appoint[i].app_status === 2) {
          data.push({
            title: appoint[i].user_name,
            status: appoint[i].app_status,
            start: new Date(  fecha .getFullYear(), // AÑO - ejemplo 2025
                              fecha .getMonth(), // MES - ejemplo 10
                              fecha .getDate(), // FECHA - ejemplo 10
                              appoint[i].app_hour, // HORA - 10
                              0),
            end: new Date(  fecha .getFullYear(), // AÑO - ejemplo 2025
                              fecha .getMonth(), // MES - ejemplo 10
                              fecha .getDate(), // FECHA - ejemplo 10
                              appoint[i].app_hour + 1, // HORA - 10
                              0),
          })
        }
        
      }
 
      return data
  
    }
    setCalendar(calendarAdmin(appointments))
  },[])

 
console.log(calendar)


  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const locales = {
    es: es,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });



  return (
    <Container>
      <div className="h-[600px] p-4 bg-gray-50 rounded-2xl shadow-md">
        <Calendar
          localizer={localizer}
          events={calendar}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          view={view}
          date={date}
          onNavigate={setDate}
          onView={(newView) => setView(newView)}
          /*       popup */
/*           onSelectEvent={(event) => {
            console.log(event);

            alert(`Has clicado en: ${event.title}`);
          }} */
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
            monday : 'lunes',
            noEventsInRange: 'No hay eventos en este rango.',
          }}
          style={{ height: 500 }}
        />
      </div>
    </Container>
  );
}
