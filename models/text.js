const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TextSchema = new Schema({
    text: String
});

module.exports = mongoose.model('Text', TextSchema);