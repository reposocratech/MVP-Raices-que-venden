import executeQuery from "../../config/db.js";

class PublicDal {
  confirm = async (user_id) => {
        try {
            console.log(user_id, 'asdsadsadfgasdfadsfads');
            let sql = 'SELECT * FROM user WHERE user_id=?';
            const [resConfirm] = await executeQuery(sql, [user_id]);
            console.log(resConfirm, 'asdsadsadfgasdfadsfads');
            if(resConfirm){
              let sql2 = 'UPDATE user SET is_validated=1 WHERE user_id=?'
              await executeQuery(sql2, [user_id]);
              resConfirm.is_validated = 1;
            }

            return resConfirm;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

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

export default new PublicDal();