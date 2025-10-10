import publicDal from "./public.dal.js";
import { emailcontact } from '../../services/emailcontact.js'
import { emailconficontact } from "../../services/emailconficontact.js";


class PublicController {
  confirm = async (req, res) => {
        const {user_id} = req;
        try {
          const userData = await publicDal.confirm(user_id);
          console.log('estoy en controlador confirm', userData);
          
          if(userData){
            res.status(200).json(userData);
          }

        } catch (error) {
          console.log(error);
          res.status(500).json({message: 'error', error})
        }
        

    }

    showServices = async (req, res) => {
      try {
        const serviceData = await publicDal.showServices();
        console.log(serviceData)
        res.status(200).json(serviceData)

      }catch(error){
        console.log(error);
        res.status(500).json({message: "error **************", error})
        throw error;

      }

    }

    getServiceDetail = async (req, res) => {
      const {id} = req.params;
      
      try {
        const serviceData = await publicDal.getServiceDetail(id);
        console.log(serviceData)
        res.status(200).json(serviceData)

      } catch (error) {
        console.log(error)
        res.status(500).json({message: "***********", error})
        throw error;

      }

    }



    emailContact = async (req, res) => {
    const { user_name, email,  company_name, user_description } = req.body

    try {

      const adminEmail = await publicDal.getAdminEmail();

      await emailcontact(
        adminEmail,
        user_name,
        email,
        company_name,
        user_description
      )

      await emailconficontact(
        user_name,
        email
      )

      console.log(req.body)
      res.status(200).json({ message: 'Correo enviado correctamente' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al enviar el correo', error })
    }
  }

}

export default new PublicController();