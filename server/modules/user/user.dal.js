import executeQuery from "../../config/db.js";

class UserDal {
    register = async (data) => {
        try {
            let sql1 = "SELECT MAX(user_id) as maxUserId from user";
            
            let [ result ] = await executeQuery(sql1);
            let { maxUserId } = result;
            if (maxUserId === null) {
                maxUserId = 1;
            }else {
                maxUserId++;
            }

            let sql = "INSERT INTO user (user_id, email, password) VALUES (?, ?, ?)";
            await executeQuery(sql, [maxUserId, ...data]);
            return maxUserId;
        } catch (error) {
            throw error
        }
        
    }
}

export default new UserDal();
