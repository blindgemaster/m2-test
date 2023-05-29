const User = require("./../models/userModel");
const Book = require("./../models/booksModel");

const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const secretKey = "sadeem";
const signToken = (id) =>
  jwt.sign({ id: id }, secretKey, {
    expiresIn: 1000,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
    // cookie will only be sent on an encrypted connection(https)
    httpOnly: false,
    // cookie can't be modified by the browser
    secure: true,
  };
  //   cookieOptions.secure =
  //     req.secure || req.headers["x-forwarded-proto"] === "https";

  res.cookie("jwt", token, cookieOptions);

  // Removes the password from output
  // eslint-disable-next-line no-param-reassign
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
};
exports.signUp = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
    });
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    // 2) check if user exists and password is correct
    const user = await User.findOne({ name: name });
    console.log(user);
    // correctPassword is an instance method which will be available in all documents of a certain collection
    // user--> document
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(404).json({
        message: "User does not exist",
      });
    } else {
      //  If everything is ok, send token to the client
      createSendToken(user, 200, req, res);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  // Authorization: Bearer {token}
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("Token: " + token);
  if (!token) {
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, secretKey);
  // console.log(decoded);

  // 3) Check if user still exists(if deleted from DB or not)
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
  }

  // GRANT ACCESS TO THE PROTECTED ROUTE
  req.user = currentUser; // storing user to the req
  res.locals.user = currentUser; // user--> this variable will be available for every pug templates
  next();
};

exports.isLoggedIn = async (req, res) => {
  try {
    const token = req.params.token;
    // 1) verify token
    const decoded = await promisify(jwt.verify)(token, secretKey);

    // 2) Check if user still exists
    const currentUser = await User.findById(decoded.id).populate(
      "requestedBooks.book"
    );
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({
        user: currentUser,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
