const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
    maxlength: [40, "A name must have less or equal then 40 characters"],
    minlength: [3, "A name must have more or equal then 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number!"],
    unique: true,
    trim: true,
    minlength: [
      10,
      "A phone number must have more or equal then 10 characters",
    ],
    maxlength: [
      10,
      "A phone number must have less or equal then 10 characters",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [4, "A password must have more or equal then 8 characters"],
    select: false,
  },
  mess: {
    type: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        breakfast: {
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comments: {
            type: [String],
            default: [],
          },
        },
        lunch: {
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comments: {
            type: [String],
            default: [],
          },
        },
        dinner: {
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comments: {
            type: [String],
            default: [],
          },
        },
      },
    ],
    default: [],
  },
  complaints: {
    type: [
      {
        date: {
          type: Date,
        },
        complaint: {
          type: String,
        },
        status: {
          type: String,
          enum: ["pending", "resolved"],
          default: "pending",
        },
        isSeen: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
});

module.exports = userSchema;
