import nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'almuyalma.raices@gmail.com',
    pass: 'zbxjchvvceyafbnf',
  },
});

export const sendMailConfirm = (email, name, token = null) => {
  let emailBody = `
 
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Confirmación de Registro - Raíces</title>
  </head>
  <body style="margin:0; padding:0; font-family: Georgia, 'Times New Roman', Times, serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #7b9c7a88; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Encabezado -->
            <tr>
              <td style="background-color:#E7DED3; color:#4B7F52; text-align:center; padding:20px; font-size:24px; font-weight: bold;">
                Raíces que venden
              </td>
            </tr>

            <!-- Cuerpo -->
            <tr>
              <td style="padding:30px 20px; color:#333333; line-height:1.6;">
                <h1 style="color:#5C4033; font-size:22px; margin-bottom:10px;">Bienvenido,</h1>
                <p style="margin-bottom:20px;">
                  ¡Gracias por unirte a la familia!  
                  Nos alegra muchísimo tenerte aquí, en un espacio donde las palabras florecen y las ideas echan raíces profundas.
                </p>

                <p style="margin-bottom:20px;">
                  Antes de seguir cultivando juntas este camino, confirma tu correo haciendo clic en el siguiente botón:
                </p>

                <p style="text-align:center; margin-bottom:30px;">
                  <a href="http://localhost:5173/user/confirm/${token}" style="display:inline-block; padding:15px 25px; background-color:#7b9c7a; color:white; text-decoration:none; border-radius:5px; font-weight:bold;">
                    Confirmar mi correo
                  </a>
                </p>

                <p style="margin-bottom:10px;">Una vez confirmado, podrás:</p>
                <ul style="margin:0 0 20px 20px; padding:0;">
                  <li>Recibir inspiración, consejos y recursos sobre escritura y comunicación auténtica ✨</li>
                  <li>Acceder a contenido exclusivo y novedades antes que nadie 💌</li>
                  <li>Aprender a conectar tus palabras con la esencia de tu marca y con las personas 🌱</li>
                </ul>

                <p style="margin-bottom:20px;">
                  Gracias por confiar en <strong>Raíces que venden</strong>, un lugar donde cada palabra cuenta y cada historia crece desde el corazón.
                </p>

                <p style="margin:0;">Con cariño,<br><strong>El equipo de Almuyalma</strong></p>
              </td>
            </tr>

          
             <tr>
              <td
                style="background-color:#8b6e52; text-align:center; padding:20px; font-size:12px; color:#f5f1e8;"
              >
                © 2025 Raíces que Venden · Almuyalma
                <br>
                Desde Castellón y la terreta, para toda España.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

  // transporter.verify()
  //             .then(()=>console.log("todo ok"))
  //             .catch((err)=>console.error(err))

  transporter.sendMail({
    from: '"AlmuyAlma" <pruebasSantidev@gmail.com>',
    to: email,
    subject: 'Confirmación de registro de user',
    text: 'Bienvenid@ a nuestra aplicación',
    html: emailBody,
  });

  console.log('email enviado');
};
