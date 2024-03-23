const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const db = require('./config/mongoose');

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./assets"));
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes"));

app.listen(process.env.PORT, function (error) {
  if (error) {
    console.log(`Error while start the app on port ${process.env.PORT}`);
    return;
  }
  console.log(`App is connected:: ${process.env.PORT}`);
});
