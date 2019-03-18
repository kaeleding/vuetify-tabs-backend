const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
  label: [String],
<<<<<<< HEAD
  type: String,
  file_id: String
=======
  type: String
>>>>>>> 6f1cb8ecc5c5a4db990774d71927cf615255972a
});

module.exports = mongoose.model("Label", LabelSchema);
