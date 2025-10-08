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
            today.setDate(today.getDate() + 1);

            const endDate = new Date();
            endDate.setDate(today.getDate() + 28);

            const result = await appointmentDal.getAvailableAppointment(
                today.toISOString().split("T")[0],
                endDate.toISOString().split("T")[0]
            );
            res.json(result);

        } catch (error) {
            console.log(error)
            throw error;

        }
    } 
}


export default new AppointmentController;