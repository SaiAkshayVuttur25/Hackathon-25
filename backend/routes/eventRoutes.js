
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");

const { authenticateLogin } = require("../middlewares/authenticateLogin");
const { reminder } = require("../mail.js");


router.get('/get-events', eventController.getEvents);

router.post('/post-event',eventController.postEvents  );

router.patch('/events/:id', eventController.updateEvent );

router.delete('/events/:id',eventController.deleteEvent);

router.post("/events/:id/remind-me",authenticateLogin, reminder);

module.exports = router;