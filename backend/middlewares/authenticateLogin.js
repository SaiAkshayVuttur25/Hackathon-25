// const mongoose = require("mongoose");
// const { User } = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
// const secret = process.env.JWT_KEY;

// function authenticateLogin(req, res, next) {
//   let token = req.body.token;
   // console.log(req.body,token,secret);
//   jwt.verify(token, secret, (err, data) => {
//     if (err) {
//       res.send({ message: "LOGIN FIRST" });
//     } else {
//       next();
//     }
//   });
// }

// module.exports = { authenticateLogin };


const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.JWT_KEY;

function authenticateLogin(req, res, next) {
  // Get token from Authorization header or cookies
  let token = req.headers.authorization?.split(" ")[1] ;

  // Check if token is missing
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Please log in." });
  }

  // Verify the token
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    } else {
      // Store user data in res.locals for downstream use
      res.locals.user = data;
      // console.log("Authenticated user:", data);
      next();
    }
  });
}

module.exports = { authenticateLogin };
