let Schema = require("mongoose").Schema();
let mongoose = require("mongoose");

let keywordsSchema = mongoose.Schema({
  _media: { type: Schema.ObjectId, ref: "Media" },
  name: String
});

module.exports = mongoose.model("Keyword", keywordsSchema, "keywords");
