const MD5             = require("md5");
const CommentModel       = require("../models/comment.model");
const { checkFields, checkUserSession } = require("../helpers/index.helper");


class CommentController {
    #req;
    #res;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    createComment = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            checkUserSession(this.#req);

            let check_fields = checkFields(["comment", "post_id"], this.#req.body);

            if(check_fields.status){
                let create_comment = await CommentModel.createComment({ ...check_fields.result, user_id: this.#req.session.user.user_id });

                if(create_comment.status && create_comment.result.affectedRows){
                    response_data.status = true;
                }
                else{
                    response_data.error = "Something went wrong when creating new comment";
                }
            }
            else{
                response_data = check_fields;
            }
        }
        catch(error){
            console.log(error)
            response_data.error = error;
        }

        this.#res.json(response_data);
    }

    deleteComment = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            checkUserSession(this.#req);
            
            let check_fields = checkFields(["comment_id"], this.#req.body);

            if(check_fields.status){
                let delete_comment = await CommentModel.deleteComment({ ...check_fields.result, user_id: this.#req.session.user.user_id });

                if(delete_comment.status && delete_comment.result.affectedRows){
                    response_data.status = true;
                }
                else{
                    response_data.error = "Something went wrong when deleting new comment";
                }
            }
            else{
                response_data = check_fields;
            }
        }
        catch(error){
            console.log(error)
            response_data.error = error;
        }

        this.#res.json(response_data);
    }
}

module.exports = CommentController;