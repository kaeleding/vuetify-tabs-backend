const mongoose = require("mongoose");
const File = require("../models/file");
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
  label: [String],
  type: String
});

module.exports = mongoose.model("Label", LabelSchema);
