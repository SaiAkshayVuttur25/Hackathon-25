const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const { Blog } = require("../models/blogModel");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: true });
    res.send({ message: 1, data: blogs });
  } catch (err) {
    res.send({ message: 0 });
  }
};

exports.getData = async (req, res) => {
  const { id } = req.query;
  try {
    const blog = await Blog.findById(id);
    res.send(blog || { message: 0 });
  } catch (err) {
    res.send({ message: 0 });
  }
};

exports.getBlogData = async (req, res) => {
  const { id } = req.query;
  try {
    const blog = await Blog.findById(id);
    res.send({ data: blog ? [blog] : [] });
  } catch (err) {
    res.send({ data: [] });
  }
};

exports.updateBlog = async (req, res) => {
  const { blogid, title, blog } = req.body;
  try {
    const updateResult = await Blog.updateOne(
      { _id: blogid, isApproved: false },
      { title, blog }
    );
    res.send({ message: updateResult.matchedCount === 1 ? 1 : 2 });
  } catch (err) {
    res.send({ message: 2 });
  }
};

exports.pending = async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ isApproved: false });
 
    res.send({ message: 1, data: pendingBlogs });
  } catch (err) {
    res.send({ message: 0 });
  }
};
exports.postblog = async (req, res) => {
  const { title, blog, userId,eventDate,eventTime,location } = req.body;

  // Check if required fields are provided
  if (!title || !blog || !userId) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const now = new Date();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const newBlog = new Blog({
    isApproved: false,
    title,
    blog,
    date: dateFormatter.format(now),
    time: timeFormatter.format(now),
    eventDate,
    eventTime ,
    location,
    userId,
    message: undefined,
    participants:0,
    Notparticipants:0,
  });


  try {
    await newBlog.save();
    return res.send({ message: 1 }); // Send success response
  } catch (err) {
    return res.status(500).send({ message: 2 }); // Send error response
  }
};

exports.approve = async (req, res) => {
  const { id, message } = req.body;
  try {
    await Blog.updateOne({ _id: id }, { isApproved: true, message });
    const pendingBlogs = await Blog.find({ isApproved: false });
    res.send({ message: 1, data: pendingBlogs });
  } catch (err) {
    res.send({ message: 0 });
  }
};

exports.reject = async (req, res) => {
  const { id, message } = req.body;
  try {
    await Blog.updateOne({ _id: id }, { message });
    const pendingBlogs = await Blog.find({ isApproved: false });
    res.send({ message: 2, data: pendingBlogs });
  } catch (err) {
    res.send({ message: 0 });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body;
  try {
    await Blog.deleteOne({ _id: id });
    const pendingBlogs = await Blog.find({ isApproved: false });
    res.send({ message: 3, data: pendingBlogs });
  } catch (err) {
    res.send({ message: 0 });
  }
};

exports.updateVote = async (req, res) => {
  const { eventId } = req.params;
  const { vote } = req.body; 

  try {
    const event = await Blog.findById(eventId); // Find the event by ID

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update the vote count
    if (vote === 'yes') {
      event.participants += 1;
    } else if (vote === 'no') {
      event.Notparticipants += 1;
    }

    await event.save(); // Save the updated event
    res.json(event); // Return the updated event data back to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
