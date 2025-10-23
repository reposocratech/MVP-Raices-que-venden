import appointmentDal from "./appointment.dal.js";
import { emailPendienteCita } from "../../services/emailPendienteCita.js";

class AppointmentController {
  reservedAppointment = async (req, res) => {
    try {
      const { user_id,email, app_status, app_day, app_hour, app_date } = req.body;
      console.log(req.body);

      let values = [user_id, app_status, app_day, app_hour, app_date]

     let result = await appointmentDal.reservedAppointment(values)

     await emailPendienteCita({
        email,
        app_day,
        app_date,
        app_hour
     })
   
      res.status(200).json({message: "reserva registrada correctamente", result})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error al registrar la reserva", error });
    }
  };

  getAvailableAppointment = async (req, res) => {
    try {
      const citas = await appointmentDal.getAvailableAppointment();
      res.status(200).json ({
        message: "Citas disponibles generadas correctamente",
        result: citas
      });
      
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "error al generar citas",
      error
    })
  };
}

getUserAppointments = async (req,res) => {
  try {
    const {user_id} = req; //viene del req
    console.log(user_id)

    const result = await appointmentDal.getUserAppointments(user_id);
    res.status(200).json({
      message: "citas confirmadas de usuario",
      citas: result
    })
  }catch (error) {
  console.log(error)
  res.status(500).json({
    message: "error al obtener citas",
    error
  })
}

} 





}
export default new AppointmentController();
