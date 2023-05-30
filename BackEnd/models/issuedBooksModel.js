const mongoose = require("mongoose");
const issuedBooksSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userId Is Required"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "bookId Is Required"],
      ref: "books",
    },
    issueDays: {
      type: Number,
      required: [true, "issueDays Is Required"],
    },
    issueDate: String,
    returnDate: String,
    fine: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
issuedBooksSchema.index({ bookId: 1, userId: 1 }, { unique: true });

const IssuedBooks = mongoose.model("issuedBooks", issuedBooksSchema);
module.exports = IssuedBooks;
