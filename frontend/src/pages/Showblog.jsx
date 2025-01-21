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

    return (
        <div className="blog-bg bg-black text-gray-100 min-h-screen">
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
                <div className="w-11/12 md:w-3/4 bg-black text-gray-100 shadow-2xl border border-gray-700 m-auto p-5 rounded-lg mt-5">
                    <div className="flex">
                        <p className="font-bold text-2xl md:text-4xl">{data.title}</p>
                    </div>
                    <div className="mt-1 text-lg text-gray-400">
                        <p>
                            By <span className="text-blue-400">{data.name}</span>
                        </p>
                        <p>
                            {data.eventDate} at {data.eventTime} {/* Display event date and time */}
                        </p>
                        <p>
                            Location: <span className="text-blue-400">{data.location}</span> {/* Display location */}
                        </p>
                    </div>
                    <hr className="bg-blue-500 h-1 mt-4" />
                    <div className="mt-5 text-lg whitespace-pre-line">{data.blog}</div>
                    {data.message && ( // Conditionally render message if it exists
                        <div className="mt-4 text-gray-400">
                            <p>Message: {data.message}</p>
                        </div>
                    )}

                    <VotingSystemWithOneVote eventId={id} Notparticipants={data.Notparticipants} participants={data.participants} token ={props.token}/>

                    <div className="text-center mt-6 bg-gray-700 p-4 text-2xl rounded">
                        THE END
                    </div>
                    

                </div>
            )}
        </div>
    );
}

export default Showblog;
