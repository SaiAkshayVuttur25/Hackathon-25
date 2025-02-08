import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VotingSystemWithOneVote from "./VotingSystemWithOneVote"; // Import the voting system

function Showblog(props) {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialize as null to check for loading state

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

    /*return (
        <div className=" bg-[#f8f9fa] text-gray-100 min-h-screen">
            <Navbar {...props} />
            {!data ? ( // Check if data is null
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
            ) : (
                <div className="w-11/12 md:w-3/4 bg-[#457B9D] text-gray-100 shadow-2xl border border-gray-700 m-auto p-5 rounded-lg mt-5">
                    <div className="flex">
                        <p className="font-bold text-2xl md:text-4xl">{data.title}</p>
                    </div>
                    <div className="mt-1 text-lg text-[#f1faee]">
                        <p>
                            By <span className="text-[#1d3557]">{data._id}</span>
                        </p>
                        <p>
                            From {data.eventDate} at {data.eventTime} 
                        </p>
                        <p>
                            To {(data.eventEndDate && data.eventEndTime) ? (`${data.eventEndDate} at ${data.eventEndTime}` ): ("Releasing Soon")}
                        </p>
                        <p>
                            Location: <span className="text-[#1d3557]">{data.location}</span> 
                        </p>
                    </div>
                    <hr className="bg-[#1d3557] h-1 mt-4" />
                    <div className="mt-5 text-lg whitespace-pre-line">{data.blog}</div>
                    {data.message && ( // Conditionally render message if it exists
                        <div className="mt-4 text-[#f1faee]">
                            <p>Message: {data.message}</p>
                        </div>
                    )}

                    <VotingSystemWithOneVote eventId={id} Notparticipants={data.Notparticipants} participants={data.participants} token ={props.token}/>

                    <div className="text-center mt-6 bg-gray-800 p-4 text-2xl rounded">
                        THE END
                    </div>
                    

                </div>
            )}
        </div>
    );
    */
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar {...props} />
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
                        <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-3">
                            {data.title}
                        </h1>
                        
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

                    <hr className="border-4 border-gray-950 my-6" />

                    {/* Blog Content */}
                    <article className="prose max-w-none text-gray-800 mb-8 text-xl">
                        <pre className="whitespace-pre-wrap font-sans">
                            {data.blog}
                        </pre>
                    </article>

                    {/* Special Message */}
                    {data.message && (
                        <div className="bg-[#457b9d] p-4 rounded-lg border-2 border-blue-800 mb-6">
                            <h3 className="text-cyan-900 font-semibold mb-2">Special Message:</h3>
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
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <span className="text-gray-400 uppercase text-sm tracking-wider">
                            Event Concluded
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Showblog;
