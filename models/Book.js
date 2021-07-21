const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: { type: String, required: true },
	comments: { type: Array, required: true },
});

module.exports = Book = mongoose.model("Book", bookSchema);
