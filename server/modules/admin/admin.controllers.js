import executeQuery from '../../config/db.js';
import adminDal from './admin.dal.js';
import { emailCanceladoCita } from '../../services/emailCanceladoCita.js';
import { emailConfirmadoCita } from '../../services/emailConfirmadoCita.js';

class AdminController {
  getAllUsers = async (req, res) => {
    try {
      const result = await adminDal.getAllUsers();
      console.log('getusers', result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error Server', dataError: error });
    }
  };

  getTextsFromUser = async (req, res) => {
    console.log(req.body, 'wololo');
    const { user_id } = req.body;

    try {
      const result = await adminDal.getTextsFromUser(user_id);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error Server', dataError: error });
    }
  };

  createNewText = async (req, res) => {
    console.log(req.body, 'wolole');
    const { user_id } = req.body;

    try {
      const result = await adminDal.createNewText(user_id);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error Server', dataError: error });
    }
  };

  getText = async (req, res) => {
    const { text_id } = req.body;
    try {
      const [textData] = await adminDal.getText(text_id);
      res.status(200).json(textData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error Server', dataError: error });
    }
  };

  saveText = async (req, res) => {
    const {text_id, text_title, text_body} = req.body;

    try {
      const textData = {
        text_id: text_id,
        text_title: text_title,
        text_body: text_body,
        last_modified: new Date()
      }

      const result = await adminDal.saveText(textData);

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Error Server",
                            dataError: error
      })
    }
    
  }

  publishOrHide = async (req, res) => {
    const {text_id, text_status} = req.body;
    console.log(req.body);
    
    try {
      await adminDal.publishOrHide({text_id, text_status});
      res.status(200).json({message: 'todo ok'});

    } catch (error) {
      res.status(500).json({message: "Error Server",
                            dataError: error
      })
    }
  }

  deleteText = async (req, res) => {
    
  }

  showServices = async (req, res) => {
    try {
      const serviceData = await adminDal.showServices();
      res.status(200).json(serviceData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error **************', error });
    }
  };

  createService = async (req, res) => {
    try {
      console.log('aqui llego');
      console.log(req.body.dataService);
      console.log(req.file);

      const { service_name, service_description, service_price } = JSON.parse(
        req.body.dataService
      );

      let data = {
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
        service_image: req.file?.filename,
      };

      if (!data.service_price) {
        data.service_price = null;
      }

      const result = await adminDal.createService(data);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error **************', error });
    }
  };

  modifyService = async (req, res) => {
    try {
      console.log(req.body.dataService);
      console.log(req.file);

      const { service_id, service_name, service_description, service_price } =
        JSON.parse(req.body.dataService);

      let data = {
        service_id: service_id,
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
        service_image: req.file?.filename,
      };

      /* si existe la service_image, deberíamos borrar la anterior de la database */

      if (!data.service_price) {
        data.service_price = null;
      }

      const result = await adminDal.modifyService(data);
      res.status(200).json(result);
    } catch (error) {
      console.log();
      res.status(500).json({ messaje: 'Error server', dataError: error });
    }
  };

  alterVisible = async (req, res) => {
    try {
      console.log(req.body);
      let { service_id, is_visible } = req.body;

      is_visible = is_visible ? 0 : 1;

      await adminDal.alterVisible({ service_id, is_visible });

      res.status(200).json(is_visible);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error **************', error });
    }
  };

  deleteService = async (req, res) => {
    try {
      console.log(req.body);

      const { service_id, service_image } = req.body;

      /* si luego queremos borrar imágenes del local, aquí podemos */

      await adminDal.deleteService(service_id);

      res.status(200).json({ message: 'borrado ok' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messaje: 'Error server', dataError: error });
    }
  };

  addDayHour = async (req, res) => {
    try {
      const { day, hour } = req.body;
      let values = [day, hour];
      const result = adminDal.addDayHour(values);
      res
        .status(200)
        .json({ messaje: 'Día y hora añadidas con exito', data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messaje: 'Error server', dataError: error });
    }
  };

  getAllDaysHours = async (req, res) => {
    try {
      let result = await adminDal.getAllDaysHours();
      res
        .status(200)
        .json({
          message: 'Todas los días y horas extraidos con exito',
          daysHours: result,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error server', dataError: error });
    }
  };

  deleteDayHour = async (req, res) => {
    try {
      const { day, hour } = req.body;
      let values = [day, hour];
      await adminDal.deleteDayHour(values);
      res.status(200).json({ messaje: 'Día y hora eliminadas con exito' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error Server', dataError: error });
    }
  };

  getAppoitment = async (req, res) => {
    try {
      const result = await adminDal.getAppoitment();

      res
        .status(200)
        .json({ message: 'Citas obtenidas con exito', citas: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error server', dataError: error });
    }
  };

  appointmentConfirm = async (req, res) => {
    try {
      const { appointment_id } = req.body;
      const result = await adminDal.appointmentConfirm([appointment_id]);

      const appointment = await adminDal.getAppoitmentById(appointment_id);

    await emailConfirmadoCita({
      user_name: appointment.user_name,
      email: appointment.email,
      app_day: appointment.app_day,
      app_hour: appointment.app_hour,
    });


      res
        .status(200)
        .json({ message: 'Confirmación realizada con exito', result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error server', dataError: error });
    }
  };

  appointmentCanceled = async (req, res) => {
    try {
      const { appointment_id } = req.body;
      const result = await adminDal.appointmentCanceled([appointment_id]);

      const appointment = await adminDal.getAppoitmentById(appointment_id);

    await emailCanceladoCita({
      user_name: appointment.user_name,
      email: appointment.email,
      app_day: appointment.app_day,
      app_hour: appointment.app_hour,
    });

      res
        .status(200)
        .json({ message: 'Cancelación realizada con exito', result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error server', dataError: error });
    }
  }

  activeUser = async (req, res) => {
    try {
      console.log(req.body)
      const { user_id } = req.body;
      await adminDal.activeUser([user_id])
      res.status(200).json({message:"Usuario activado con exito"})
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error server",
        dataError: error
      })
    }
  }

  inactiveUser = async (req, res) => {
    try {
      console.log(req.body)
      const { user_id } = req.body;
      await adminDal.inactiveUser([user_id])
      res.status(200).json({message:"Usuario desactivado con exito"})
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error server",
        dataError: error
      })
    }
  }
};


export default new AdminController();
