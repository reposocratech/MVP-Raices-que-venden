import executeQuery, { dbPool } from '../../config/db.js';

class UserDal {
  register = async (data) => {
    try {
      let sql1 = 'SELECT MAX(user_id) as maxUserId from user';

      let [result] = await executeQuery(sql1);
      let { maxUserId } = result;
      if (maxUserId === null) {
        maxUserId = 1;
      } else {
        maxUserId++;
      }

      let sql = 'INSERT INTO user (user_id, email, password) VALUES (?, ?, ?)';
      await executeQuery(sql, [maxUserId, ...data]);
      return maxUserId;
    } catch (error) {
      throw error;
    }
  };

  findEmail = async (email) => {
    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ?';
      const result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  findUserById = async (id) => {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ?';
      const result = executeQuery(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  editPesonalData = async (values) => {
    try {
      let sql = `UPDATE user SET 
                        user_name = ?, 
                        last_name = ?, 
                        phone_number = ?, 
                        user_description = ? 
                        WHERE user_id = ?
                        `;
      const result = await executeQuery(sql, values);
      console.log(result);
    } catch (error) {
      throw error;
    }
  };

  editFacturationData = async (values) => {
    try {
      let sql = `UPDATE user SET 
                        company_name = ?, 
                        nif_cif = ?, 
                        city = ?, 
                        province = ?,
                        address = ? 
                        WHERE user_id = ?
                        `;
      const result = await executeQuery(sql, values);
      console.log(result);
    } catch (error) {
      throw error;
    }
  };

  editImage = async (values) =>  {
      try {
          console.log("Desde DAL EDIT IMAGE", values)
          if (values.length === 2) {
              let sql =   `UPDATE user SET avatar = ?
                          WHERE user_id = ?`;
              let result = await executeQuery(sql, values);
              console.log("Desde DAL EDIT IMAGE", result)
          }
          
      } catch (error) {
          throw error
      }
  }

  addRedSocialData = async (data) => {

    try {

      let sql1 = 'SELECT MAX(social_network_id) as social_id from social_network';

      let [result] = await executeQuery(sql1);
      let { social_id } = result;
      if (social_id === null) {
        social_id = 1;
      } else {
        social_id++;
      }

      let sql = `INSERT INTO social_network 
                (social_network_id, user_id, name, link) VALUES (?, ?, ?, ?)`
      await executeQuery(sql, [social_id, ...data]);

      return social_id;

    } catch (error) {
        throw error;
    } 

  }

  getRedSocial = async (user_id) => {
    try {

      let sql = 'SELECT * FROM social_network WHERE user_id = ?'

      let result = await executeQuery(sql, user_id);
      
      return result
    } catch (error) {
      throw error
    }
  }

  deleteRedSocial = async (id) => {
    try {

      if (id) {
        let sql = 'DELETE FROM social_network WHERE social_network_id = ?';
        await executeQuery(sql, [id]);
      }
      
    } catch (error) {
      throw error;
    }
  }


}

export default new UserDal();
