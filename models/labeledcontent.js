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
  file_id: String,
  content_id: String,
  content_part: String,
  content_index: Number
});

module.exports = mongoose.model("LabeledContent", LabeledContentSchema);
