const Mysql = require("mysql");
const DBConnection = require("../models/connection")

class PostModel {

    constructor(){}

    getPostsComments = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let get_posts_comments_query = Mysql.format(`
                SELECT 
                    posts.id, posts.post, DATE_FORMAT(posts.created_at, "%M %D %Y") AS created_at,
                    CONCAT(users.first_name, " ", users.last_name) AS posted_by,
                    (
                        SELECT JSON_OBJECTAGG(
                            comments.id, 
                            JSON_OBJECT(
                                'comment', comments.comment,
                                'commented_by', CONCAT(users.first_name, " ", users.last_name),
                                'created_at', DATE_FORMAT(comments.created_at, "%M %D %Y")
                            )
                        )
                        FROM comments
                        INNER JOIN users ON users.id = comments.user_id
                        WHERE comments.post_id = posts.id
                    ) AS comments
                FROM wall.posts
                INNER JOIN users ON users.id = posts.user_id
                ORDER BY posts.id DESC;
            `);
            response_data = await DBConnection.executeQuery(get_posts_comments_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    createPost = async (post_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_post_query = Mysql.format(`INSERT INTO posts SET ?, created_at = NOW();`, post_data);
            response_data = await DBConnection.executeQuery(create_post_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deletePost = async (post_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let delete_post_query = Mysql.format(`DELETE FROM posts WHERE id = ? AND user_id = ?;`, [post_data.post_id, post_data.user_id]);
            response_data = await DBConnection.executeQuery(delete_post_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = new PostModel();