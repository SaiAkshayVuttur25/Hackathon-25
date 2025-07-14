const mongoose = require("mongoose");

blogSchema = mongoose.Schema({
  isApproved: Boolean,
  title: String,
  blog: String,
  eventDate: String,
  eventTime: String,
  eventEndDate: { type: String, required: true },
  eventEndTime: { type: String, required: true },
  expireAt: { type: Date ,expires: 0 }, // ← used for TTL
  location: String,
  userId: String,
  token: String,
  message: String,
  participants: { type: Number, default: 0 },
  nonParticipants: { type: Number, default: 0 },

});
blogSchema.index({isApproved:1});

// blogSchema.index({_id:1});
// blogSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Blog = mongoose.model("blog", blogSchema);
module.exports = { Blog };
