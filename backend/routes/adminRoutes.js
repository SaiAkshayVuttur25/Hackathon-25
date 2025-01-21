const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authenticateAdmin } = require("../middlewares/authenticateAdmin");

router.get("/pending", authenticateAdmin, blogController.pending);

router.post("/approve", blogController.approve);

router.post("/reject", blogController.reject);

router.post("/delete", authenticateAdmin, blogController.delete);

module.exports = router;
