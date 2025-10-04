import nodemailer from 'nodemailer';


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "almuyalma.raices@gmail.com",
    pass: "zbxjchvvceyafbnf",
  },
});


export const sendMailConfirm = (email, name, token=null) =>{


    let emailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="email.css">
    <style>
        :root {
  --font-title: 'Georgia', serif;
  --font-body: 'Georgia', serif;
  --primary-color: hsl(40, 37%, 97%);
  --primary-color-2: #f5f1e8;
  --primary-color-dark: #f3f3e5;
  --secundary-color: #8b6e52;
  --secundary-color-dark: #5A4633;
  --tertiary-color: #7b9c7a;
  --tertiary-color-dark: #597258;
}

.ppal {
  background-color: var(--primary-color);
  color: var(--secundary-color-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  button {
    background-color: var(--secundary-color);
    color: var(--primary-color);
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 50px;
    transition: 0.3s;
    &:hover {
      background-color: var(--secundary-color-dark);
    }
  }
}
    </style>
</head>
<body class="ppal">
    <h1>Hola ${name},</h1>
    <h2>Confirma tu correo</h2>
    <a href='http://localhost:5173/confirm/${token}'>
      Pulsa aquí
    </a>
    
</body>
</html>`

    // transporter.verify()
    //             .then(()=>console.log("todo ok"))
    //             .catch((err)=>console.error(err))
    
    transporter.sendMail({
        from: '"AlmuyAlma" <pruebasSantidev@gmail.com>',
        to: email,
        subject: "Confirmación de registro de user",
        text: "Bienvenid@ a nuestra aplicación",
        html: emailBody
    })    

    
    console.log("email enviado");
    
}

