// import React, { useState, useEffect } from "react";
// import { useToast } from "@chakra-ui/react";
// import Navbar from "../components/Navbar";
// import { Button } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Addblog(props) {
//   const [message, setMessage] = useState(-1);
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [blog, setBlog] = useState("");
//   const [submit, setSubmit] = useState(false);

//   const navigate = useNavigate();
//   const toast = useToast();

//   useEffect(() => {
//     if (!props.isLogin) {
//       navigate("/login");
//     }
//   }, [props.isLogin, navigate]);

//   useEffect(() => {
//     setMessage(-1);
//   }, [message]);

//   function handleChange(e) {
//     switch (e.target.id) {
//       case "name":
//         setName(e.target.value);
//         break;
//       case "title":
//         setTitle(e.target.value);
//         break;
//       case "blog":
//         setBlog(e.target.value);
//         break;
//       default:
//         break;
//     }
//   }

//   function inputClear() {
//     setName("");
//     setTitle("");
//     setBlog("");
//   }

//   function handleSubmit() {
//     if (name === "" || title === "" || blog === "") {
//       setMessage(0);
//       return;
//     } else {
//       setSubmit(true);
//       const newBlog = {
//         name: name,
//         title: title,
//         blog: blog,
//         userId: props.user._id,
//         token: props.token,
//       };
//       axios
//           .post("https://aac-backend-25.onrender.com/blog/postblog", {
//             params: newBlog,
//           })
//           .then((res) => {
//             setMessage(res.data.message);
//             setSubmit(false);
//             if (res.data.message === 1) {
//               inputClear();
//             }
//           });
//     }
//   }

//   return (
//       <div className="blog-bg bg-black text-gray-100 min-h-screen">
//         <Navbar {...props} />
//         <center className="mont">
//           <h1 className="w-3/4 mx-auto rounded-xl p-3 text-center text-2xl mt-5 mb-5 bg-gray-800 shadow-lg">
//             Add Proposal
//           </h1>
//           <form className="w-11/12 md:w-3/4 mx-auto text-start p-6 rounded-xl shadow-xl bg-black">
//           <div className="mb-6">
//               <label htmlFor="title" className="block text-lg mb-2 text-gray-400">
//                 Event
//               </label>
//               <input
//                   type="text"
//                   id="title"
//                   value={title}
//                   onChange={handleChange}
//                   className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="name" className="block text-lg mb-2 text-gray-400">
//                 Author
//               </label>
//               <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={handleChange}
//                   className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//               />
//             </div>
            
//             <div className="mb-6">
//               <label htmlFor="blog" className="block text-lg mb-2 text-gray-400">
//                 Event Description
//               </label>
//               <textarea
//                   id="blog"
//                   rows="8"
//                   value={blog}
//                   onChange={handleChange}
//                   className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//               />
//             </div>
//             <div className="text-center">
//               <Button
//                   isLoading={submit}
//                   onClick={handleSubmit}
//                   className="w-full sm:w-auto py-2 px-6 bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-lg"
//               >
//                 Submit For Approval
//               </Button>
//             </div>
//           </form>
//           {message === 0 &&
//               toast({
//                 title: "Please fill all the fields",
//                 status: "warning",
//                 duration: 3000,
//                 isClosable: true,
//               })}
//           {message === 1 &&
//               toast({
//                 title: "Submitted for approval successfully",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//               })}
//           {message === 2 &&
//               toast({
//                 title: "An error occurred",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//               })}
//         </center>
//       </div>
//   );
// }

// export default Addblog;



// import React, { useState, useEffect } from "react";
// import { useToast } from "@chakra-ui/react";
// import Navbar from "../components/Navbar";
// import { Button } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Addblog(props) {
//   const [message, setMessage] = useState(-1);
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [blog, setBlog] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [eventTime, setEventTime] = useState("");
//   const [location, setLocation] = useState("");
//   const [submit, setSubmit] = useState(false);

//   const navigate = useNavigate();
//   const toast = useToast();

//   useEffect(() => {
//     if (!props.isLogin) {
//       navigate("/login");
//     }
//   }, [props.isLogin, navigate]);

//   useEffect(() => {
//     setMessage(-1);
//   }, [message]);

//   function handleChange(e) {
//     switch (e.target.id) {
//       case "name":
//         setName(e.target.value);
//         break;
//       case "title":
//         setTitle(e.target.value);
//         break;
//       case "blog":
//         setBlog(e.target.value);
//         break;
//       case "eventDate":
//         setEventDate(e.target.value);
//         break;
//       case "eventTime":
//         setEventTime(e.target.value);
//         break;
//       case "location":
//         setLocation(e.target.value);
//         break;
//       default:
//         break;
//     }
//   }

//   function inputClear() {
//     setName("");
//     setTitle("");
//     setBlog("");
//     setEventDate("");
//     setEventTime("");
//     setLocation("");
//   }

//   function handleSubmit() {
//     if (name === "" || title === "" || blog === "" || eventDate === "" || eventTime === "" || location === "") {
//       setMessage(0);
//       return;
//     } else {
//       setSubmit(true);
//       const newBlog = {
//         name: name,
//         title: title,
//         blog: blog,
//         eventDate: eventDate,
//         eventTime: eventTime,
//         location: location,
//         userId: props.user._id,
//         token: props.token,
//       };
//       axios
//         .post("https://aac-backend-25.onrender.com/blog/postblog", {
//           params: newBlog,
//         })
//         .then((res) => {
//           setMessage(res.data.message);
//           setSubmit(false);
//           if (res.data.message === 1) {
//             inputClear();
//           }
//         });
//     }
//   }

//   return (
//     <div className="blog-bg bg-black text-gray-100 min-h-screen">
//       <Navbar {...props} />
//       <center className="mont">
//         <h1 className="w-3/4 mx-auto rounded-xl p-3 text-center text-2xl mt-5 mb-5 bg-gray-800 shadow-lg">
//           Add Proposal
//         </h1>
//         <form className="w-11/12 md:w-3/4 mx-auto text-start p-6 rounded-xl shadow-xl bg-black">
//           <div className="mb-6">
//             <label htmlFor="title" className="block text-lg mb-2 text-gray-400">
//               Event
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={handleChange}
//               className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//             />
//           </div>

          

//           <div className="mb-6">
//             <label htmlFor="eventDate" className="block text-lg mb-2 text-gray-400">
//               Event Date
//             </label>
//             <input
//               type="date"
//               id="eventDate"
//               value={eventDate}
//               onChange={handleChange}
//               className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="eventTime" className="block text-lg mb-2 text-gray-400">
//               Event Time
//             </label>
//             <input
//               type="time"
//               id="eventTime"
//               value={eventTime}
//               onChange={handleChange}
//               className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="location" className="block text-lg mb-2 text-gray-400">
//               Event Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={handleChange}
//               className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="blog" className="block text-lg mb-2 text-gray-400">
//               Event Description
//             </label>
//             <textarea
//               id="blog"
//               rows="8"
//               value={blog}
//               onChange={handleChange}
//               className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
//             />
//           </div>

//           <div className="text-center">
//             <Button
//               isLoading={submit}
//               onClick={handleSubmit}
//               className="w-full sm:w-auto py-2 px-6 bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-lg"
//             >
//               Submit For Approval
//             </Button>
//           </div>
//         </form>

//         {message === 0 &&
//           toast({
//             title: "Please fill all the fields",
//             status: "warning",
//             duration: 3000,
//             isClosable: true,
//           })}
//         {message === 1 &&
//           toast({
//             title: "Submitted for approval successfully",
//             status: "success",
//             duration: 3000,
//             isClosable: true,
//           })}
//         {message === 2 &&
//           toast({
//             title: "An error occurred",
//             status: "error",
//             duration: 3000,
//             isClosable: true,
//           })}
//       </center>
//     </div>
//   );
// }

// export default Addblog;
import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addblog(props) {
  const [message, setMessage] = useState(-1);
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!props.isLogin) {
      navigate("/login");
    }
  }, [props.isLogin, navigate]);

  useEffect(() => {
    if (message === 0) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else if (message === 1) {
      toast({
        title: "Submitted for approval successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (message === 2) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [message, toast]);

  function handleChange(e) {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "blog":
        setBlog(e.target.value);
        break;
      case "eventDate":
        setEventDate(e.target.value);
        break;
      case "eventTime":
        setEventTime(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      default:
        break;
    }
  }

  function inputClear() {
    
    setTitle("");
    setBlog("");
    setEventDate("");
    setEventTime("");
    setLocation("");
  }

  function handleSubmit() {
    if (title === "" || blog === "" || eventDate === "" || eventTime === "" || location === "") {
      setMessage(0);
      return;
    } else {
      setSubmit(true);
      const newBlog = {
        title,
        blog,
        eventDate,
        eventTime,
        location,
        userId: props.user._id,
        token: props.token,
      };
      axios
        .post("http://localhost:5000/blog/postblog", newBlog)
        .then((res) => {
          
          setMessage(res.data.message);
          setSubmit(false);
          if (res.data.message === 1) {
            inputClear();
          }
        })
        .catch((error) => {
          setMessage(2);
          setSubmit(false);
        });
    }
  }

  return (
    <div className="blog-bg bg-black text-gray-100 min-h-screen">
      <Navbar {...props} />
      <center className="mont">
        <h1 className="w-3/4 mx-auto rounded-xl p-3 text-center text-2xl mt-5 mb-5 bg-gray-800 shadow-lg">
          Add Proposal
        </h1>
        <form className="w-11/12 md:w-3/4 mx-auto text-start p-6 rounded-xl shadow-xl bg-black">
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg mb-2 text-gray-400">
              Event
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleChange}
              className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="eventDate" className="block text-lg mb-2 text-gray-400">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={handleChange}
              className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="eventTime" className="block text-lg mb-2 text-gray-400">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              value={eventTime}
              onChange={handleChange}
              className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-lg mb-2 text-gray-400">
              Event Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleChange}
              className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="blog" className="block text-lg mb-2 text-gray-400">
              Event Description
            </label>
            <textarea
              id="blog"
              rows="8"
              value={blog}
              onChange={handleChange}
              className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
            />
          </div>

          <div className="text-center">
            <Button
              isLoading={submit}
              onClick={handleSubmit}
              className="w-full sm:w-auto py-2 px-6 bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-lg"
            >
              Submit For Approval
            </Button>
          </div>
        </form>
      </center>
    </div>
  );
}

export default Addblog;
