const express = require("express");

const { getData, postData } = require("../controllers/assignmentController");

const router = express.Router();

router.route("/assignments").get(getData);
router.route("/assignments").post(postData);

module.exports = router;
