import executeQuery, { dbPool } from "../../config/db.js";

class AdminDal {
  showServices = async ()=> {

    try {
      const sql = 'SELECT * FROM service';
      const services = await executeQuery(sql);
      console.log("***************", services)
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
      console.log(error);
      throw error;
    }
  }
}

export default new AdminDal();