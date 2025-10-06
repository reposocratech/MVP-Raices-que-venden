import express from "express";
import adminController from "./admin.controllers.js";
import uploadImage from "../../middlewares/multerSingle.js";

const router = express.Router();

router.get("/getServices", adminController.showServices);

router.post('/createService', uploadImage('services'), adminController.createService);

export default router;