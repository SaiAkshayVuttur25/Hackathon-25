
import React, { useState, useEffect, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EventContext } from "./EventsComponent";

function Addblog(props) {
  const { setEvents } = useContext(EventContext); // Get setEvents from context
  const [message, setMessage] = useState(-1);
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
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
      case "eventEndDate":
        setEventEndDate(e.target.value);
        break;
      case "eventEndTime":
        setEventEndTime(e.target.value);
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
    setEventEndDate("");
    setEventEndTime("");
    setLocation("");
  }

  // function fetchAndUpdateCalendar() {
  //   axios.get("http://localhost:5000/events",{
  //         headers: {
  //           Authorization: `Bearer ${props.token}`,
  //         },
  //       }).then((res) => {
  //     setEvents(
  //       res.data.events.map((event) => ({
  //         ...event,
  //         start: new Date(event.start),
  //         end: new Date(event.end),
  //       }))
  //     );
  //   }).catch((err) => {
  //     console.error("Failed to fetch calendar events:", err);
  //   });
  // }

  function handleSubmit() {
    if (
      title === "" ||
      blog === "" ||
      eventDate === "" ||
      eventTime === "" ||
      eventEndDate === "" ||
      eventEndTime === "" ||
      location === ""
    ) {
      setMessage(0);
      return;
    } else {
      setSubmit(true);
      const newBlog = {
        title,
        blog,
        eventDate,
        eventTime,
        eventEndDate,
        eventEndTime,
        location,
        userId: props.user._id,
        token: props.token,
      };
      axios
        .post("http://localhost:5000/blog/postblog", 
          newBlog,{
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        })
        .then((res) => {
          setMessage(res.data.message);
          setSubmit(false);
          if (res.data.message === 1) {
            inputClear();
            // fetchAndUpdateCalendar(); // After adding a blog, update the calendar
          }
        })
        .catch((error) => {
          setMessage(2);
          setSubmit(false);
        });
    }
  }

  return (
    <div className="blog-bg bg-[#e9ecef] text-gray-100 min-h-screen">
      <Navbar {...props} />
      <center className="mont">
        <h1 className="w-3/4 p-3 mx-auto mt-5 mb-5 text-2xl text-center bg-gray-800 shadow-lg rounded-xl">
          Add Proposal
        </h1>
        <form className="w-11/12 p-6 mx-auto my-3 bg-gray-800 shadow-xl md:w-3/4 text-start rounded-xl">
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-lg text-gray-400">
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
  
          {/* Row for Event Date and Time */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="eventDate" className="block mb-2 text-lg text-gray-400">
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
            <div className="flex-1">
              <label htmlFor="eventTime" className="block mb-2 text-lg text-gray-400">
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
          </div>
  
          {/* Row for Event End Date and Time */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="eventEndDate" className="block mb-2 text-lg text-gray-400">
                Event End Date
              </label>
              <input
                type="date"
                id="eventEndDate"
                value={eventEndDate}
                onChange={handleChange}
                className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="eventEndTime" className="block mb-2 text-lg text-gray-400">
                Event End Time
              </label>
              <input
                type="time"
                id="eventEndTime"
                value={eventEndTime}
                onChange={handleChange}
                className="w-full py-2.5 px-3 text-gray-100 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-white focus:ring focus:ring-white"
              />
            </div>
          </div>
  
          <div className="mb-6">
            <label htmlFor="location" className="block mb-2 text-lg text-gray-400">
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
            <label htmlFor="blog" className="block mb-2 text-lg text-gray-400">
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
              className="w-full px-6 py-2 text-white bg-blue-700 shadow-lg sm:w-auto hover:bg-blue-800 rounded-xl"
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
