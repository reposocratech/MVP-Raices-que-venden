import executeQuery from "../../config/db.js";

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
}

export default new AdminDal();