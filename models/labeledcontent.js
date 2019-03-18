const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LabeledContentSchema = new Schema({
  labeler: String,
  label: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  type: String,
<<<<<<< HEAD
  file_id: String,
  content_id: String,
=======
  //file_id: String,
  //content_id: String
  file_id: [File.schema],
  content_id: [Content.schema],
>>>>>>> 6f1cb8ecc5c5a4db990774d71927cf615255972a
  content_part: String,
  content_index: Number
});

module.exports = mongoose.model("LabeledContent", LabeledContentSchema);
