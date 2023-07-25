const fetchUserRouter = require("express").Router();
const auth = require("../utils/auth");
const fetchUser = require("../controllers/fetchUser");
fetchUserRouter.route("/fetchUser").get(auth, fetchUser);
module.exports = fetchUserRouter;
