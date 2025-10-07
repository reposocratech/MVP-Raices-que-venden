import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendAppointmentEmail = async ({to, subject, message}) => {
    await transporter.sendMail({
        from: `"Raíces que Venden" <${process.env.EMAIL_USER}`,
        to,
        subject,
        html: `<p>${message}</p>`

    })
;}