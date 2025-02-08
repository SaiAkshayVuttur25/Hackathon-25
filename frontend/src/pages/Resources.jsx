
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import Navbar from "../components/Navbar";

// // Initialize moment localizer
// const localizer = momentLocalizer(moment);

// const Resources = (props) => {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

//   useEffect(() => {
//     axios.get("http://localhost:5000/events").then((res) => {
//       setEvents(
//         res.data.events.map((event) => ({
//           ...event,
//           start: new Date(event.start),
//           end: new Date(event.end),
//         }))
//       );
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEvent = () => {
//     const startDate = new Date(newEvent.start);
//     const endDate = new Date(newEvent.end);

//     if (
//       !newEvent.title ||
//       isNaN(startDate) ||
//       isNaN(endDate) ||
//       startDate >= endDate
//     ) {
//       alert("Please provide a valid title, start date, and end date.");
//       return;
//     }

//     const event = {
//       title: newEvent.title,
//       start: startDate.toISOString(),
//       end: endDate.toISOString(),
//     };

//     axios.post("http://localhost:5000/events", event).then((res) => {
//       setEvents([
//         ...events,
//         {
//           ...res.data.event,
//           start: new Date(res.data.event.start),
//           end: new Date(res.data.event.end),
//         },
//       ]);
//       setNewEvent({ title: "", start: "", end: "" });
//     });
//   };

//   const user = { isAdmin: true };

//   return (
//     <div>
//       <Navbar user={user} {...props}/>
//       <div className="mt-5 mx-5 mb-5 p-6 bg-gray-800 rounded-xl shadow-lg">
//         <h3 className="text-xl font-semibold text-white mb-4">Add New Event</h3>
//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className="block text-gray-300 text-sm font-medium mb-2"
//           >
//             Event Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             placeholder="Enter Event Title"
//             value={newEvent.title}
//             onChange={handleInputChange}
//             className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="start"
//             className="block text-gray-300 text-sm font-medium mb-2"
//           >
//             Starting Day
//           </label>
//           <input
//             type="datetime-local"
//             id="start"
//             name="start"
//             value={newEvent.start}
//             onChange={handleInputChange}
//             className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="end"
//             className="block text-gray-300 text-sm font-medium mb-2"
//           >
//             Ending Day
//           </label>
//           <input
//             type="datetime-local"
//             id="end"
//             name="end"
//             value={newEvent.end}
//             onChange={handleInputChange}
//             className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           onClick={handleAddEvent}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Add Event
//         </button>
//       </div>
//       {/* Calendar Component */}
//       <div className="flex justify-center mb-6">
//         <div
//           style={{
//             width: "85%", // Adjust the width to control the calendar size
//             maxWidth: "700px", // Limit the maximum width for smaller screens
//           }}
//           className="border border-gray-600 rounded-lg p-4 bg-gray-900 shadow-lg"
//         >
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{
//               height: 500,
//               borderRadius: "5px",
//               backgroundColor: "white",
//               color: "black",
//             }}
//             className="shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Resources;
/*
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

  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:5000/events/${eventId}`)
      .then((res) => {
        setEvents(events.filter((event) => event._id !== eventId));
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
        alert("Failed to delete the event. Please try again.");
      });
  };

  const user = { isAdmin: true };

  return (
    <div>
      <Navbar user={user} {...props} />
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


      <div className="flex justify-center mb-6">
        <div
          style={{
            width: "85%",
            maxWidth: "700px",
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


      <div className="mt-6 mx-5 bg-gray-800 rounded-xl shadow-lg p-6 mb-5">
        <h3 className="text-xl font-semibold text-white mb-4">Event List</h3>
        <ul>
          {events.map((event) => (
            <li
              key={event._id}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-lg mb-2"
            >
              <span className="text-white">{event.title}</span>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resources;
*/

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "../components/Navbar";
import { EventContext } from "./EventsComponent";

// Initialize moment localizer
const localizer = momentLocalizer(moment);

const Resources = (props) => {
  const { events, setEvents } = useContext(EventContext); // Consume the context
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
  }, [setEvents]);

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

  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:5000/events/${eventId}`)
      .then((res) => {
        setEvents(events.filter((event) => event._id !== eventId));
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
        alert("Failed to delete the event. Please try again.");
      });
  };

  const user = { isAdmin: true };
/*
  return (
    <div>
      <Navbar user={user} {...props} />
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

      <div className="flex justify-center mb-6">
        <div
          style={{
            width: "85%",
            maxWidth: "700px",
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

      <div className="mt-6 mx-5 bg-gray-800 rounded-xl shadow-lg p-6 mb-5">
        <h3 className="text-xl font-semibold text-white mb-4">Event List</h3>
        <ul>
          {events.map((event) => (
            <li
              key={event._id}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-lg mb-2"
            >
              <span className="text-white">{event.title}</span>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  */
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar user={{ isAdmin: true }} {...props} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Schedule Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team meeting"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start
                    </label>
                    <input
                      type="datetime-local"
                      name="start"
                      value={newEvent.start}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End
                    </label>
                    <input
                      type="datetime-local"
                      name="end"
                      value={newEvent.end}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleAddEvent}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Add to Calendar
                </button>
              </div>
            </div>

            {/* Event List */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Scheduled Events</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-colors"
                  >
                    <span className="text-gray-200 truncate">{event.title}</span>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white opacity-75 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="lg:w-2/3">
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
                className="custom-calendar"
                theme={{
                  calendar: {
                    backgroundColor: 'transparent',
                  },
                  event: {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                  },
                  today: {
                    backgroundColor: '#1f2937',
                  },
                }}
              />
            </div>
          </div> */}
          <div className="lg:w-2/3">
  <div className="bg-[#1F2937] rounded-xl p-6 shadow-lg border border-gray-200">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 }}
      className="custom-calendar"
      theme={{
        calendar: {
          backgroundColor: 'transparent',
        },
        event: {
          backgroundColor: '#1F2937',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
        },
        today: {
          backgroundColor: '#1f2937',
        },
      }}
    />
  </div>
</div>
        </div>
      </div>

      {/* <style>{`
        .custom-calendar {
          background-color: #1f2937;
          color: white;
          border-radius: 0.75rem;
          padding: 1rem;
        }
        
        .custom-calendar .rbc-header {
          color: #60a5fa;
          padding: 1rem 0;
          border-bottom: 2px solid #374151;
        }
        
        .custom-calendar .rbc-day-bg + .rbc-day-bg,
        .custom-calendar .rbc-month-row + .rbc-month-row {
          border-color: #374151;
        }
        
        .custom-calendar .rbc-today {
          background-color: #111827;
        }
        
        .custom-calendar .rbc-button-link {
          color: white;
        }
        
        .custom-calendar .rbc-event-content {
          font-weight: 500;
        }
      `}</style> */}
      <style>{`
  .custom-calendar {
    background-color: white;
    color: #374151;
    border-radius: 0.75rem;
    padding: 1rem;
  }

  .custom-calendar .rbc-header {
    color: #3b82f6;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
  }

  .custom-calendar .rbc-day-bg + .rbc-day-bg,
  .custom-calendar .rbc-month-row + .rbc-month-row {
    border-color: #e5e7eb;
  }

  .custom-calendar .rbc-today {
    background-color: #f3f4f6;
  }

  .custom-calendar .rbc-button-link {
    color: #374151;
  }

  .custom-calendar .rbc-event {
    background-color: #3b82f6;
    color: white;
    border-radius: 4px;
    border: none;
    padding: 2px 4px;
    font-size: 0.875rem;
  }

  .custom-calendar .rbc-event-content {
    font-weight: 500;
  }

  .custom-calendar .rbc-off-range-bg {
    background-color: #f9fafb;
  }

  .custom-calendar .rbc-toolbar button {
    color: #374151;
    border: 1px solid #e5e7eb;
    background-color: white;
    transition: all 0.2s ease;
  }

  .custom-calendar .rbc-toolbar button:hover {
    background-color: #f3f4f6;
    color: #3b82f6;
  }

  .custom-calendar .rbc-toolbar button.rbc-active {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
`}</style>
    </div>
  );
};
export default Resources;
