const { Schema, model } = require("mongoose");

const hobbySchema = new Schema({
	title: String,
	description: String,
	userId: String
});

module.exports = model("Hobby", hobbySchema);
