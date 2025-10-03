import { hashString } from "../../utils/hashUtils.js";
import userDal from './user.dal.js'

class UserController{

    register =  async (req, res) => {
        const {email, password} = req.body;
        try {
            // hachear el password
            const hashPass = await hashString(password);
            
            // Preparar la data con el password hacheado
            let data = [email, hashPass];

            // Enviamos la data al DAL
            await userDal.register(data);
            res.status(200).json({message: "Hola mundo"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
            
        }
    }
}

export default new UserController();