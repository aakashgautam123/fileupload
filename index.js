//requiring dependencies
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
//connecting to mongodb local database
mongoose.connect(
  "mongodb+srv://mediauser:mediauser@cluster0-u4b1t.mongodb.net/test?retryWrites=true&w=majority/assignment_1",
  {
    useNewUrlParser: "true"
  }
);

mongoose.connection.on("error", err => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

//requiring routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
const indexRoutes = require("./routes/index");

//configuring middlewares
app.use(indexRoutes);
app.use(express.static(__dirname + "/assets"));

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
//server started listening
app.listen(process.env.PORT || 3000, () => {
  console.log("server started listening at port ");
});
