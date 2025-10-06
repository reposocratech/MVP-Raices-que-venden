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
    }

  }

  createService = async (req, res) => {
    try {
      console.log('aqui llego');
      console.log(req.body.dataService);
      console.log(req.file);
      
      const {service_name, service_description, service_price} = JSON.parse(req.body.dataService);

      let data = {
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
        service_image: req.file?.filename
      }

      if(!data.service_price){
        data.service_price=null;
      }

      const result = await adminDal.createService(data);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "error **************", error})
    }
  }
}

export default new AdminController();