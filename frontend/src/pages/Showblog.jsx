import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VotingSystemWithOneVote from "./VotingSystemWithOneVote";
import { ToastContainer , toast } from "react-toastify";

function Showblog(props) {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialize as null to check for loading state
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!data) { // Check if data is null
            axios
                .get("http://localhost:5000/blog/getData", {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    setData(res.data); // Assuming the response is an array
                })
                
        }
    }, [data, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRemainder = async ()=>{
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:5000/event/events/${id}/remind-me`,
                {},{
                    headers: {
                        Authorization: `Bearer ${props.token}` 
                    }
                }
            );
            // console.log(response);
            if (response.data.message === "Email sent successfully") {
                toast.success("Reminder set successfully!");
            } else {
                toast.error("Failed to set reminder.");
            }
        } 
        catch (error) {
            console.error(error);
            toast.error("Failed to set reminder.");
        }
        setLoading(false);
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar {...props} />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {!data ? (
                <div className="w-3/4 m-auto">
                <br />
                <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                <br />
                <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                <br />
                <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                <br />
                <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                <br />AC
                <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
            </div>
                // ... keep skeleton loader the same ...
            ) : (
                <div className="w-11/12 md:w-3/4 bg-[#457B9D] shadow-xl m-auto p-6 md:p-8 rounded-xl mt-8 mb-8 border border-gray-200">
                    {/* Header Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="mb-3 text-3xl font-bold text-gray-800 md:text-4xl">
                                {data.title}
                            </h1>
                            {!loading ? (<button className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleRemainder}>
                                Remind Me
                            </button>) : (<button className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"disabled >
                                loading..
                            </button>)}
                            
                            
                        </div>
                        
                        {/* Event Details */}
                        <div className="space-y-2 text-gray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                </svg>
                                <span className="font-medium text-gray-800">Event Dates:</span>
                                <span className="text-blue-950">
                                    {data.eventDate} {data.eventTime} 
                                    {data.eventEndDate && ` → ${data.eventEndDate} ${data.eventEndTime}`}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                </svg>
                                <span className="font-medium text-gray-800">Location:</span>
                                <span className="text-blue-950 ">{data.location}</span>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-4 border-gray-950" />

                    {/* Blog Content */}
                    <article className="mb-8 text-xl prose text-gray-800 max-w-none">
                        <pre className="font-sans whitespace-pre-wrap">
                            {data.blog}
                        </pre>
                    </article>

                    {/* Special Message */}
                    {data.message && (
                        <div className="bg-[#457b9d] p-4 rounded-lg border-2 border-blue-800 mb-6">
                            <h3 className="mb-2 font-semibold text-cyan-900">Special Message:</h3>
                            <p className="text-red-800">{data.message}</p>
                        </div>
                    )}

                    {/* Voting System */}
                    <div className="mb-8">
                        <VotingSystemWithOneVote 
                            eventId={id} 
                            Notparticipants={data.Notparticipants} 
                            participants={data.participants} 
                            token={props.token}
                        />
                    </div>

                    {/* End Section */}
                    <div className="pt-6 mt-8 text-center border-t border-gray-200">
                        <span className="text-sm tracking-wider text-gray-400 uppercase">
                            Event Concluded
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Showblog;
