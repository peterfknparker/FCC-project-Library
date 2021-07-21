/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const Book = require("../models/Book");

module.exports = function (app) {
	app
		.route("/api/books/")
		.get(function (req, res) {
			//response will be array of book objects
			//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

			Book.find()
				.lean()
				.exec(function (err, books) {
					if (!err && books) {
						books.map((book, i) => {
							books[i].commentcount = book.comments.length;
						});

						res.json(books);
					} else if (!book) {
						res.send("no book exists");
					}
				});
		})

		.post(function (req, res) {
			//response will contain new book object including atleast _id and title

			let { title, comments } = req.body;

			if (!title) {
				return res.send("missing required field title");
			}

			let NewBook = new Book({
				title: title,
			});

			NewBook.save(function (err, saved) {
				if (!saved && err) {
					res.send("error saving book");
				} else if (saved) {
					res.json({
						_id: saved._id,
						title: saved.title,
					});
				}
			});
		})

		.delete(function (req, res) {
			Book.deleteMany(function (err, deleted) {
				if (err) return res.send("error deleting");
				res.send("complete delete successful");
			});
		});

	app
		.route("/api/books/:id")
		.get(function (req, res) {
			//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
			//response will be array of book objects
			let { id } = req.params;
			if (!id) {
				return res.send("no book exists");
			}

			Book.find({ _id: id }, function (err, book) {
				if (!err && book) {
					res.json(book);
				} else if (!book) {
					res.send("no book exists");
				}
			});
		})

		.post(function (req, res) {
			let { id } = req.params;
			let comment = req.body.comment;
			//json res format same as .get
			if (!id) {
				return res.send("no book exists");
			}
			if (!comment) {
				return res.send("missing required field comment");
			}

			Book.findOneAndUpdate(
				{ _id: id },
				{ $push: { comments: comment } },
				{ new: true },
				function (err, updated) {
					if (err) return res.send("no book exists");
					res.json(updated);
				}
			);
		})

		.delete(function (req, res) {
			let { id } = req.params;
			//if successful response will be 'delete successful'
			if (!id) {
				return res.send("no book exists");
			}
			Book.findOneAndDelete({ _id: id }, function (err) {
				if (err) return res.send("no book exists");
				return res.send("delete successful");
			});
		});
};
