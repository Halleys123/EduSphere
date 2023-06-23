const userSchema = require("../model/userSchema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secretJwt", { expiresIn: maxAge });
};
module.exports.signUp = async (req, res) => {
  const { password, email, name, section, session, phone } = req.body;
  try {
    const model = mongoose.model(`${session}${section}`, userSchema);
    const user = await model.create({ email, password, name, phone });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(201).json({ user });
  } catch (e) {
    console.log(e);
  }
};
module.exports.login = async (req, res) => {
  const { email, password, section, session } = req.body;
  const model = mongoose.model(`${session}${section}`, userSchema);

  const user = await model.loginCheck(email, password);
  res.json(user);
};
