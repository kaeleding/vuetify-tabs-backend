const mongoose = require('mongoose');
var CryptoJS = require("crypto-js")
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    name: String,
    description: String,
    uploader: String,
    uploaded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', FileSchema);

