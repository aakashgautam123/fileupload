let mongoose = require("mongoose");

let mediaSchema = new mongoose.Schema({
  imageName: String,
  caption: String,
  make: String,
  model: String,
  exposureTime: String,
  creationTime: String,
  focalLength: String,
  gps: String
});

module.exports = mongoose.model("Media", mediaSchema, "medias");
