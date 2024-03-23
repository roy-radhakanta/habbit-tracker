const Habits = require("../models/Habits");

module.exports.home = async function (req, res) {
  try {
    const habits = await Habits.find();
    return res.render("home", {
      title: "Home",
      habits: habits,
    });
  } catch (error) {
    return res.render("home", {
      title: "Home",
      habits: [],
    });
  }
};
