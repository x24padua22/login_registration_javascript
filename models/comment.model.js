const Mysql = require("mysql");
const DBConnection = require("../models/connection")

class CommentModel {
    constructor(){}

    createComment= async (post_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_comment_query = Mysql.format(`INSERT INTO comments SET ?, created_at = NOW();`, post_data);
        response_data = await DBConnection.executeQuery(create_comment_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deleteComment = async (post_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let delete_comment_query = Mysql.format(`DELETE FROM comments WHERE id = ? AND user_id = ?;`, [post_data.comment_id, post_data.user_id]);
            response_data = await DBConnection.executeQuery(delete_comment_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}


module.exports = new CommentModel();