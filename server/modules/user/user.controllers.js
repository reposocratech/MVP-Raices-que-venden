import { sendMailConfirm } from "../../services/emailServices.js";
import { compareString, hashString } from "../../utils/hashUtils.js";
import { generateTokenConfirm, generateTokenLogin } from "../../utils/tokenUtils.js";
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



    //login
    login = async(req, res) => {
        try {    
            const { email, password } = req.body;

            //comprobar si existe ese email
            const result = await userDal.findEmail(email);

            if(result === 0){
                res.status(401).json({message: 'Email no registrado'})
            }else{//comprobar password
                 const match = await compareString(password, result[0].password )

                 if(!match){//si no es correcto
                    res.status(401).json({message: 'Contraseña incorrecta'});
                 }else{//genera un token
                    const token = generateTokenLogin(result[0].user_id);
                    res.status(200).json({token})
                 }
            }

        } catch (error) {
                 console.log(error);
            res.status(500).json({
                                message:"error de server",
                                dataError: error
                            })
        }
    }


    //3.- login traer datos del user
    getUserToken = async(req, res) => {
        try {
            const {user_id} = req;
            console.log("Desde get Token", user_id)
            const result = await userDal.findUserById(user_id);
            console.log(result)
            

            let userData = {}

            userData = {
                user_id: result[0].user_id,
                user_name: result[0].user_name,
                nif_cif: result[0].nif_cif,
                type: result[0].type,
                email: result[0].email,
                user_description: result[0].user_description,
                company_name: result[0].company_name,
                address: result[0].address,
                province: result[0].province,
                city: result[0].city,
                phone_number: result[0].phone_number,
                avatar: result[0].avatar,
            }

            res.status(200).json({user: userData})


            
        } catch (error) {
             console.log(error);
            res.status(500).json({
                                message:"error de server",
                                dataError: error
                            })
        }
    }

    
}

export default new UserController();