const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    task: {
      type: String,
      completed: false,
      required: true,
      trim: true,
      maxLength: 30,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo)
