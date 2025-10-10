import appointmentDal from './appointment.dal.js'

class AppointmentController {
    reserve = async (req, res) => {
        try {
            const {app_day, app_hour, app_date, user_id} = req.body;

            const result = await appointmentDal.reserveAppointment([
                app_day,
                app_hour,
                app_date,
                user_id

            ])
            res.status(200).json({message: "reserva registrada correctamente", result})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "error al registrar la reserva", error})
        }
    }

   getAvailableAppointment = async (req, res) => {
  try {
    const availability = await appointmentDal.getAllDaysHours();
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
        end.setHours(start.getHours() + 1);

        citas.push({
          start,
          end,
          title: "Disponible",
          status: "free",
        });
      }
    }

    res.json({ result: citas });
  } catch (error) {
    console.error("error al ver citas", error);
    res.status(500).json({ message: "Error al generar las citas", error });
  }
};

  
}


export default new AppointmentController;