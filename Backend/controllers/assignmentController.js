const assignmentModel = require("../model/assignmentSchema");
//router.route("/assignments/:section").get(getData);

async function getData(req, res) {
  // console.log(req.query);
  console.log(req.query);
  try {
    const data = await assignmentModel.findOne(req.query);
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
async function getDataMore(req, res) {
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
