import adminDal from "./admin.dal.js";

class AdminController {
  showServices = async (req, res) => {
    try {
      const serviceData = await adminDal.showServices();
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

  modifyService = async (req, res) => {
    try {
      console.log(req.body.dataService);
      console.log(req.file);
      
      const {service_id, service_name, service_description, service_price} = JSON.parse(req.body.dataService);
      
      let data = {
        service_id: service_id,
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
        service_image: req.file?.filename
      }

      /* si existe la service_image, deberíamos borrar la anterior de la database */

      if(!data.service_price){
        data.service_price=null;
      }

      const result = await adminDal.modifyService(data);
      res.status(200).json(result)
      

    } catch (error) {
      console.log();
      res.status(500).json({message: "error **************", error})
    }
  }

  alterVisible = async (req, res) => {
    try {
      console.log(req.body);
      let {service_id, is_visible} = req.body;

      is_visible = is_visible? 0 : 1;

      await adminDal.alterVisible({service_id, is_visible});

      res.status(200).json(is_visible);

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "error **************", error})
    }
  }

  deleteService = async (req, res) => {
    try {
      console.log(req.body);

      const {service_id, service_image} = req.body;

      /* si luego queremos borrar imágenes del local, aquí podemos */

      await adminDal.deleteService(service_id);

      res.status(200).json({message: 'borrado ok'});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "error **************", error})
    }
  }

}

export default new AdminController();