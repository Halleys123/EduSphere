const express = require("express");

const { getData } = require("../controllers/messController");
const router = express.Router();
router.route("/mess/:hostel").get(getData);
module.exports = router;
