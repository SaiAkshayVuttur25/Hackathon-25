// const mongoose = require("mongoose");
// const { User } = require("../models/userModel");
// const { Blog } = require("../models/blogModel");

// exports.getBlogs = (req, res) => {
//   Blog.find({ isApproved: true }, function (err, exp) {
//     if (err) {
//       console.log(err);
//       res.send({ message: 0 });
//     } else {
//       res.send({ message: 1, data: exp });
//     }
//   });
// };

// exports.getData = (req, res) => {
//   let id = req.query.id;
//   Blog.find(
//     {
//       _id: id,
//     },
//     function (err, exp) {
//       if (err) {
//         console.log(err);
//         res.send({ message: 0 });
//       } else {
//         res.send(exp);
//       }
//     }
//   );
// };

// exports.getBlogData = (req, res) => {
//   let id = req.query.id;
//   Blog.find({ _id: id }, function (err, blog) {
//     if (err) {
//       console.log(err);
//       res.send({ data: [] });
//     } else {
//       res.send({ data: blog });
//     }
//   });
// };

// exports.updateBlog = (req, res) => {
//   Blog.updateOne(
//     {
//       _id: req.body.blogid,
//       isApproved: false,
//     },
//     {
//       name: req.body.name,
//       title: req.body.title,
//       blog: req.body.blog,
//     },
//     function (err, data) {
//       if (err) {
//         console.log(err);
//         res.send({ message: 2 });
//       } else {
//         if (data.matchedCount == 1) {
//           res.send({ message: 1 });
//         } else {
//           res.send({ message: 2 });
//         }
//       }
//     }
//   );
// };

// exports.pending = (req, res) => {
//   Blog.find(
//     {
//       isApproved: false,
//     },
//     function (err, data) {
//       if (err) {
//         console.log(err);
//         res.send({ message: 0 });
//       } else {
//         res.send({ message: 1, data: data });
//       }
//     }
//   );
// };

// exports.postblog = (req, res) => {
//   data = req.body;
//   let date = new Date();
//   let month = date.getMonth() + 1;
//   switch (month) {
//     case 1:
//       month = "January";
//       break;
//     case 2:
//       month = "February";
//       break;
//     case 3:
//       month = "March";
//       break;
//     case 4:
//       month = "April";
//       break;
//     case 5:
//       month = "May";
//       break;
//     case 6:
//       month = "June";
//       break;
//     case 7:
//       month = "July";
//       break;
//     case 8:
//       month = "August";
//       break;
//     case 9:
//       month = "September";
//       break;
//     case 10:
//       month = "October";
//       break;
//     case 11:
//       month = "November";
//       break;
//     case 12:
//       month = "December";
//       break;
//   }
//   let dateNow =
//     date.getDate().toString() +
//     " " +
//     month +
//     " " +
//     date.getFullYear().toString();
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   let timeNow = hours + ":" + minutes + " " + ampm;
//   let newBlog = new Blog({
//     isApproved: false,
//     name: data.name,
//     title: data.title,
//     blog: data.blog,
//     date: dateNow,
//     time: timeNow,
//     userId: data.userId,
//     message: undefined,
//   });
//   newBlog
//     .save()
//     .then(() => {
//       res.send({
//         message: 1,
//       });
//     })
//     .catch((err) => {
//       if (err) {
//         res.send({
//           message: 2,
//         });
//       }
//     });
// };

// exports.approve = (req, res) => {
//   Blog.updateOne(
//     {
//       _id: req.body.id,
//     },
//     {
//       isApproved: true,
//       message: req.body.message,
//     },
//     function (err) {
//       Blog.find(
//         {
//           isApproved: false,
//         },
//         function (err, data) {
//           if (err) {
//             console.log(err);
//             res.send({ message: 0 });
//           } else {
//             res.send({ message: 1, data: data });
//           }
//         }
//       );
//     }
//   );
// };

// exports.reject = (req, res) => {
//   Blog.updateOne(
//     {
//       _id: req.body.id,
//     },
//     {
//         message:req.body.message
//     },
//     function (err,data) {
//         if(err){
//             console.log(err);
//             res.send({message:0});
//         }
//       Blog.find(
//         {
//           isApproved: false,
//         },
//         function (err, data) {
//           if (err) {
//             console.log(err);
//             res.send({ message: 0 });
//           } else {
//             res.send({ message: 2, data: data });
//           }
//         }
//       );
//     }
//   );
// };

// exports.delete=(req,res)=>{
//     Blog.deleteOne(
//         {
//           _id: req.body.id,
//         },
//         function (err,data) {
//             if(err){
//                 console.log(err);
//                 res.send({message:0});
//             }
//           Blog.find(
//             {
//               isApproved: false,
//             },
//             function (err, data) {
//               if (err) {
//                 console.log(err);
//                 res.send({ message: 0 });
//               } else {
//                 res.send({ message: 3, data: data });
//               }
//             }
//           );
//         }
//       );
// }

const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const { Blog } = require("../models/blogModel");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: true });
    res.send({ message: 1, data: blogs });
  } catch (err) {
    console.error(err);
    res.send({ message: 0 });
  }
};

exports.getData = async (req, res) => {
  const { id } = req.query;
  try {
    const blog = await Blog.findById(id);
    res.send(blog || { message: 0 });
  } catch (err) {
    console.error(err);
    res.send({ message: 0 });
  }
};

exports.getBlogData = async (req, res) => {
  const { id } = req.query;
  try {
    const blog = await Blog.findById(id);
    res.send({ data: blog ? [blog] : [] });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.send({ message: 2 });
  }
};

exports.pending = async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ isApproved: false });
    res.send({ message: 1, data: pendingBlogs });
  } catch (err) {
    console.error(err);
    res.send({ message: 0 });
  }
};
exports.postblog = async (req, res) => {
  const { title, blog, userId } = req.body;

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
    userId,
    message: undefined,
  });

  console.log("newBlog", newBlog); // Log the new blog object for debugging

  try {
    await newBlog.save();
    console.log("Blog saved successfully"); // Log success message
    return res.send({ message: 1 }); // Send success response
  } catch (err) {
    console.error("Error saving blog:", err); // Log the error
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
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.send({ message: 0 });
  }
};

