const Books = require("./../models/booksModel");
const User = require("./../models/userModel");
exports.createBook = async (req, res) => {
  const { name, author, price } = req.body;
  const newBook = await Books.create({ name, author, price });
  res.status(200).json({ book: newBook });
};
exports.getBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json({
      books: books,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    res.status(200).json({ book: book });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};
exports.requestBook = async (req, res) => {
  try {
    const { bookId, userId, issueDays } = req.body;
    const newBook = {
      book: bookId,
      issueDays: issueDays,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { requestedBooks: newBook },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("requestedBooks.book");
    console.log(user.requestedBooks);

    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    await Books.findByIdAndDelete(bookId);
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { name, author, price, bookId } = req.body;
    const book = await Books.findById(bookId);
    book.name = name;
    book.author = author;
    book.price = price;
    await book.save();
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};
