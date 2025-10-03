import express, { Router } from 'express'
/* import userControllers from './user.controllers.js' */
import { tokenVerify } from '../../middlewares/tokenVerify.js'
import userController from './user.controllers.js'

const router = express.Router();

// Registar el usuario
router.post('/register', userController.register)

export default router;