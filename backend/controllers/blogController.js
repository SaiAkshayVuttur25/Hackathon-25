
const { Blog } = require("../models/blogModel");
const redis = require('../redis/redisClient.js');

// Get all approved blogs (cache for 60 seconds)
exports.getBlogsWithRedis = async (req, res) => {
  const cacheKey = 'approvedBlogs';
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.send({ message: 1, data: JSON.parse(cached) });
  }
  try {
    const blogs = await Blog.find({ isApproved: true });
    await redis.set(cacheKey, JSON.stringify(blogs), 'EX', 60);
    res.send({ message: 1, data: blogs });
  } catch (err) {
    res.send({ message: 0 });
  }
};

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

exports.postblog = async (req, res) => {
  const {
    title,
    blog,
    userId,
    eventDate,
    eventTime,
    eventEndDate,
    eventEndTime,
    location
  } = req.body;

  if (!title || !blog || !userId) {
    return res.status(400).send({ message: "All fields are required." });
  }

  // console.log(title,blog,userId,eventDate,eventTime,eventEndDate,eventEndTime,location);
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

  const expireAt = new Date(`${eventEndDate}T${eventEndTime}:00+05:30`);

  const newBlog = new Blog({
    isApproved: false,
    title,
    blog,
    date: dateFormatter.format(now),
    time: timeFormatter.format(now),
    eventDate,
    eventTime,
    eventEndDate,
    eventEndTime,
    location,
    userId,
    message: "Keep in touch with us for updates",
    participants: 0,
    Notparticipants: 0,
    expireAt
  });

  try {
    await newBlog.save();
    return res.send({ message: 1 });
  } catch (err) {
    return res.status(500).send({ message: 2 });
  }
};

exports.postblogWithRedis = async (req, res) => {
  const {
    title,
    blog,
    userId,
    eventDate,
    eventTime,
    eventEndDate,
    eventEndTime,
    location
  } = req.body;

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

  const expireAt = new Date(`${eventEndDate}T${eventEndTime}:00+05:30`);

  const newBlog = new Blog({
    isApproved: false,
    title,
    blog,
    date: dateFormatter.format(now),
    time: timeFormatter.format(now),
    eventDate,
    eventTime,
    eventEndDate,
    eventEndTime,
    location,
    userId,
    message: "Keep in touch with us for updates",
    participants: 0,
    Notparticipants: 0,
    expireAt
  });

  try {
    await newBlog.save();

    // Invalidate or update Redis cache
    const updatedEvents = await Blog.find({});
    await redis.set("allEvents", JSON.stringify(updatedEvents));
    console.log("Redis cache updated after posting new blog");

    return res.send({ message: 1 });
  } catch (err) {
    return res.status(500).send({ message: 2 });
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
    // await Blog.updateOne({ _id: id }, { message });
    await Blog.deleteOne({ _id: id });
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

    //   const { title, blog, userId,eventDate,eventTime,eventEndDate,eventEndTime,location } = req.body;
    
    //   // Check if required fields are provided
    //   if (!title || !blog || !userId) {
    //     return res.status(400).send({ message: "All fields are required." });
    //   }
    
    //   const now = new Date();
    //   const dateFormatter = new Intl.DateTimeFormat("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "2-digit",
    //   });
    //   const timeFormatter = new Intl.DateTimeFormat("en-US", {
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: true,
    //   });
    
    //   const newBlog = new Blog({
    //     isApproved: false,
    //     title,
    //     blog,
    //     date: dateFormatter.format(now),
    //     time: timeFormatter.format(now),
    //     eventDate,
    //     eventTime ,
    //     eventEndDate,
    //     eventEndTime ,
    //     location,
    //     userId,
    //     message: undefined,
    //     participants:0,
    //     Notparticipants:0,
    //   });
    
    
    //   try {
    //     await newBlog.save();
    //     return res.send({ message: 1 }); 
    //   } catch (err) {
    //     return res.status(500).send({ message: 2 });
    //   }
    // };