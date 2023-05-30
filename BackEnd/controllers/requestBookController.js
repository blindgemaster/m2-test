const RequestBook = require("./../models/requestedBooksModel");

exports.requestBook = async (req, res) => {
  try {
    const { bookId, userId, issueDays } = req.body;

    const book = await RequestBook.create({ userId, bookId, issueDays });
    console.log(book);

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
    const books = await RequestBook.find()
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
exports.getBooksById = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await RequestBook.find({ userId })
      .populate(`userId`)
      .populate(`bookId`);
    // console.log(books);

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

exports.deleteRequest = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    await RequestBook.findOneAndDelete({ userId, bookId });
    res.status(202).json({
      message: "done",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};
