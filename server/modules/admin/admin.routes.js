import express from "express";
import adminController from "./admin.controllers.js";
import uploadImage from "../../middlewares/multerSingle.js";
import { tokenVerify } from "../../middlewares/tokenVerify.js";
import adminControllers from "./admin.controllers.js";

const router = express.Router();

router.get('/getAllUsers', tokenVerify, adminController.getAllUsers);

router.post('/getTextsFromUser', tokenVerify, adminController.getTextsFromUser);

router.post('/createNewText', tokenVerify, adminController.createNewText);

router.post('/getText', tokenVerify, adminController.getText);

router.put('/saveText', tokenVerify, adminController.saveText);

router.put('/publishOrHide', tokenVerify, adminController.publishOrHide);

router.put('/deleteTextLogical', tokenVerify, adminController.deleteTextLogical);

router.put('/restoreText', tokenVerify, adminController.restoreText);

router.delete('/deleteTextTotal', tokenVerify, adminController.deleteTextTotal);

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

router.put('/appointmentCanceled', tokenVerify, adminController.appointmentCanceled)

router.put('/activeUser', tokenVerify, adminController.activeUser);

router.put('/inactiveUser', tokenVerify, adminController.inactiveUser)

router.get('/getMessage', tokenVerify, adminController.getMessage)

//router.get('/getChat/:idClient', tokenVerify, adminController.getChat)

router.get('/getChat/:idClient', tokenVerify, adminController.getChat);

router.post('/sendCurrentChat', tokenVerify, adminController.sendCurrentChat);


export default router;