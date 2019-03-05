const mongoose = require('mongoose');
const File = require("../models/file");
const Content = require("../models/content");
var Schema = mongoose.Schema;

var LabeledContentSchema = new Schema({
    labeler: String,
    label: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    type: String,
    file_id: [File.schema],
    content_id: [Content.schema],
    content_part: String,
    content_index: Number

});

module.exports = mongoose.model('LabeledContent', LabeledContentSchema);

