import executeQuery from "../../config/db.js";

class AppointmentDal {

    reserveAppointment = async (data) => {
        try {
            const sql = 'INSERT INTO appointment (app_day, app_hour, app_date, user_id) VALUES (?,?,?,?)'
            const result = await executeQuery(sql, data);
            return result;

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    getAvailableAppointment = async (startDate, endDate) => {
        try {
            const sql = 'SELECT * FROM appointment WHERE app_status = 1 AND app_date BETWEEN ? AND ? '

            const result = await executeQuery(sql, [startDate, endDate])
            return result;

        } catch (error) {
            console.log(error)
            throw error;
        }

    }

}

export default new AppointmentDal;