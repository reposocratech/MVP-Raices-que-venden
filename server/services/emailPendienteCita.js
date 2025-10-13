import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
     user: 'almuyalma.raices@gmail.com',
    pass: 'zbxjchvvceyafbnf',
  },
});


export const emailPendienteCita = async({ email, app_day, app_hour }) => {
 
  let emailpendiente = `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cita pendiente de confirmar</title>
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
              style="background-color:#E7DED3; color:#4B7F52; text-align:center; padding:20px; font-size:24px; font-weight:bold;"
            >
              Cita pendiente de confirmación
            </td>
          </tr>

          <tr>
            <td style="padding:30px 20px; color:#333333; line-height:1.6;">

              <p>
                ¡Gracias por reservar tu cita con <strong style="color: #4B7F52;">Raíces que venden</strong>!
                <br>
                Hemos recibido tu solicitud y en breve la revisaremos para confirmarla o reprogramarla si es necesario.
              </p>
              
                 <div style="background-color:#F5F2EB; border-radius:8px; padding:14px; margin:20px 0; color:#4b4b4b;">
                <p style="margin:0 0 8px 0;"><strong>Detalles de tu solicitud</strong></p>
                <p style="margin:0;">📅 Fecha: <strong>${app_day}</strong></p>
                <p style="margin:6px 0 0 0;">🕒 Hora: <strong>${app_hour}</strong></p>
             
              </div>
                <br>

                <div>
                  Nuestro equipo revisará la disponibiladad y te notificará por correo en cuanto tu cita sea <span style="color: #4B7F52; font-style: oblique;">confirmada</span> o <span style="color: #BF1234; font-style: oblique;">cancelada</span>.
                  <br>
                  Mientras tanto, si necesitas modifical algo, no dudes en responder a este correo.
                  <br>
                </div>

                <div>
                  <p>
                    Gracias por confiar en Raíces, un espacio donde las palabras se siembran con intención y florecen con propósito.
                    <br>
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

</body>
</html>
  `


   await transporter.sendMail({
    from: '"AlmuyAlma (Raíces que venden)" <almuyalma.raices@gmail.com>',
    to: email,
    subject: 'cita pendiente de confirmar',
    html: emailpendiente,
  });

  console.log('email enviado cita pendiente');

}
