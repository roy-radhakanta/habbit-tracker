const Habits = require('../models/Habits');

module.exports.home = async function(req, res){
    const habits = await Habits.find();
    return res.render('home', {
        title: "Home",
        habits: habits
    });
}