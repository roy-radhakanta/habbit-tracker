const Habits = require("../models/Habits");

module.exports.addNewHabit = async function (req, res) {
  if (!req?.body) {
    return res.status(400).json({
      status: false,
      msg: "Invalid request! please add habit to continue",
    });
  }
  const habit = req.body.habit;
  if (habit == "") {
    return res.status(400).json({
      status: false,
      msg: "Empty habit! please add habit to continue",
    });
  }
  const added = await Habits.create({ habit: habit });
  if (added && added._id) {
    return res.status(200).json({
      status: true,
      msg: "Successfully created! habit added",
      id: added._id,
    });
  }
  return res
    .status(400)
    .json({ status: false, msg: "Try again! Habit not added" });
};

module.exports.updateHabit = async function (req, res) {
  if (!req?.body) {
    return res
      .status(400)
      .json({ status: false, msg: "Invalid request! try again" });
  }
  const hid = req.body.hid;
  const status = req.body.status;
  if (hid == "") {
    return res
      .status(400)
      .json({ status: false, msg: "Invalid habit! try again" });
  }
  const habit = await Habits.findById(hid);
  if (!habit) {
    return res
      .status(400)
      .json({ status: false, msg: "Invalid habit! try again" });
  }
  const habitStatus = habit.status;
  const date = new Date();
  const todayDate = date.toLocaleDateString();
  const currentTime = date.toLocaleTimeString();
  habitStatus[todayDate] = {
    date: todayDate,
    timeStamp: todayDate + " " + currentTime,
    status: status
  };
  const updated  = await Habits.updateOne({_id: hid}, {status: habitStatus});
  if(updated && updated?.acknowledged){
    return res
    .status(200)
    .json({ status: true, msg: "Successfully updated" });
  }else{
    return res
    .status(200)
    .json({ status: false, msg: "Error while updating" });
  }
};
