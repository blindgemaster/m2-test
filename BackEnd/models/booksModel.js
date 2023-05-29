const mongoose = require("mongoose");
const booksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name Is Required"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "author Is Required"],
    },
    price: {
      type: String,
      required: [true, "price Is Required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Books = mongoose.model("books", booksSchema);
module.exports = Books;
