const { Schema, model } = require("mongoose");

const hobbySchema = new Schema({
	title: String,
	description: String
});

module.exports = model("Hobby", hobbySchema);
