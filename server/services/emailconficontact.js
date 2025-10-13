import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'cristina31101995@gmail.com',
    pass: 'ahyasfdxnxejojzi',
  },
});

//email que recibe quien completa el formulario
export const emailconficontact = async (user_name, email) => {
  let emailconficontact = `
  
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulario recibido</title>
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
              ¡Gracias por tu mensaje!
            </td>
          </tr>

          <tr>
            <td style="padding:30px 20px; color:#333333; line-height:1.6;">
              <p>Hola ${user_name},</p>

              <p>
                Hemos recibido tu mensaje en <strong>Raíces que venden</strong> y queremos
                darte las gracias por escribirnos. 💚  
                En breve nos pondremos en contacto contigo para conocer mejor tu proyecto.
              </p>

              <div style="text-align:center; margin-top:25px;">
                <p
                  style="display:inline-block; padding:12px 30px; border-radius:20px; border:1px solid #7b9c7a; background-color:#7b9c7a; font-weight:bold;"
                >
                  <a
                    href="mailto:almuyalma.raices@gmail.com"
                    style="color:white !important; text-decoration:none !important;"
                  >
                    Escribir a Raíces
                  </a>
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

  `;

  await transporter.sendMail({
    from: '"AlmuyAlma (Raíces que venden)" <cristina31101995@gmail.com>',
    to: email,
    subject: ' Hemos recibido tu mensaje',
    html: emailconficontact,
  });
  console.log('email recibido');
};
