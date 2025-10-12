import express from "express";
import adminController from "./admin.controllers.js";
import uploadImage from "../../middlewares/multerSingle.js";
import { tokenVerify } from "../../middlewares/tokenVerify.js";
import adminControllers from "./admin.controllers.js";

const router = express.Router();

router.get("/getServices", tokenVerify, adminController.showServices);

router.post('/createService', tokenVerify, uploadImage('services'), adminController.createService);

router.put('/modifyService', tokenVerify, uploadImage('services'), adminController.modifyService);

router.put('/alterVisible', adminController.alterVisible);

router.delete('/deleteService', tokenVerify, adminController.deleteService);

router.post('/addDayHour', tokenVerify, adminController.addDayHour)

router.get('/getAllDaysHours', tokenVerify, adminController.getAllDaysHours)

router.delete('/deleteDayHour', tokenVerify, adminControllers.deleteDayHour)

router.get('/getAppoitment', tokenVerify, adminControllers.getAppoitment)

router.put('/appointmentConfirm', tokenVerify, adminController.appointmentConfirm)
export default router;

router.put('/appointmentCanceled', tokenVerify, adminController.appointmentCanceled)