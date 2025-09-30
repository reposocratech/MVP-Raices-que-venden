import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from "./modules/index/index.router.js";
import userRouter from "./modules/user/user.router.js";
import adminRouter from "./modules/admin/admin.router.js";


const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // Invitados externos
app.use('/user', userRouter); // Usuarios Logueados
app.use('/admin', adminRouter); // Adminisrador

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

module.exports = app;
