const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.MONGO_URL;
mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to database"));

db.once("open", function () {
  console.log("Connected to db: 3000");
});

module.exports = db;