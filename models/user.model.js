const Mysql = require("mysql");
const DBConnection = require("../models/connection")

class UserModel {

    constructor(){}

    getUser = async (where_fields, where_params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let get_user_query = Mysql.format(`SELECT * FROM users WHERE ${where_fields};`, where_params);
            response_data = await DBConnection.executeQuery(get_user_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    createUser = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_user_query = Mysql.format(`INSERT INTO users SET ?, created_at = NOW();`, user_data);
            response_data = await DBConnection.executeQuery(create_user_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}


module.exports = new UserModel();