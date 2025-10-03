import publicDal from "./public.dal.js";

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
}

export default new PublicController();