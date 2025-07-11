
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import Navbar from "../components/Navbar";
// import { EventContext } from "./EventsComponent";
// import { ToastContainer, toast } from 'react-toastify';

// // Initialize moment localizer
// const localizer = momentLocalizer(moment);

// const Resources = (props) => {
//   const { events, setEvents } = useContext(EventContext); // Consume the context
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

//   useEffect(() => {
//     axios.get("http://localhost:5000/event/get-events")
//     .then((res) => {
//       setEvents(
//         res.data.events.map((event) => ({
//           ...event,
//           start: new Date(event.start),
//           end: new Date(event.end),
//         }))
//       );
//     });
//   }, [setEvents]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   const validInfo = () => toast.error("Please provide Valid Title or Date",{position: "top-center"});

//   const deleteError = () => toast("Failed to delete the event. Please try again.");

//   const handleAddEvent = () => {
//     const startDate = new Date(newEvent.start);
//     const endDate = new Date(newEvent.end);

//     if (
//       !newEvent.title ||
//       isNaN(startDate) ||
//       isNaN(endDate) ||
//       startDate >= endDate
//     ) {
//       validInfo();
//       return;
//     }

//     const event = {
//       title: newEvent.title,
//       start: startDate.toISOString(),
//       end: endDate.toISOString(),
//     };

//     axios.post("http://localhost:5000/event/post-event", event).then((res) => {
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

//   const handleDeleteEvent = (eventId) => {
//     axios
//       .delete(`http://localhost:5000/event/events/${eventId}`)
//       .then((res) => {
//         setEvents(events.filter((event) => event._id !== eventId));
//       })
//       .catch((err) => {
//         // console.error("Error deleting event:", err);
//         deleteError();
//       });
//   };

//   const user = { isAdmin: true };
//   return (
//     <div className="min-h-screen bg-[#f8f9fa]">
//       <Navbar user={{ isAdmin: true }} {...props} />
//       {/* <ToastContainer /> */}
//       <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick={true}
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//       />
//       <div className="container px-4 py-8 mx-auto">
//         <div className="flex flex-col gap-8 lg:flex-row">
//           <div className="flex flex-col gap-6 lg:w-1/3">
//             <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
//               <h3 className="mb-4 text-xl font-bold text-blue-400">Schedule Event</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-300">
//                     Event Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={newEvent.title}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Team meeting"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-300">
//                       Start
//                     </label>
//                     <input
//                       type="datetime-local"
//                       name="start"
//                       value={newEvent.start}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-300">
//                       End
//                     </label>
//                     <input
//                       type="datetime-local"
//                       name="end"
//                       value={newEvent.end}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleAddEvent}
//                   className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
//                 >
//                   Add to Calendar
//                 </button>
//               </div>
//             </div>

//             {/* Event List */}
//             <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
//               <h3 className="mb-4 text-xl font-bold text-blue-400">Scheduled Events</h3>
//               <div className="pr-2 space-y-3 overflow-y-auto max-h-96">
//                 {events.map((event) => (
//                   <div
//                     key={event._id}
//                     className="flex items-center justify-between p-3 transition-colors bg-gray-700 rounded-lg group hover:bg-gray-600"
//                   >
//                     <span className="text-gray-200 truncate">{event.title}</span>
//                     <button
//                       onClick={() => handleDeleteEvent(event._id)}
//                       className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white opacity-75 group-hover:opacity-100 transition-opacity"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* <div className="lg:w-2/3">
//             <div className="p-6 bg-white shadow-xl rounded-xl">
//               <Calendar
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 700 }}
//                 className="custom-calendar"
//                 theme={{
//                   calendar: {
//                     backgroundColor: 'transparent',
//                   },
//                   event: {
//                     backgroundColor: '#3b82f6',
//                     color: 'white',
//                     borderRadius: '4px',
//                     border: 'none',
//                   },
//                   today: {
//                     backgroundColor: '#1f2937',
//                   },
//                 }}
//               />
//             </div>
//           </div> */}
//           <div className="lg:w-2/3">
//   <div className="bg-[#1F2937] rounded-xl p-6 shadow-lg border border-gray-200">
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 700 }}
//       className="custom-calendar"
//       theme={{
//         calendar: {
//           backgroundColor: 'transparent',
//         },
//         event: {
//           backgroundColor: '#1F2937',
//           color: 'white',
//           borderRadius: '4px',
//           border: 'none',
//         },
//         today: {
//           backgroundColor: '#1f2937',
//         },
//       }}
//     />
//   </div>
// </div>
//         </div>
//       </div>

      
//       <style>{`
//   .custom-calendar {
//     background-color: white;
//     color: #374151;
//     border-radius: 0.75rem;
//     padding: 1rem;
//   }

//   .custom-calendar .rbc-header {
//     color: #3b82f6;
//     padding: 1rem 0;
//     border-bottom: 1px solid #e5e7eb;
//     font-weight: 600;
//   }

//   .custom-calendar .rbc-day-bg + .rbc-day-bg,
//   .custom-calendar .rbc-month-row + .rbc-month-row {
//     border-color: #e5e7eb;
//   }

//   .custom-calendar .rbc-today {
//     background-color: #f3f4f6;
//   }

//   .custom-calendar .rbc-button-link {
//     color: #374151;
//   }

//   .custom-calendar .rbc-event {
//     background-color: #3b82f6;
//     color: white;
//     border-radius: 4px;
//     border: none;
//     padding: 2px 4px;
//     font-size: 0.875rem;
//   }

//   .custom-calendar .rbc-event-content {
//     font-weight: 500;
//   }

//   .custom-calendar .rbc-off-range-bg {
//     background-color: #f9fafb;
//   }

//   .custom-calendar .rbc-toolbar button {
//     color: #374151;
//     border: 1px solid #e5e7eb;
//     background-color: white;
//     transition: all 0.2s ease;
//   }

//   .custom-calendar .rbc-toolbar button:hover {
//     background-color: #f3f4f6;
//     color: #3b82f6;
//   }

//   .custom-calendar .rbc-toolbar button.rbc-active {
//     background-color: #3b82f6;
//     color: white;
//     border-color: #3b82f6;
//   }
// `}</style>
//     </div>
//   );
// };
// export default Resources;



// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import Navbar from "../components/Navbar";
// import { EventContext } from "./EventsComponent";
// import { ToastContainer, toast } from 'react-toastify';

// // Initialize moment localizer
// const localizer = momentLocalizer(moment);

// const Resources = (props) => {
//   // const { events, setEvents } = useContext(EventContext); // Consume the context
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/event/get-events")
//     .then((res) => {
//       setEvents(res.data.events.map((event) =>{
        
//       } ));
//     });
//   }, [setEvents]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   const validInfo = () => toast.error("Please provide Valid Title or Date",{position: "top-center"});

//   const deleteError = () => toast("Failed to delete the event. Please try again.");

//   const handleAddEvent = () => {
//     const startDate = new Date(newEvent.start);
//     const endDate = new Date(newEvent.end);

//     if (
//       !newEvent.title ||
//       isNaN(startDate) ||
//       isNaN(endDate) ||
//       startDate >= endDate
//     ) {
//       validInfo();
//       return;
//     }

//     const event = {
//       title: newEvent.title,
//       start: startDate.toISOString(),
//       end: endDate.toISOString(),
//     };

//     axios.post("http://localhost:5000/event/post-event", event).then((res) => {
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

//   const handleDeleteEvent = (eventId) => {
//     axios
//       .delete(`http://localhost:5000/event/events/${eventId}`)
//       .then((res) => {
//         setEvents(events.filter((event) => event._id !== eventId));
//       })
//       .catch((err) => {
//         // console.error("Error deleting event:", err);
//         deleteError();
//       });
//   };

//   const user = { isAdmin: true };
//   return (
//     <div className="min-h-screen bg-[#f8f9fa]">
//       <Navbar user={{ isAdmin: true }} {...props} />
//       {/* <ToastContainer /> */}
//       <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick={true}
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//       />
//       <div className="container px-4 py-8 mx-auto">
//         <div className="flex flex-col gap-8 lg:flex-row">
//           <div className="flex flex-col gap-6 lg:w-1/3">
//             <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
//               <h3 className="mb-4 text-xl font-bold text-blue-400">Schedule Event</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-300">
//                     Event Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={newEvent.title}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Team meeting"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-300">
//                       Start
//                     </label>
//                     <input
//                       type="datetime-local"
//                       name="start"
//                       value={newEvent.start}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-300">
//                       End
//                     </label>
//                     <input
//                       type="datetime-local"
//                       name="end"
//                       value={newEvent.end}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleAddEvent}
//                   className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
//                 >
//                   Add to Calendar
//                 </button>
//               </div>
//             </div>

//             {/* Event List */}
//             <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
//               <h3 className="mb-4 text-xl font-bold text-blue-400">Scheduled Events</h3>
//               <div className="pr-2 space-y-3 overflow-y-auto max-h-96">
//                 {events.map((event) => (
//                   <div
//                     key={event._id}
//                     className="flex items-center justify-between p-3 transition-colors bg-gray-700 rounded-lg group hover:bg-gray-600"
//                   >
//                     <span className="text-gray-200 truncate">{event.title}</span>
//                     <button
//                       onClick={() => handleDeleteEvent(event._id)}
//                       className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white opacity-75 group-hover:opacity-100 transition-opacity"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* <div className="lg:w-2/3">
//             <div className="p-6 bg-white shadow-xl rounded-xl">
//               <Calendar
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 700 }}
//                 className="custom-calendar"
//                 theme={{
//                   calendar: {
//                     backgroundColor: 'transparent',
//                   },
//                   event: {
//                     backgroundColor: '#3b82f6',
//                     color: 'white',
//                     borderRadius: '4px',
//                     border: 'none',
//                   },
//                   today: {
//                     backgroundColor: '#1f2937',
//                   },
//                 }}
//               />
//             </div>
//           </div> */}
//           <div className="lg:w-2/3">
//   <div className="bg-[#1F2937] rounded-xl p-6 shadow-lg border border-gray-200">
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 700 }}
//       className="custom-calendar"
//       theme={{
//         calendar: {
//           backgroundColor: 'transparent',
//         },
//         event: {
//           backgroundColor: '#1F2937',
//           color: 'white',
//           borderRadius: '4px',
//           border: 'none',
//         },
//         today: {
//           backgroundColor: '#1f2937',
//         },
//       }}
//     />
//   </div>
// </div>
//         </div>
//       </div>

      
//       <style>{`
//   .custom-calendar {
//     background-color: white;
//     color: #374151;
//     border-radius: 0.75rem;
//     padding: 1rem;
//   }

//   .custom-calendar .rbc-header {
//     color: #3b82f6;
//     padding: 1rem 0;
//     border-bottom: 1px solid #e5e7eb;
//     font-weight: 600;
//   }

//   .custom-calendar .rbc-day-bg + .rbc-day-bg,
//   .custom-calendar .rbc-month-row + .rbc-month-row {
//     border-color: #e5e7eb;
//   }

//   .custom-calendar .rbc-today {
//     background-color: #f3f4f6;
//   }

//   .custom-calendar .rbc-button-link {
//     color: #374151;
//   }

//   .custom-calendar .rbc-event {
//     background-color: #3b82f6;
//     color: white;
//     border-radius: 4px;
//     border: none;
//     padding: 2px 4px;
//     font-size: 0.875rem;
//   }

//   .custom-calendar .rbc-event-content {
//     font-weight: 500;
//   }

//   .custom-calendar .rbc-off-range-bg {
//     background-color: #f9fafb;
//   }

//   .custom-calendar .rbc-toolbar button {
//     color: #374151;
//     border: 1px solid #e5e7eb;
//     background-color: white;
//     transition: all 0.2s ease;
//   }

//   .custom-calendar .rbc-toolbar button:hover {
//     background-color: #f3f4f6;
//     color: #3b82f6;
//   }

//   .custom-calendar .rbc-toolbar button.rbc-active {
//     background-color: #3b82f6;
//     color: white;
//     border-color: #3b82f6;
//   }
// `}</style>
//     </div>
//   );
// };
// export default Resources;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "../components/Navbar";
import { EventContext } from "./EventsComponent";
import { ToastContainer, toast } from 'react-toastify';

// Initialize moment localizer
const localizer = momentLocalizer(moment);

const Resources = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to transform backend event data to calendar format
  const transformEventData = (backendEvent) => {
    // console.log("Raw backend event:", backendEvent); // Debug log
    
    // Handle different possible date/time formats
    let startDate, endDate;
    
    // Try to create proper datetime strings
    if (backendEvent.eventDate && backendEvent.eventTime) {
      // Add seconds if missing (e.g., "10:30" becomes "10:30:00")
      const startTime = backendEvent.eventTime.includes(':') && backendEvent.eventTime.split(':').length === 2 
        ? `${backendEvent.eventTime}:00` 
        : backendEvent.eventTime;
      
      startDate = new Date(`${backendEvent.eventDate}T${startTime}`);
      // console.log("Start date created:", startDate);
    }
    
    if (backendEvent.eventEndDate && backendEvent.eventEndTime) {
      // Add seconds if missing
      const endTime = backendEvent.eventEndTime.includes(':') && backendEvent.eventEndTime.split(':').length === 2 
        ? `${backendEvent.eventEndTime}:00` 
        : backendEvent.eventEndTime;
      
      endDate = new Date(`${backendEvent.eventEndDate}T${endTime}`);
      // console.log("End date created:", endDate);
    }
    
    // Fallback: if end date is invalid, set it to 1 hour after start
    if (!endDate || isNaN(endDate.getTime())) {
      endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour
      // console.log("Using fallback end date:", endDate);
    }
    
    const transformedEvent = {
      id: backendEvent._id,
      title: backendEvent.title || 'Untitled Event',
      start: startDate,
      end: endDate,
      resource: {
        location: backendEvent.location || null,
        participants: backendEvent.participants || 0,
        nonParticipants: backendEvent.nonParticipants || 0
      }
    };
    
    // console.log("Transformed event:", transformedEvent);
    return transformedEvent;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/event/get-events");
        // console.log("Full backend response:", response); // Debug log
        // console.log("Backend response data:", response.data); // Debug log
        
        // Check if response.data is an array or if it's wrapped in an object
        const eventsArray = Array.isArray(response.data) ? response.data : response.data.events || [];
        // console.log("Events array:", eventsArray); // Debug log
        
        // Transform the events data
        const transformedEvents = eventsArray
          .map(transformEventData)
          .filter(event => event.start && !isNaN(event.start.getTime())); // Filter out invalid dates
        
        // console.log("Transformed events:", transformedEvents); // Debug log
        // console.log("Valid events count:", transformedEvents.length); // Debug log
        
        setEvents(transformedEvents);
      } catch (error) {
        // console.error("Error fetching events:", error);
        toast.error("Failed to load events", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const validInfo = () => toast.error("Please provide Valid Title or Date", { position: "top-center" });
  const deleteError = () => toast("Failed to delete the event. Please try again.");

  const handleAddEvent = () => {
    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    if (
      !newEvent.title ||
      isNaN(startDate) ||
      isNaN(endDate) ||
      startDate >= endDate
    ) {
      validInfo();
      return;
    }

    const event = {
      title: newEvent.title,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    axios.post("http://localhost:5000/event/post-event", event).then((res) => {
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
      .delete(`http://localhost:5000/event/events/${eventId}`)
      .then((res) => {
        setEvents(events.filter((event) => event.id !== eventId));
      })
      .catch((err) => {
        // console.error("Error deleting event:", err);
        deleteError();
      });
  };

  // Custom event component to show additional info
  const EventComponent = ({ event }) => (
    <div className="text-xs">
      <div className="font-semibold">{event.title}</div>
      {event.resource?.location && (
        <div className="opacity-75">📍 {event.resource.location}</div>
      )}
      {event.resource?.participants > 0 && (
        <div className="opacity-75">👥 {event.resource.participants}</div>
      )}
    </div>
  );

  // Custom event tooltip
  const handleSelectEvent = (event) => {
    const startTime = moment(event.start).format('MMM DD, YYYY h:mm A');
    const endTime = moment(event.end).format('MMM DD, YYYY h:mm A');
    
    toast.info(
      <div>
        <strong>{event.title}</strong>
        <br />
        📅 {startTime} - {endTime}
        {event.resource?.location && (
          <>
            <br />
            📍 {event.resource.location}
          </>
        )}
        {event.resource?.participants > 0 && (
          <>
            <br />
            👥 {event.resource.participants} participants
          </>
        )}
      </div>,
      { position: "top-center", autoClose: 5000 }
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar user={{ isAdmin: true }} {...props} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-col gap-6 lg:w-1/3">
            <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
              <h3 className="mb-4 text-xl font-bold text-blue-400">Schedule Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team meeting"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Start
                    </label>
                    <input
                      type="datetime-local"
                      name="start"
                      value={newEvent.start}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      End
                    </label>
                    <input
                      type="datetime-local"
                      name="end"
                      value={newEvent.end}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
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
            <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
              <h3 className="mb-4 text-xl font-bold text-blue-400">Scheduled Events</h3>
              {loading ? (
                <div className="text-center text-gray-400">Loading events...</div>
              ) : (
                <div className="pr-2 space-y-3 overflow-y-auto max-h-96">
                  {events.length === 0 ? (
                    <div className="text-center text-gray-400">No events scheduled</div>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col p-3 transition-colors bg-gray-700 rounded-lg group hover:bg-gray-600"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-200 truncate">{event.title}</span>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white opacity-75 group-hover:opacity-100 transition-opacity"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                          <div>📅 {moment(event.start).format('MMM DD, h:mm A')}</div>
                          {event.resource?.location && (
                            <div>📍 {event.resource.location}</div>
                          )}
                          {event.resource?.participants > 0 && (
                            <div>👥 {event.resource.participants} participants</div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-[#1F2937] rounded-xl p-6 shadow-lg border border-gray-200">
              {loading ? (
                <div className="flex items-center justify-center h-[700px] text-white">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                    <div>Loading calendar...</div>
                  </div>
                </div>
              ) : (
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 700 }}
                  className="custom-calendar"
                  onSelectEvent={handleSelectEvent}
                  components={{
                    event: EventComponent,
                  }}
                  popup={true}
                  tooltipAccessor={null}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '0.875rem',
                    },
                  })}
                />
              )}
            </div>
          </div>
        </div>
      </div>

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

        .custom-calendar .rbc-popup {
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Resources;