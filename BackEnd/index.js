const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
const userRouter = require("./routes/userRouter");
const booksRouter = require("./routes/booksRouter");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "true");

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request headers you wish to allow
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://cdnjs.cloudflare.com"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose.set("strictQuery", true);
// Connecting Database
mongoose
  .connect(
    "mongodb+srv://quizcashapp:quizcashapp@quizcashapp.lqu9f.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connection Done");
  });

// Routers

app.use("/user", userRouter);
app.use("/books", booksRouter);

// App Server

app.listen(port, () => {
  console.log(`app is running on server ${port}`);
});
