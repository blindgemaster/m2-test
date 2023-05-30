const mongoose = require("mongoose");
const requestBooksSchema = mongoose.Schema(
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
requestBooksSchema.index({ bookId: 1, userId: 1 }, { unique: true });

const RequestBooks = mongoose.model("requestBooks", requestBooksSchema);
module.exports = RequestBooks;
