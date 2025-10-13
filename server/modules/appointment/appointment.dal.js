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
            const sql = 'SELECT availability_day, availability_hour FROM availability ORDER BY availability_day, availability_hour'

      const availability = await executeQuery(sql);

      const citas = [];

      for (let i = 1; i <= 31; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i);
        const diaSemana = fecha.getDay();

        const horas = availability
          .filter((a) => a.availability_day === diaSemana)
          .map((a) => Number(a.availability_hour));

        for (const hora of horas) {
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
console.log("***********", citas)
      return citas;
    } catch (error) {
      console.error("Error en getAvailableAppointment:", error);
      throw error;
    }


}
}

export default new AppointmentDal();