import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const locales = { es };

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

const finalApp = appoiments.map((e) => ({
  ...e,
  title: e.status === "free" ? "Disponible" : "Reservado",
}));


export default function AdminCalendar() {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-[600px] p-4 bg-light rounded-2xl shadow-sm">
      <BigCalendar
        localizer={localizer}
        events={finalApp}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        date={date}
        onNavigate={setDate}
        onView={(newView) => setView(newView)}
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
  );
}
