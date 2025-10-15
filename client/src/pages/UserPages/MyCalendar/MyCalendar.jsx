import { useContext, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  ftnArrCalendar,
  ftnFechaDisponibilidad,
} from "../../../middlewares/generadorCitas.js";
import { AppointmentReserved } from "../../../components/Modals/AppointmentReserved/AppointmentReserved.jsx";
import { useMemo } from "react";
import "./myCalendar.css";

export default function MyCalendar() {
  const { token } = useContext(AuthContext);

  // Array de las horas de disponibilidad semanal
  const [availability, setAvailability] = useState([]);

  // Funcionalidad para transpormar availability
  //const fechasDisponibilidad = ftnFechaDisponibilidad(availability);

  // Funcionalidad para generar Appointments
  //const arrCalendar = ftnArrCalendar(fechasDisponibilidad);

  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [reserved, setReserved] = useState(null);
  const [reservedAppointments, setReservedAppointments] = useState([]);

  const fechasDisponibilidad = useMemo(() => {
    return ftnFechaDisponibilidad(availability);
  }, [availability]);

  const arrCalendar = useMemo(() => {
    return ftnArrCalendar(fechasDisponibilidad);
  }, [fechasDisponibilidad]);

  const handleReservedEvent = (event) => {
    setReserved(event);
    setShowModal(true);
  };

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

  /*  const loadReservedAppointments = async () => {
    try {
      const result = await fetchData('/appointment/allConfirmed', 'GET', null, token)
      setReservedAppointments(result.data.citas)

    } catch(error) {
      console.log(error)
    }
  };*/

  const handleClose = (reservedSlot) => {
    setShowModal(false);

    const nuevaDisponibilidad = availability.filter((slot) => {
      const slotDay = Number(slot.availability_day);
      const slotHour = Number(slot.availability_hour);
      const reservedDay = new Date(reservedSlot.app_date).getDay(); // 0 = domingo, 5 = viernes
      const reservedHour = Number(reservedSlot.app_hour);

      console.log(
        "Comparando:",
        slotDay,
        slotHour,
        "con",
        reservedDay,
        reservedHour
      );

      return !(slotDay === reservedDay && slotHour === reservedHour);
    });

    console.log("Disponibilidad actualizada:", nuevaDisponibilidad);
    setAvailability(nuevaDisponibilidad);
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const resultAvailability = await fetchData(
          "/admin/getAllDaysHours",
          "GET",
          null,
          token
        );
        const resultAppointments = await fetchData(
          "/appointment/myAppointments",
          "GET",
          null,
          token
        );

        const tramosDisponibles = resultAvailability.data.daysHours;
        const citasReservadas = resultAppointments.data.citas;

        setReservedAppointments(citasReservadas);

        //filtro tramos q no esten reservados
        const tramosFiltrados = tramosDisponibles.filter((slot) => {
          return !citasReservadas.some((cita) => {
            const citaDate = cita.app_date;
            const citaHour = cita.app_hour;
            const slotDate = slot.date;
            const slotHour = slot.hour;
            return citaDate === slotDate && citaHour === slotHour;
          });
        });

        setAvailability(tramosFiltrados);
      } catch (error) {
        console.log(error);
      }
    };
    getAllData();
  }, []);

  return (
    <>
      <div className="h-[600px] p-4 bg-gray-50 rounded-2xl shadow-md">
        <h2 className="titulo-citas">Elige tu cita</h2>
        <hr />
        <Calendar
          localizer={localizer}
          events={arrCalendar}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          view={view}
          date={date}
          onNavigate={setDate}
          onView={(newView) => setView(newView)}
          onSelectEvent={handleReservedEvent}
          min={new Date(2025, 0, 1, 8, 0)} // el tramo horas empieza a las 8:00 a.m.
         /* eventPropGetter={() => ({
            style: {
              whiteSpace: "normal", // ✅ permite que el texto se envuelva
              overflow: "visible", // evita que se corte
              fontSize: "0.85rem", // ajusta el tamaño
              padding: "2px 4px", // mejora el espacio interno
            },
          })}*/
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay eventos en este rango.",
          }}
          style={{ height: 500 }}
        />
      </div>
      <AppointmentReserved
        reserved={reserved}
        showModal={showModal}
        setShowModal={setShowModal}
        handleClose={handleClose}
      />
    </>
  );
}
