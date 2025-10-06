import express, { Router } from 'express'
/* import userControllers from './user.controllers.js' */
import { tokenVerify } from '../../middlewares/tokenVerify.js'
import userController from './user.controllers.js'
import uploadImage from '../../middlewares/multerSingle.js';

const router = express.Router();

// Registar el usuario
router.post('/register', userController.register);

//2.- login
router.post('/login', userController.login)


//3.- login, traer datos del usuario en funcion del id del token
router.get('/getUserToken', tokenVerify, userController.getUserToken)

// Editar Datos personales del usuario
router.put('/editPersonalData', tokenVerify, userController.editPesonalData)

// Editar Datos de facturación del usuario
router.put('/editFacturationData', tokenVerify, userController.editFacturationData)

// Editar la imagen del usuario
router.put('/editImage', tokenVerify, uploadImage("users"), userController.editImage)

//Editar Datos de redes sociales
router.post('/addRedSocialData', tokenVerify, userController.addRedSocialData);

router.get('/getRedSocial', tokenVerify, userController.getRedSocial)




export default router;