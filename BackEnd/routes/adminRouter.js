const express = require("express");
const router = express.Router();

// Import the relevant controllers
const adminController = require("./../controllers/adminController");

// Define the routes for admin operations
router.post("/admin", adminController.createAdmin);
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);
router.get("/books", adminController.getAllBooks);
router.get("/books/:id", adminController.getBookById);
router.put("/books/:id", adminController.updateBook);
router.delete("/books/:id", adminController.deleteBook);

module.exports = router;
