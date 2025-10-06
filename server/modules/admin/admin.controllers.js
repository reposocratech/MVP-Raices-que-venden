import adminDal from "./admin.dal.js";

class AdminController {
  showServices = async (req, res) => {
        try {
          const serviceData = await adminDal.showServices();
          console.log(serviceData)
          res.status(200).json(serviceData)
  
        }catch(error){
          console.log(error);
          res.status(500).json({message: "error **************", error})
          throw error;
  
        }
  
      }
}

export default new AdminController();