const IssueBook = require("./../models/issuedBooksModel");
const RequestBook = require("./../models/requestedBooksModel");

exports.issueBook = async (req, res) => {
  try {
    const { bookId, userId, issueDays } = req.body;
    let issueDate = new Date().toISOString().slice(0, 10);
    let returnDate = new Date(); // console.log(date);
    let fine = issueDays * 100;
    returnDate.setDate(returnDate.getDate() + issueDays);
    returnDate = returnDate.toISOString().slice(0, 10);
    console.log(returnDate, issueDate, fine, issueDays, bookId, userId);

    const book = await IssueBook.create({
      userId,
      bookId,
      issueDays,
      issueDate,
      returnDate,
      fine,
    });
    console.log(book);
    await RequestBook.findOneAndDelete({ userId, bookId });
    res.status(201).json({
      message: "done",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};
// .populate("requestedBooks.book");
exports.getBooks = async (req, res) => {
  try {
    const books = await IssueBook.find().populate(`userId`).populate(`bookId`);
    console.log(books);

    res.status(200).json({
      status: "success",
      books: books,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};
exports.getBooksById = async (req, res) => {
  try {
    console.log("Hi");
    const { userId } = req.params;
    const books = await IssueBook.find({ userId })
      .populate(`userId`)
      .populate(`bookId`);
    console.log(books);

    res.status(200).json({
      status: "success",
      books: books,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};
