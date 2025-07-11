
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");

const { authenticateLogin } = require("../middlewares/authenticateLogin");
const { reminder } = require("../mail.js");

router.get('/get-events', eventController.getEvents);

router.post("/events/:id/like", authenticateLogin, eventController.likeEvent);
router.post("/events/:id/remind-me", authenticateLogin, eventController.remindEvent, reminder);

router.get("/events/:id/getStats", authenticateLogin, eventController.getEventStats);
router.get("/events/:id/getEventInteraction", authenticateLogin, eventController.getEventInteraction);

router.delete("/events/:id/deleteInteraction", authenticateLogin, eventController.removeEventInteraction);

module.exports = router;