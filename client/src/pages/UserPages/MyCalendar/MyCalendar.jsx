import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


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

const appoiments = [
  {
    status: "free",
    start: new Date(2025, 9, 8, 10, 0),
    end: new Date(2025, 9, 8, 11, 0),
  },
  {
    status: "booked",
    start: new Date(2025, 9, 8, 11, 0),
    end: new Date(2025, 9, 8, 12, 0),
  },
  {
    status: "free",
    start: new Date(2025, 9, 8, 12, 0),
    end: new Date(2025, 9, 8, 13, 0),
  },
  {
    status: "free",
    start: new Date(2025, 9, 8, 13, 0),
    end: new Date(2025, 9, 8, 14, 0),
  },
];

let finalApp = appoiments
  .filter((e) => e.status === "free")
  .map((e) => ({
    ...e,
    title: "Disponible",
  }));

export default function MyCalendar() {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [reserved, setReserved] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleReservedEvent = (event) => {
    setReserved(event);
    setShowModal(true);
  };

  return (
    <div className="h-[600px] p-4 bg-gray-50 rounded-2xl shadow-md">
      <Calendar
        localizer={localizer}
        events={finalApp}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        date={date}
        onNavigate={setDate}
        onView={(newView) => setView(newView)}
        popup
        onSelectEvent={handleReservedEvent}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserva pendiente de confirmar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Has seleccionado una cita libre de{" "}
          {reserved?.start.toLocaleTimeString()} a{" "}
          {reserved?.end.toLocaleTimeString()}.
          <br />
          Tu reserva está pendiente de aprobación. Recibirás un email con la confirmación de la reserva.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
