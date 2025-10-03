import express from "express";
import { tokenVerify } from "../../middlewares/tokenVerify.js";
import publicController from "./public.controllers.js";

const router = express.Router();

router.put('/userConfirm',tokenVerify , publicController.confirm);

export default router;