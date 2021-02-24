const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: String,
	age: Number,
	country: String
});

module.exports = model("User", userSchema);
