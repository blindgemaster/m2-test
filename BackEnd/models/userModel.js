const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name Is Required"],
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
    },
    role: {
      type: String,
      enum: ["student", "admin", "superadmin"],
      default: "student",
    },

    requestedBooks: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "books",
        },
        issueDays: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hashing The Password
userSchema.pre("save", async function (next) {
  // Hash the password with saltRound = 12
  this.password = await bcrypt.hash(this.password, 12); // returns promise
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // candidatePassword--> input password
  // userPassword--> hashed password
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
