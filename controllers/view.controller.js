const UserModel            = require("../models/user.model");
const PostModel            = require("../models/post.model");
const { checkUserSession } = require("../helpers/index.helper");

class ViewController {
    #req;
    #res;
    
    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    homepage = async () => {
        this.#res.render("login.ejs");
    }

    wall = async () => {

        try{
            checkUserSession(this.#req);

            let records = await PostModel.getPostsComments();

            this.#res.render("wall.ejs", { DATA: { posts: records.result } });
        }
        catch(error){
            this.#res.redirect("/");
        }
        
    }
}

module.exports = ViewController;