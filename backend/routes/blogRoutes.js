const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

const { authenticateLogin } = require("../middlewares/authenticateLogin");

router.get("/blogs", blogController.getBlogs);

router.get("/getData", blogController.getData);

router.get("/getBlogData",authenticateLogin,blogController.getBlogData);

router.post("/postblog", authenticateLogin, blogController.postblog);

router.post("/updateBlog",authenticateLogin,blogController.updateBlog);

router.patch('/events/:eventId/vote',authenticateLogin,blogController.updateVote);

module.exports = router;
