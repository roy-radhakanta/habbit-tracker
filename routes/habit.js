const express = require("express");
const router = express.Router();

const habitController = require('../controllers/habit_controller');

router.post('/addnew', habitController.addNewHabit);
router.post('/update', habitController.updateHabit);
module.exports = router;