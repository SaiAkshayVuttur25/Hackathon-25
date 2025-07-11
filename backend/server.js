const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resRoutes = require("./routes/resourceRoutes");
const eventRoutes = require("./routes/eventRoutes");
const { authenticateLogin } = require("./middlewares/authenticateLogin.js");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  // console.log("Connected to MongoDB");
});

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "saiakshayvuttur25@gmail.com",
    pass: process.env.EMAILPASS,
  },
});
const PORT = process.env.PORT || 5000;

if (process.env.NODE_STATUS === "development") {
  app.use(
    cors({
      origin: ["http://localhost:5000", "http://localhost:3000"], //
      credentials: true, //
    })
  );
} else {
  app.use(
    cors({
      origin: ["https://your-production-domain.com"], // ✅ Use production URL
      credentials: true,
    })
  );
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", adminRoutes);
app.use("/resource", resRoutes);
app.use("/event", eventRoutes);

app.post("/contact", authenticateLogin, (req, res) => {
  let mailOptions = {
    from: req.query.email,
    to: "saiakshayvuttur25@gmail.com",
    subject: "From VNIT College Events Website",
    text: req.query.name + " " + req.query.email + " " + req.query.text,
  };

  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      // console.log("Error " + err);
      res.send({ message: 0 });
    } else {
      // console.log("Email sent successfully");
      res.send({ message: 1 });
    }
  });
});

app.listen(PORT, (req, res) => {
   console.log(`Server initialised on PORT ${PORT}`);
});
