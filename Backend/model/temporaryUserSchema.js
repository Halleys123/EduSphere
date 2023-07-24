const mongoose = require("mongoose");
const hashPassword = require("../utils/hashPassword");
const { query } = require("express");
const validateEmail = (v) => {
  if (v.endsWith("@nith.ac.in")) return true;
  else return false;
};

const temporaryUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
    maxlength: [40, "A name must have less or equal then 40 characters"],
    minlength: [3, "A name must have more or equal then 3 characters"],
  },
  email: {
    type: String,
    validate: [validateEmail, "enter the email of nit hamirpur"],

    required: [true, "Please provide your email!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  collectionName: {
    type: String,
    required: [true, "Provide a collectionName"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [4, "A password must have more or equal then 8 characters"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180, // TTL expiration in seconds (3 minutes)
  },
});
module.exports = mongoose.model("usersNotVerified", temporaryUserSchema);
