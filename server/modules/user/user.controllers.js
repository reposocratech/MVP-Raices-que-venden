import { sendMailConfirm } from "../../services/emailServices.js";
import { hashString } from "../../utils/hashUtils.js";
import { generateTokenConfirm } from "../../utils/tokenUtils.js";
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
            const userId = await userDal.register(data);
            console.log(userId, '*****');
            const token = generateTokenConfirm(userId);
            sendMailConfirm(email, 'carlos', token);
            res.status(200).json({message: "Hola mundo"});

        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
            
        }
    }



    
}

export default new UserController();