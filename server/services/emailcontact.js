import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'cristina31101995@gmail.com',
    pass: 'ahyasfdxnxejojzi',
  },
})


export const emailcontact = async(user_name, email, company_name, user_description) => {
  
  
  let emailcontact = `
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
                      ${email} <br>
                      <strong style="color: #5C4033;">Nombre del
                        proyecto:</strong><br> ${company_name}<br>
                      <strong style="color: #5C4033;">Su historia y necesidades:</strong><br>
                      <span
                        style="display:block; margin-top:5px;">${user_description}</span>
                    </td>
                  </tr>
                </table>

                <p style="margin-bottom:20px;">
                  Responde diréctamente a este correo para ponerte en contacto
                  con la persona.
                </p>
                <p style="text-align:center; margin-top:20px;">
                  <p

                    style="display:inline-block; padding:12px 20px; border-radius:5px; border: 1px solid #4B7F52; font-weight:bold;"
                  >
                    ${email}
                </p>
                </p>
              </td>
            </tr>

            <tr>
              <td
                style="background-color:#8b6e52; text-align:center; padding:20px; font-size:12px; color:#f5f1e8;"
              >
                © 2025 Raíces. Todos los derechos reservados.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>

</html>
  `

  // transporter.verify()
  //             .then(()=>console.log("todo ok"))
  //             .catch((err)=>console.error(err))

  await transporter.sendMail({
    from: '"AlmuyAlma (Raíces que venden)" <cristina31101995@gmail.com>',
    to: email,
    subject: '🌿 Nuevo mensaje de contacto',
    html: emailcontact,
  });

  console.log('email enviado');


};
