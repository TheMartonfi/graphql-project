const { Schema, model } = require("mongoose");

const postSchema = new Schema({
	comment: String,
	userId: String
});

module.exports = model("Post", postSchema);
