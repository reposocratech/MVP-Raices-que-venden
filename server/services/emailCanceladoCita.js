import nodemailer from 'nodemailer';
import { reverseDate } from '../utils/emailUtils.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
     user: 'almuyalma.raices@gmail.com',
    pass: 'zbxjchvvceyafbnf',
  },
});

export const emailCanceladoCita = async({ user_name, email, app_date, app_hour }) => {
  let emailCancelado = `
  
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cita cancelada</title>
</head>
<body
  style="margin:0; padding:0; font-family: Georgia, 'Times New Roman', Times, serif; background-color:#f4f4f4;"
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cita cancelada</title>
</head>
<body
  style="margin:0; padding:0; font-family: Georgia, 'Times New Roman', Times, serif; background-color:#f4f4f4;"
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#7b9c7a88; padding:40px 0;"
  >
    <tr>
      <td align="center">
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="background-color:#ffffff; border-radius:10px; overflow:hidden;"
        >
          <tr>
            <td
              style="background-color:#E7DED3; color:#BF1234; text-align:center; padding:20px; font-size:24px; font-weight:bold;"
            >
              Tu cita ha sido cancelada
            </td>
          </tr>

          <tr>
            <td style="padding:30px 20px; color:#333333; line-height:1.6;">
              <p>Hola ${user_name},</p>

              <p>
                Lamentamos informarle que tu cita con <strong style="color:#4B7F52;">Raíces que venden</strong> ha sido cancelada.  
                <br>
                A veces surgen imprevistos o ajustes necesarios en la agenda, pero estaremos encantadas de encontrar un nuevo momento que encaje contigo. 
              </p>

              <div style="background-color:#F5F2EB; border-radius:8px; padding:14px; margin:20px 0; color:#4b4b4b;">
                <p style="margin:0 0 8px 0;"><strong>Detalles de la cita cancelada</strong></p>
                <p style="margin:0;">📅 Fecha: <strong>${reverseDate(app_date)}</strong></p>
                <p style="margin:6px 0 0 0;">🕒 Hora: <strong>${app_hour}:00 - ${app_hour + 1}:00</strong></p>
              </div>

              <div>
                Puedes volver a reservar una nueva cita cuando te venga bien haciendo clic en el enlace de tu área personal.
                <br><br>
                Sentimos las molestias y te agradecemos tu comprensión.
              </div>

              <div style="margin-top:20px;">
                <p>
                  Gracias por confiar en Raíces, un espacio donde las palabras crecen con paciencia y autenticidad, incluso cuando toca replantar.
                  <br><br>
                  <div>
                    Con cariño,
                    <br>
                    <strong>El equipo de Almuyalma</strong>
                  </div>
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td
              style="background-color:#8b6e52; text-align:center; padding:20px; font-size:12px; color:#f5f1e8;"
            >
              © 2025 Raíces que Venden · Almuyalma  
              <br>
              Desde Castellón y la terreta, para toda España
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  
  `



     await transporter.sendMail({
    from: '"AlmuyAlma (Raíces que venden)" <almuyalma.raices@gmail.com>',
    to: email,
    subject: 'cita cancelada',
    html: emailCancelado,
  });

  console.log('cita cancelada');





}
