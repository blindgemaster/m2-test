const express = require("express");

const router = express.Router();

const booksController = require("./../controllers/booksController");
const requestBookController = require("./../controllers/requestBookController");
const issueBookController = require("./../controllers/issuedBooksController");
router.get("/", booksController.getBooks);
router.post("/create", booksController.createBook);
router.put("/update", booksController.editBook);
router.delete("/delete", booksController.deleteBook);

router.post("/request", requestBookController.requestBook);
router.get("/request", requestBookController.getBooks);
router.delete(
  "/request/:bookId/delete/:userId",
  requestBookController.deleteRequest
);
router.get("/request/:userId", requestBookController.getBooksById);

router.post("/issue", issueBookController.issueBook);
router.get("/issue", issueBookController.getBooks);
router.get("/issue/:userId", issueBookController.getBooksById);

router.get("/:id", booksController.getBookById);

module.exports = router;
