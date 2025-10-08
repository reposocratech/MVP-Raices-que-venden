import express from 'express';
import mailChimpController from './mailChimp.controllers.js';

const router = express.Router();

router.post('/subscribe', mailChimpController.subscribe);

export default router;