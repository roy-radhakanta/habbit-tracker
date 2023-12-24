const express = require("express");
const router = express.Router();

const habitController = require('../controllers/habit_controller');

router.post('/addnew', habitController.addNewHabit);
module.exports = router;