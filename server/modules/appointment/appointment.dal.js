import executeQuery from "../../config/db.js";

class AppointmentDal {

    reservedAppointment = async (data) => {
        try {
            const sql = 'INSERT INTO appointment (user_id, app_status, app_day, app_hour, app_date) VALUES (?,?,?,?,?)'
            const result = await executeQuery(sql, data);
            return result;

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    getAvailableAppointment = async (startDate, endDate) => {
        try {
            const sqlAvailability = 'SELECT availability_day, availability_hour FROM availability ORDER BY availability_day, availability_hour'
            const availability = await executeQuery(sqlAvailability);

            const sqlReservadas = 'SELECT app_date, app_hour, FROM appointment WHERE app_status = 1'
            const reservadas = await executeQuery(sqlReservadas);

            //convierto reservas a texto tipo "2025-10-13-15"
            const reservadasTexto = reservadas.map(r => `${r.app_date}-${r.app_hour}`)

            const citas = [];

            //genero citas disponibles para los proximos 31 dias

      for (let i = 1; i <= 31; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i);
        const diaSemana = fecha.getDay();
        const fechaStr = fecha.toISOString().split("T")[0];

        const horas = availability
          .filter((a) => a.availability_day === diaSemana)
          .map((a) => Number(a.availability_hour));

        for (const hora of horas) {
          const clave = `${fechaStr}-${hora}`;

          // si no está reservadas, se agrega
          if (!reservadasTexto.includes(clave)){
          const start = new Date(fecha);
          start.setHours(hora, 0, 0, 0);

          const end = new Date(start);
          end.setHours(hora + 1);

          citas.push({
            start,
            end,
            title: "Disponible",
            status: "free",
          });
        }
      }
    }
console.log("***********", citas)
      return citas;
    } catch (error) {
      console.error("Error en getAvailableAppointment:", error);
      throw error;
    }


}

getUserAppointments = async (user_id) => {
  try {
    const sql = 'SELECT user_id, appointment_2_id, app_date, app_hour FROM appointment WHERE user_id = ? AND app_status = 2 ORDER BY app_date, app_hour'
    
    const result = await executeQuery(sql, [user_id])
    return result;

  } catch (error) {
    console.log(error)
  }
}

};

export default new AppointmentDal();