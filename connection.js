const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
	process.env.DB,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	function (err) {
		if (err) {
			return console.log(err);
		}
		console.log("Connected to database");
	}
);
