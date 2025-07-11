
// const mongoose = require("mongoose");
// const { Schema } = mongoose;


// const eventSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   start: { type: Date, required: true },
//   end:   { type: Date, required: true },
  
//   expireAt: { type: Date }, // For TTL
// });

//  TTL index on `expireAt` (not on `end` directly)
// eventSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// const Event = mongoose.model("Event", eventSchema);
// module.exports = { Event };


const mongoose = require("mongoose");

const eventInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },

  // liked: { type: Boolean, default: false },
  reminded: { type: Boolean, default: false },
  liked: {
    type: String,
    enum: ['yes', 'no', 'not_sure', null],
    default: null
  },

  expireAt: {
    type: Date,
    required: true
  }
});

eventInteractionSchema.index({ userId: 1, eventId: 1 }, { unique: true });
eventInteractionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Event", eventInteractionSchema);
