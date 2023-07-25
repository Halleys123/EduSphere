const assignmentModel = require("../model/assignmentSchema");

//router.route("/assignments/:section").get(getData);
const CustomError = require("../utils/CustomErrorClass");
async function getDataMore(req, res, next) {
  const section = req.collectionName;
  console.log(req.user);
  try {
    const data = await assignmentModel.findOne({ section });
    res.status(200).json({
      status: "success",
      data: data,
      user: req.user,
    });
  } catch (err) {
    const error = new CustomError(err.message, 400);
    return next(error);
  }
}
async function getData(req, res) {
  console.log(req.params);
  try {
    const data = await assignmentModel.findOne(req.params);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}
async function postData(req, res) {
  console.log(req.body);
  try {
    const data = await assignmentModel.create(req.body);
    console.log(data);
    res.status(200).json({
      status: "success",
      data: data,
      reqBody: req.body,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      reqBody: req.body,
    });
  }
}

module.exports = {
  getData,
  postData,
  getDataMore,
};
