const assignmentModel = require("../model/assignmentSchema");

async function getData(req, res) {
  // console.log(req.query);
  try {
    const data = await assignmentModel.findOne(req.body);
    // console.log(data);
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
};
