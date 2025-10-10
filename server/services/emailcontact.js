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

//email que recibe almu
export const emailcontact = async (
  adminEmail,
  user_name,
  email,
  company_name,
  user_description
) => {
  let emailcontacthtml = `
<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <title>Nuevo mensaje de contacto</title>
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
                🌱 Nuevo mensaje de contacto
              </td>
            </tr>

            <tr>
              <td style="padding:30px 20px; color:#333333; line-height:1.6;">
                <p>Hola Almu,<br>
                  Has recibido un nuevo mensaje a través de tu formulario de
                  contacto:
                </p>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="margin-bottom:20px;"
                >
                  <tr>
                    <td
                      style="padding:10px; background-color:#e7ded33b; border-radius:5px;"
                    >
                      <strong style="color: #5C4033;">Nombre:</strong><br>
                      ${user_name} <br>
                      <strong style="color: #5C4033;">Email:</strong><br>
                      <span style="text-decoration: none !important; color: black !important;">${email}</span> <br>
                      <strong style="color: #5C4033;">Nombre del
                        proyecto:</strong><br> ${company_name}<br>
                      <strong style="color: #5C4033;">Su historia y
                        necesidades:</strong><br>
                      <span
                        style="display:block; margin-top:5px;">${user_description}</span>
                    </td>
                  </tr>
                </table>

                <p style="margin-bottom:20px;">
                  Responde diréctamente a este correo para ponerte en contacto
                  con la persona.
                </p>
                <div style="text-align:center; margin-top:20px;">
                  <p
                    style="display:inline-block; padding:12px 30px; border-radius:20px; border:1px solid #7b9c7a; background-color: #7b9c7a; font-weight:bold; color:#4B7F52 !important; text-decoration:none;">
                    <a
                      href="mailto:${email}"
                      style="color:white!important; text-decoration:none !important;"
                    >
                      Púlsame para responder
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

  await transporter.sendMail({
    from: '"AlmuyAlma (Raíces que venden)" <almuyalma.raices@gmail.com>',
    to: adminEmail,
    subject: 'Nuevo mensaje de contacto',
    html: emailcontacthtml,
  });

  console.log('email enviado');
};
