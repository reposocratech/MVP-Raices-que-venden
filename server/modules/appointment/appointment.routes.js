import express from 'express';
import appointmentControllers from './appointment.controllers.js';
import { tokenVerify } from '../../middlewares/tokenVerify.js';

const router = express.Router();

//recoge los datos de la reserva de la cita y lo mando al bd
router.post('/reservedAppointment' ,tokenVerify, appointmentControllers.reservedAppointment)

//manda los datos de las citas disponibles al calendario
router.get('/available' , appointmentControllers.getAvailableAppointment)






export default router;