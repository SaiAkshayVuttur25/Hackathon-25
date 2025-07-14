const mongoose = require("mongoose");
// const { User } = require("../models/userModel");
const User = require("../models/userModel");
const redis = require('../redis/redisClient.js'); 
const { Blog } = require("../models/blogModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let secret = process.env.JWT_KEY;

exports.getUserInfo = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      isLoggedin: false,
      user: { isAdmin: false },
      message: "No token provided",
    });
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(401).json({
        isLoggedin: false,
        user: { isAdmin: false },
        message: "Invalid token",
      });
    }

    res.status(200).json({
      isLoggedin: true,
      user: data,
    });
  });
};

exports.getUserInfoWithRedis = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      isLoggedin: false,
      user: { isAdmin: false },
      message: "No token provided",
    });
  }

  // Try cache first
  const cacheKey = `userInfo:${token}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(401).json({
        isLoggedin: false,
        user: { isAdmin: false },
        message: "Invalid token",
      });
    }

    const result = {
      isLoggedin: true,
      user: data,
    };

    // Cache for 5 minutes
    redis.set(cacheKey, JSON.stringify(result), 'EX', 300);

    res.status(200).json(result);
  });
};

exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const username = req.body.username;
    const password = md5(req.body.password); // still recommend bcrypt later
    const enrollment = req.body.enrollment.toUpperCase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send({ message: 4 }); // User already exists
    }

    const newUser = new User({
      isAdmin: false,
      name,
      username,
      password,
      enrollment,
    });

    await newUser.save();
    res.send({ message: 1 }); // Successfully registered
  } catch (err) {
    // console.error(err);
    res.send({ message: 0 }); // Error occurred
  }
};


exports.login = (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);

  User.find(
    {
      username: username,
      password: password,
    },
    function (err, user) {
      if (err) {
        // console.log(err);
        res.send({
          message: 0,
          isLoggedin: false,
          user: { isAdmin: false },
        });
      } else {
        if (user.length > 0) {
          let currentUser = {
            isAdmin: user[0].isAdmin,
            name: user[0].name,
            _id: user[0]._id,
          };

          const token = jwt.sign(currentUser, secret, { expiresIn: "5h" });

          res.cookie("authToken", token, {
            httpOnly: true, 
            maxAge: 5 * 60 * 60 * 1000,
            path: "/",
            sameSite: "lax", // Helps with cross-site requests
            // secure: true, // Enable this in production (requires HTTPS)
          });

          res.send({
            message: 1, 
            isLoggedin: true,
            user: currentUser,
            token: token, 
          });
        } else {
          res.send({
            message: 0,
            isLoggedin: false,
            user: { isAdmin: false },
          });
        }
      }
    }
  );
};

exports.resetPassword = (req, res) => {
  let username = req.body.username;
  let enrollment = req.body.enrollment.toUpperCase();
  let newPassword = md5(req.body.password);

  User.updateOne(
    { username: username, enrollment: enrollment },
    { password: newPassword },
    function (err, users) {
      if (err) {
        // console.log(err);
        res.send({ message: 3 });
      } else {
        if (users.matchedCount == 1) {
          res.send({ message: 4 });
        } else {
          res.send({ message: 0 });
        }
      }
    }
  );
};

exports.myblogs = (req, res) => {
  let userid = req.body.userid;
  Blog.find({ userId: userid }, function (err, blogs) {
    if (err) {
      // console.log(err);
      res.send({ message: 0 });
    } else {
      res.send({ data: blogs });
    }
  });
};

exports.myblogsWithRedis = async (req, res) => {
  let userid = req.body.userid;
  const cacheKey = `myblogs:${userid}`;

  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.send({ data: JSON.parse(cached) });
  }

  Blog.find({ userId: userid }, function (err, blogs) {
    if (err) {
      res.send({ message: 0 });
    } else {
      // Cache for 2 minutes
      redis.set(cacheKey, JSON.stringify(blogs), 'EX', 120);
      res.send({ data: blogs });
    }
  });
};