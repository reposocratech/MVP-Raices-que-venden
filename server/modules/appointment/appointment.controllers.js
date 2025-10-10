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
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() +1)


            const endDate = new Date();
            endDate.setDate(today.getDate() + 28);

            const result = await appointmentDal.getAvailableAppointment(
                today.toISOString().split("T")[0],
                endDate.toISOString().split("T")[0]
            );

            // transformar los datos para el front
            const transformed = result.map((e) =>{
                //const hour = parseInt(e.app_hour) + 7;
                //const hour = Number(e.app_hour.match(/\d+/)?.[0]) + 7;

                const rawHour = typeof e.app_hour === "string"
                ? Number(e.app_hour.match(/\d+/)?.[0])
                : Number(e.app_hour);
                const hour = rawHour + 7;

                const start = new Date(`${e.app_date}T${hour.toString().padStart(2, '0')}:00:00`);
                const end = new Date(`${e.app_date}T${(hour + 1).toString().padStart(2, '0')}:00:00`);


                return {
                    ...e,
                    start,
                    end,
                    title: "Disponible"
                }
            })
         
            res.json({ result: transformed });

        } catch (error) {
            console.log(error)
            throw error;

        }
    } 
}


export default new AppointmentController;