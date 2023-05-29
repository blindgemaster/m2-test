const express = require("express");

const router = express.Router();

const userController = require("./../controllers/userControllers");

router.post("/create", userController.signUp);
router.post("/login", userController.login);
router.get("/isLoggedIn/:token", userController.isLoggedIn);
module.exports = router;
