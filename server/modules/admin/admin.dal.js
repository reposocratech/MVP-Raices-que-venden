import executeQuery, { dbPool } from "../../config/db.js";

class AdminDal {
  getAllUsers = async () => {
    try {
      let sql = 'SELECT * FROM user';
      const result = await executeQuery(sql);
      return result;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getTextsFromUser = async (user_id) => {
    try {
      let sql = 'SELECT text.*, user.* FROM text LEFT JOIN user ON text.user_id = user.user_id WHERE user.user_id=?'
      const result = await executeQuery(sql, [user_id]);
      console.log('array de textos', result);
      
      return result;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  createNewText = async (user_id) => {
    try {
      let sql = 'INSERT INTO text(text_title,user_id) VALUES(?,?)'
      let values = ['sin título', user_id];
      const result = await executeQuery(sql, values);

      let sql2 = 'SELECT * FROM text WHERE text_id=?';
      const [result2] = await executeQuery(sql2, [result.insertId]);

      return result2;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getText = async (text_id) => {
    try {
      let sql = 'SELECT * FROM text WHERE text_id=?'
      const result = await executeQuery(sql, [text_id]);

      return result;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  saveText = async ({text_id, text_title, text_body, last_modified}) => {
    try {
      let sql = 'UPDATE text SET text_title=?, text_body=?, last_modified=? WHERE text_id=?';
      await executeQuery(sql, [text_title, text_body, last_modified, text_id]);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  publishOrHide = async ({text_id, text_status}) => {
    try {
      let sql = 'UPDATE text SET text_status=? WHERE text_id=?';
      await executeQuery(sql, [text_status, text_id]);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  showServices = async ()=> {

    try {
      const sql = 'SELECT * FROM service';
      const services = await executeQuery(sql);
      return services;
      

    }catch (error) {
      console.log(error);
      throw error;
    }

  }

  createService = async (data) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      //1 check max service id
      let sql1 = 'SELECT MAX(service_id) as max_service_id FROM SERVICE';
      const [result1] = await connection.query(sql1);
      let service_id = result1[0].max_service_id + 1;
      console.log(service_id);
      //2 add new service
      let values = [service_id, data.service_name, data.service_description, data.service_price, data.service_image];
      let sql2 = 'INSERT INTO service(service_id, service_name, service_description, service_price, service_image) VALUES(?,?,?,?,?)'

      await connection.query(sql2, values);

      let sql3 = 'SELECT * FROM service WHERE service_id=(SELECT MAX(service_id) FROM service)'
      const [result3] = await connection.query(sql3);

      await connection.commit();
      
      return result3;

    } catch (error) {
      await connection.rollback();
      console.log(error);
      throw error;
    } finally {
      if(connection){
        connection.release();
      }
    }
  }

  modifyService = async (data) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let values = [data.service_name, data.service_description, data.service_price, data.service_id];
      let sql1 = 'UPDATE service SET service_name=?, service_description=?, service_price=? WHERE service_id=?';
      if(data.service_image){
        values =[data.service_name, data.service_description, data.service_price, data.service_image, data.service_id];
        sql1='UPDATE service SET service_name=?, service_description=?, service_price=?, service_image=? WHERE service_id=?'
      }
      console.log('hasta aca llega');
      
      await connection.query(sql1, values);

      let sql2 = 'SELECT * FROM service WHERE service_id=?';
      const result = await connection.query(sql2, [data.service_id]);

      console.log('resp modify ', result);
      return result;

    } catch (error) {
      await connection.rollback();
      console.log(error);
      throw error;
    } finally {
      if(connection){
        connection.release();
      }
    }
  }

  alterVisible = async ({service_id, is_visible}) => {
    try {
      let sql = 'UPDATE service SET is_visible=? WHERE service_id=?';
      const values = [is_visible, service_id];

      const result = await executeQuery(sql, values);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  deleteService = async (service_id) => {
    try {
      let sql = 'DELETE FROM service WHERE service_id=?';

      await executeQuery(sql, [service_id]);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  addDayHour = async (values) =>  {
    try {
      let sql = `INSERT INTO availability (availability_day, availability_hour) VALUES(?,?)`
      const result = await executeQuery(sql, values)
      return result
    } catch (error) {
      throw error
    }
  }

  getAllDaysHours = async () => {
    try {
      let sql = 'SELECT * FROM availability';
      let result = await executeQuery(sql)
      return result;
    } catch (error) {
      throw error
    }
  }

  deleteDayHour = async (values) => {
    try { 
      let sql = `DELETE FROM availability WHERE availability_day=? AND availability_hour=?`;
      await executeQuery(sql, values);
      
    } catch (error) {
      throw error
    }
  }

  getAppoitment = async () => {
    try {

      let sql = ` SELECT 
                  appointment.*,
                  user.user_name,
                  user.last_name,
                  user.email,
                  user.phone_number,
                  user.avatar
                  FROM appointment, user
                  WHERE appointment.user_id = user.user_id
                  `
      const result = await executeQuery(sql);
      return result
      
    } catch (error) {
      throw error
    }
  }

  appointmentConfirm = async (appointment_id) => {
    try {
      let sql = `UPDATE appointment 
      SET app_status = 2 WHERE appointment_2_id=?
      `
      const result =  await executeQuery(sql, appointment_id)
      return result
    } catch (error) {
      throw error
    }
  }

  appointmentCanceled = async (appointment_id) => {
    try {
      let sql = `UPDATE appointment 
      SET app_status = 3 WHERE appointment_2_id=?
      `
      const result =  await executeQuery(sql, appointment_id)
      return result
    } catch (error) {
      throw error
    }
  }

  activeUser = async (user_id) => {
    try {
      let sql = `UPDATE user 
      SET is_deactivated = 0 WHERE user_id=?`
      await executeQuery(sql, user_id)
    } catch (error) {
      throw error
      
    }
  }

  inactiveUser = async (user_id) => {
    try {
      let sql = `UPDATE user 
      SET is_deactivated = 1 WHERE user_id=?`
      await executeQuery(sql, user_id)
    } catch (error) {
      throw error
      
    }
  }

  getAppoitmentById = async (appointment_id) => {
  try {
    const sql = `
      SELECT 
        user.user_name,
        user.email,
        appointment.app_day,
        appointment.app_hour
      FROM appointment
      JOIN user ON appointment.user_id = user.user_id
      WHERE appointment.appointment_2_id = ?
    `;
    const result = await executeQuery(sql, [appointment_id]);
    return result[0];
  } catch (error) {
    throw error;
  }
};



}

export default new AdminDal();