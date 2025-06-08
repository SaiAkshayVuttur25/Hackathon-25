const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resRoutes = require("./routes/resourceRoutes");
const bodyParser = require("body-parser");


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to MongoDB");
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
      origin: ["http://localhost:5000","http://localhost:3000"], //
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

app.post("/contact", (req, res) => {
  let mailOptions = {
    from: req.query.email,
    to: "saiakshayvuttur25@gmail.com",
    subject: "From VNIT College Events Website",
    text: req.query.name + " " + req.query.email + " " + req.query.text,
  };

  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      res.send({ message: 0 });
    } else {
      console.log("Email sent successfully");
      res.send({ message: 1 });
    }
  });
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

app.get('/events', async (req, res) => {
  try {
      const events = await Event.find();
      res.status(200).json({ success: true, events });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching events', error: err });
  }
});
app.post('/events', async (req, res) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
      const newEvent = new Event({ title, start, end });
      await newEvent.save();
      res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Error adding event', error: err });
  }
});

// Update an event
app.patch('/events/:id', async (req, res) => {
  const eventId = req.params.id;
  const { title, start, end } = req.body;

  try {
      const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { title, start, end },
          { new: true }
      );

      if (!updatedEvent) {
          return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.status(200).json({ success: true, event: updatedEvent });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Error updating event', error: err });
  }
});

// Delete an event
app.delete('/events/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
          return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.status(200).json({ success: true, message: 'Event deleted', event: deletedEvent });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Error deleting event', error: err });
  }
});


app.listen(PORT, (req, res) => {
  console.log(`Server initialised on PORT ${PORT}`);
});
