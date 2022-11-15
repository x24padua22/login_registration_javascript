const session = require("express-session");
const PostModel       = require("../models/post.model");

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
        
        if(this.#req.session.user){
            let records = await PostModel.getPostsComments();

            this.#res.render("wall.ejs", { DATA: { posts: records.result } });
        }
        else{
            this.#res.redirect("/");
        }
    }
}

module.exports = ViewController;