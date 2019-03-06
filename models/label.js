const mongoose = require("mongoose");
const File = require("../models/file");
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
  label: [String],
  type: String,
  file_id: [File.schema]
});

module.exports = mongoose.model("Label", LabelSchema);
