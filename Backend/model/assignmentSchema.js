const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Please provide the subject name!"],
    trim: true,
  },
  assignments: {
    type: [
      {
        title: {
          type: String,
          required: [true, "Please provide the title!"],
          trim: true,
        },
        dueDate: {
          type: Date,
          required: [true, "Please provide the due date!"],
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        isStudyMaterial: {
          type: Boolean,
          default: false,
        },
        dateGiven: {
          type: Date,
          default: Date.now,
        },
        dateCompleted: {
          type: Date,
        },
        description: {
          type: String,
          trim: true,
        },
        files: {
          type: [String],
          default: [],
        },
      },
    ],
  },
});

module.exports = assignmentSchema;
