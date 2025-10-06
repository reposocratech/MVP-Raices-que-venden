import express from "express";
import adminController from "./admin.controllers.js";

const router = express.Router();

router.get("/getServices", adminController.showServices);

export default router;