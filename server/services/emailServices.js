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


export const sendMail = (email, name) =>{


    let emailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body class="ppal" style="background-color:red">
    <h1>Bienvenid@ a ${name} nuestra aplicación</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ab neque rerum laborum quasi aspernatur corrupti hic nisi ex delectus. Odit accusamus, id aliquam neque ut sunt consectetur officiis vero?</p>
    
</body>
</html>`

    // transporter.verify()
    //             .then(()=>console.log("todo ok"))
    //             .catch((err)=>console.error(err))
    
    transporter.sendMail({
        from: '"Santi" <pruebasSantidev@gmail.com>',
        to: email,
        subject: "Confirmación de registro de user",
        text: "Bienvenid@ a nuestra aplicación",
        html: emailBody
    })    

    
    console.log("email enviado");
    
}