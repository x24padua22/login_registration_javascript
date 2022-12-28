const MD5             = require("md5");
const PostModel       = require("../models/post.model");
const { checkFields, checkUserSession } = require("../helpers/index.helper");


class PostController {
    #req;
    #res;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    createPost = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            checkUserSession(this.#req);

            let check_fields = checkFields(["post"], this.#req.body);

            if(check_fields.status){
                let create_post = await PostModel.createPost({ ...check_fields.result, user_id: this.#req.session.user.user_id });

                if(create_post.status && create_post.result.affectedRows){
                    response_data.status = true;
                }
                else{
                    response_data.error = "Something went wrong when creating new post";
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

    deletePost = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            checkUserSession(this.#req);

            let check_fields = checkFields(["post_id"], this.#req.body);

            if(check_fields.status){
                let delete_post = await PostModel.deletePost({ ...check_fields.result, user_id: this.#req.session.user.user_id });

                if(delete_post.status && delete_post.result.affectedRows){
                    response_data.status = true;
                }
                else{
                    response_data.error = "Something went wrong when deleting new post";
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

module.exports = PostController;