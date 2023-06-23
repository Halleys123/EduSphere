const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validateEmail = (v) => {
  if (v.endsWith("@nith.ac.in")) return true;
  else return false;
};
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
    validate: [validateEmail, "enter the email of nit hamirpur"],

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
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this);
});
userSchema.statics.loginCheck = async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("Wrong Password");
  }
  throw Error("Wrong email");
};
module.exports = userSchema;
