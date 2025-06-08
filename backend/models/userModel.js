// const mongoose = require("mongoose");
// let userSchema = mongoose.Schema({
//   isAdmin: Boolean,
//   name: String,
//   enrollment: String,
//   username: String,
//   password: String,
// });
// const User = mongoose.model("User", userSchema);

// module.exports = { User };

// ✅ models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  name: String,
  enrollment: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
