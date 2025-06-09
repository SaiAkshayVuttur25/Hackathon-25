const {Event} = require("../models/eventModel.js");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, events });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching events", error: err });
  }
};

exports.postEvents = async (req, res) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newEvent = new Event({ title, start, end });
    await newEvent.save();
    res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error adding event", error: err });
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { title, start, end } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, start, end },
      { new: true }
    );

    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event: updatedEvent });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error updating event", error: err });
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event deleted", event: deletedEvent });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting event", error: err });
  }
};
