const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
  label: [String],
  type: String,
  file_id: String
});

module.exports = mongoose.model("Label", LabelSchema);
