const express = require("express");

const router = express.Router();

const booksController = require("./../controllers/booksController");

router.get("/", booksController.getBooks);
router.get("/:id", booksController.getBookById);
router.post("/create", booksController.createBook);
router.post("/request", booksController.requestBook);
router.put("/update", booksController.editBook);
router.delete("/delete", booksController.deleteBook);

module.exports = router;
