
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "../components/Navbar";

// Initialize moment localizer
const localizer = momentLocalizer(moment);

const Resources = (props) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => {
      setEvents(
        res.data.events.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      );
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    if (
      !newEvent.title ||
      isNaN(startDate) ||
      isNaN(endDate) ||
      startDate >= endDate
    ) {
      alert("Please provide a valid title, start date, and end date.");
      return;
    }

    const event = {
      title: newEvent.title,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    axios.post("http://localhost:5000/events", event).then((res) => {
      setEvents([
        ...events,
        {
          ...res.data.event,
          start: new Date(res.data.event.start),
          end: new Date(res.data.event.end),
        },
      ]);
      setNewEvent({ title: "", start: "", end: "" });
    });
  };

  const user = { isAdmin: true };

  return (
    <div>
      <Navbar user={user} />
      <div className="mt-5 mx-5 mb-5 p-6 bg-gray-800 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Add New Event</h3>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="start"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Starting Day
          </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="end"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Ending Day
          </label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddEvent}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Event
        </button>
      </div>
      {/* Calendar Component */}
      <div className="flex justify-center mb-6">
        <div
          style={{
            width: "85%", // Adjust the width to control the calendar size
            maxWidth: "700px", // Limit the maximum width for smaller screens
          }}
          className="border border-gray-600 rounded-lg p-4 bg-gray-900 shadow-lg"
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 500,
              borderRadius: "5px",
              backgroundColor: "white",
              color: "black",
            }}
            className="shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Resources;
