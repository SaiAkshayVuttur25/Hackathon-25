
// const nodemailer = require("nodemailer");
// const express = require("express");
// const router = express.Router();
// const dotenv = require("dotenv");
// const cron = require('node-cron');

// dotenv.config();

// const User = require("./models/userModel.js");
// const {Blog} = require("./models/blogModel.js");

// // Transport setup
// let transport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "saiakshayvuttur25@gmail.com",
//     pass: process.env.EMAILPASS, // Make sure EMAILPASS is set in your .env
//   },
//   tls: {
//     rejectUnauthorized: false, // optional, useful for testing
//   },
// });

// // Reminder handler
// const reminder = async (req, res) => {
//   try {
//     // console.log("Reminder function called");
//     const eventId = req.params.id;
//     if (!eventId) {
//         // console.log("eventId is missing");
//       return res.status(400).json({ message: "Event ID is required" });
//     }

//     const event = await Blog.findById(eventId);
//     if (!event) {
//         // console.log("event is missing");
//       return res.status(404).json({ message: "Event not found" });
//     }
//     // console.log("User ID in reminder:", res.locals.user._id);
//     const userId = res.locals.user._id;
//     const user = await User.findById(userId);
//     if (!user) {
//         // console.log("user not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     // console.log("User found for reminder:", user.username);

//     const mailOptions = {
//       from: "saiakshayvuttur25@gmail.com",
//       to: user.username,
//       subject: `Reminder for Event: ${event.title}`,
//       text: `Dear ${user.name},
//         This is a reminder for the event "${event.title}" scheduled on ${new Date(event.eventDate).toLocaleString()}.
//         Event Details:
//         Title: ${event.title}
//         Date: ${new Date(event.eventDate).toLocaleString()}
//         End: ${new Date(event.eventEndDate).toLocaleString()}
//         At: ${event.location}

//         Thank you!`,
//     };

//     transport.sendMail(mailOptions, function (err, info) {
//       if (err) {
//         // console.error("Error sending email:", err);
//         return res.status(500).json({ message: "Failed to send email" });
//       } else {
//         // console.log("Email sent successfully:", info.response);
//         return res.status(200).json({ message: "Email sent successfully" });
//       }
//     });
//   } catch (err) {
//     // console.error("Error in reminder function:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { reminder };

// * =========== ABOVE CODE IS JUST AFTER CLICKING REMIND BUT BELOW CODE IS FOR SCHEDULING THE REMINDER EMAIL 24 HOURS BEFORE THE EVENT ===========


const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const User = require("./models/userModel.js");
const { Blog } = require("./models/blogModel.js");

// Transport setup
let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "saiakshayvuttur25@gmail.com",
    pass: process.env.EMAILPASS, // Make sure EMAILPASS is set in your .env
  },
  tls: {
    rejectUnauthorized: false, // optional, useful for testing
  },
});

const reminder = async (req, res) => {
  // console.log("🔔 Reminder function triggered");

  try {
    const eventId = req.params.id;
    if (!eventId) {
      // console.log("❌ eventId is missing in params");
      return res.status(400).json({ message: "Event ID is required" });
    }

    const event = await Blog.findById(eventId);
    if (!event) {
      // console.log("❌ Event not found in DB for ID:", eventId);
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = res.locals.user?._id;
    // console.log("👤 User ID from res.locals:", userId);

    const user = await User.findById(userId);
    if (!user) {
      // console.log("❌ User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(`✅ Sending reminder to ${user.username} for event "${event.title}"`);

    const mailOptions = {
      from: "saiakshayvuttur25@gmail.com",
      to: user.username,
      subject: `Reminder for Event: ${event.title}`,
      text: `Dear ${user.name},
This is a reminder for the event "${event.title}" scheduled on ${new Date(event.eventDate).toLocaleString()}.

Event Details:
Title: ${event.title}
Start: ${new Date(event.eventDate).toLocaleString()}
End: ${new Date(event.eventEndDate).toLocaleString()}
At: ${event.location}

Thank you!`,
    };

    const eventDate = new Date(event.eventDate);
    const reminderTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
    const now = new Date();
    const delay = reminderTime.getTime() - now.getTime();

    // console.log("📅 Event date:", eventDate.toString());
    // console.log("⏰ Reminder will be sent at:", reminderTime.toString());
    // console.log("🕒 Current time:", now.toString());
    // console.log("🧮 Delay in ms:", delay);

    if (isNaN(reminderTime.getTime())) {
      // console.log("❌ Invalid eventDate or reminderTime");
      return res.status(400).json({ message: "Invalid event date format" });
    }

    if (delay <= 0) {
      // console.log("⏩ Event is within 24 hours, sending email immediately");

      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          // console.error("❌ Error sending email immediately:", err);
          return res.status(500).json({ message: "Failed to send email" });
        } else {
          // console.log("✅ Immediate email sent:", info.response);
          return res.status(200).json({ message: "Email sent successfully" });
        }
      });
    } else {
      // console.log("🕓 Scheduling email after delay:", delay, "ms");

      setTimeout(() => {
        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            // console.error("❌ Error sending scheduled email:", err);
          } else {
            // console.log("✅ Scheduled email sent:", info.response);
          }
        });
      }, delay);

      return res.status(200).json({ message: "Reminder scheduled successfully" });
    }
  } catch (err) {
    // console.error("❌ Error in reminder function:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { reminder };
