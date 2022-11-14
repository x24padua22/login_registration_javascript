const { Router }     = require("express");
const ViewController = require("../controllers/view.controller");
const UserController = require("../controllers/user.controller");

const WallRoute = Router();

WallRoute.get("/", (req, res) => { new ViewController(req, res).homepage(); });

WallRoute.post("/login", (req, res) => { new UserController(req, res).login() });
WallRoute.post("/register", (req, res) => { new UserController(req, res).register() });

module.exports = WallRoute;