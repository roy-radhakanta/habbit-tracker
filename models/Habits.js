const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    habit: {
      type: String,
      require: true,
    },
    status: {
      type: Object
    }
  },
  {
    timestamps: true,
  }
);

const Habits = mongoose.model("Habits", habitSchema);
module.exports = Habits;
