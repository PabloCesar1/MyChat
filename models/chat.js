'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = Schema({
	name: String,
	message: String
});
module.exports = mongoose.model('Chat', ChatSchema);