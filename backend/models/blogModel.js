// const mongoose = require("mongoose");
// let blogSchema = mongoose.Schema({
//   isApproved: Boolean,
//   name: String,
//   title: String,
//   blog: String,
//   date: String,
//   time: String,
//   userId: String,
//   message: String,
// });
// const Blog = mongoose.model("blog", blogSchema);

// module.exports = { Blog };


const mongoose = require("mongoose");

let blogSchema = mongoose.Schema({
  isApproved: Boolean,
  title: String,
  blog: String,
  eventDate: String, 
  eventTime: String,
  eventEndDate: String, 
  eventEndTime: String,
  location: String,  
  userId: String,    
  token: String,     
  message: String,
  participants:Number,
  Notparticipants:Number,

});

const Blog = mongoose.model("blog", blogSchema);

module.exports = { Blog };
