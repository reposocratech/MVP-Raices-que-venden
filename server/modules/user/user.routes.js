import express, { Router } from 'express'
/* import userControllers from './user.controllers.js' */
import { tokenVerify } from '../../middlewares/tokenVerify.js'
import userController from './user.controllers.js'

const router = express.Router();

// Registar el usuario
router.post('/register', userController.register);

//2.- login
router.post('/login', userController.login)


//3.- login, traer datos del usuario en funcion del id del token
router.get('/getUserToken', tokenVerify, userController.getUserToken)




export default router;