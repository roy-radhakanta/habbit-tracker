const Habits = require('../models/Habits');

module.exports.addNewHabit = async function(req, res){
    if(!req?.body){
        return res.status(400).json({status: false, msg: "Invalid request! please add habit to continue"});
    }
    const habit = req.body.habit;
    if(habit==""){
        return res.status(400).json({status: false, msg: "Empty habit! please add habit to continue"});
    }
    const added = await Habits.create({habit: habit});
    if(added && added._id){
        return res.status(200).json({status: true, msg: "Successfully created! habit added", id: added._id});
    }
    return res.status(400).json({status: false, msg: "Try again! Habit not added"});
}