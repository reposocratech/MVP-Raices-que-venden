import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import publicRouter from "./modules/public/public.routes.js";
import userRouter from "./modules/user/user.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
import mailChimpRouter from './modules/mailChimp/mailChimp.routes.js';
import appointmentRouter from './modules/appointment/appointment.routes.js'


const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', publicRouter); // Invitados externos
app.use('/api/user', userRouter); // Usuarios Logueados
app.use('/api/admin', adminRouter); // Adminisrador
app.use('/api/mailChimp', mailChimpRouter); //MailChimp
app.use('/api/appointment', appointmentRouter); //reservas de citas

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({message: "Error de server"});
});

export default app;
