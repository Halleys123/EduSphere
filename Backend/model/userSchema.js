const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validateEmail = (v) => {
  if (v.endsWith("@nith.ac.in")) return true;
  else return false;
};
const attendanceItem = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  classes: {
    type: Number,
    default: 0,
  },
  time: [Date],
  status: [String],
  reason: [String],
});
const subjectItem = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  totalClasses: {
    type: Number,
    default: 0,
  },
  present: {
    type: Number,
    default: 0,
  },
  absent: {
    type: Number,
    default: 0,
  },
  unknown: {
    type: Number,
    default: 0,
  },
  attendance: [attendanceItem],
});
const complaintItem = new mongoose.Schema({
  date: {
    type: Date,
  },
  complaint: {
    type: String,
  },
  type: String,
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});
const userSchema = new mongoose.Schema({
  hostel: { required: [true, "hostel required"], type: String },
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

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [4, "A password must have more or equal then 8 characters"],
  },
  logInCounter: {
    type: Number,
    default: 0,
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
            type: [
              {
                text: String,
                time: Date,
              },
            ],
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
  complaints: [complaintItem],
  attendance: [subjectItem],
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
