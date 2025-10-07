import express from "express";
import adminController from "./admin.controllers.js";
import uploadImage from "../../middlewares/multerSingle.js";
import { tokenVerify } from "../../middlewares/tokenVerify.js";

const router = express.Router();

router.get("/getServices", tokenVerify, adminController.showServices);

router.post('/createService', tokenVerify, uploadImage('services'), adminController.createService);

router.put('/modifyService', tokenVerify, uploadImage('services'), adminController.modifyService);

router.put('/alterVisible', adminController.alterVisible);

router.delete('/deleteService', tokenVerify, adminController.deleteService);

export default router;