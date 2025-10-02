import {z} from 'zod';

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;

export const registerUserSchema = z.object({
    email: z.email(),
    password: z.string().regex(passRegex, {message: "El passwor debe ser mayor de8, con..."}),
    repetirPassword: z.string()
})

.refine((data)=> data.password === data.repetirPassword, {
    message: "las contraseñas no coinciden",
    path: ["repetirPassword"]
   }
)