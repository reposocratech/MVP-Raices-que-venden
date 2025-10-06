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

  addRedSocialData = async (data) => {
    const { user_id, name, link } = data;
    const connection = await dbPool.getConnection();

    try {
        await connection.beginTransaction();
        
        const sql = `INSERT INTO social_network (user_id, name, link) VALUES (?, ?, ?)`;
        const values = [user_id, name, link];
        
        await connection.query(sql, values);
        
        await connection.commit();
        return { id: result.insertId, user_id, name, link };


    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}


}

export default new UserDal();
