// import React, { useState } from "react";
// import { Button } from "@chakra-ui/react";
// import { ArrowForwardIcon } from "@chakra-ui/icons";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Badge } from "@chakra-ui/react";

// const Blogcard = (props) => {
//   const width = window.innerWidth;
//   const address = "/showblog/" + props.data._id;
//   const [submit, setSubmit] = useState(false);
//   const [usermessage, setUserMessage] = useState("");

//   const newBadge = (() => {
//     const currentTime = new Date().getTime();
//     const postTime = new Date(props.data.date).getTime();
//     return Math.floor((currentTime - postTime) / 86400000) <= 15;
//   })();

//   const handleApprove = () => {
//     setSubmit(true);
//     axios
//         .post("http://localhost:5000/admin/approve", {
//           id: props.data._id,
//           message: usermessage,
//           token: props.token,
//         })
//         .then((res) => {
//           props.setData(res.data.data);
//           props.setMessage(res.data.message);
//           setSubmit(false);
//           inputClear();
//         });
//   };

//   const handleReject = () => {
//     setSubmit(true);
//     axios
//         .post("http://localhost:5000/admin/reject", {
//           id: props.data._id,
//           message: usermessage,
//           token: props.token,
//         })
//         .then((res) => {
//           props.setData(res.data.data);
//           props.setMessage(res.data.message);
//           setSubmit(false);
//           inputClear();
//         });
//   };

//   const handleDelete = () => {
//     setSubmit(true);
//     axios
//         .post("http://localhost:5000/admin/delete", {
//           id: props.data._id,
//           token: props.token,
//         })
//         .then((res) => {
//           props.setData(res.data.data);
//           props.setMessage(res.data.message);
//           setSubmit(false);
//         });
//   };

//   const handleChange = (e) => {
//     if (e.target.id === "usermessage") {
//       setUserMessage(e.target.value);
//     }
//   };

//   const inputClear = () => {
//     document.getElementById("usermessage").value = "";
//     setUserMessage("");
//   };

//   return (
//       <div className="flex justify-center w-full">
//         <div className="transition-all ease-in-out hover:scale-105 delay-150 w-11/12 md:w-3/4 rounded-lg p-6 bg-black text-white shadow-lg hover:shadow-xl">
//           <h5 className="text-3xl font-extrabold mb-2 text-white">
//             {props.data.title}
//             {newBadge && (
//                 <Badge className="ml-2" colorScheme="green">
//                   NEW
//                 </Badge>
//             )}
//           </h5>

//           <p className="text-sm text-gray-400 mb-4">
//             By {props.data.name} on {props.data.date} at {props.data.time}
//           </p>

//           <p className="text-base leading-relaxed">
//             {width > 800
//                 ? props.data.blog.slice(0, 700)
//                 : props.data.blog.slice(0, 200)}
//             &hellip;
//           </p>

//           <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
//             <Link to={address}>
//               <Button
//                   rightIcon={<ArrowForwardIcon />}
//                   colorScheme="blue"
//                   variant="solid"
//                   className="w-full"
//               >
//                 Read More
//               </Button>
//             </Link>
//             {!props.data.isApproved && (
//                 <>
//                   <Button
//                       colorScheme="green"
//                       variant="solid"
//                       isLoading={submit}
//                       data-bs-toggle="modal"
//                       data-bs-target="#exampleModal"
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                       colorScheme="yellow"
//                       variant="solid"
//                       isLoading={submit}
//                       data-bs-toggle="modal"
//                       data-bs-target="#exampleModal"
//                   >
//                     Reject
//                   </Button>
//                   <Button
//                       colorScheme="red"
//                       variant="solid"
//                       isLoading={submit}
//                       onClick={handleDelete}
//                   >
//                     Delete
//                   </Button>
//                 </>
//             )}
//           </div>

//           <div
//               className="modal fade text-black"
//               id="exampleModal"
//               tabIndex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//           >
//             <div className="modal-dialog">
//               <div className="modal-content bg-gray-800">
//                 <div className="modal-header">
//                   <h1 className="modal-title text-white" id="exampleModalLabel">
//                     Approve / Reject with a message
//                   </h1>
//                 </div>
//                 <div className="modal-body">
//                   <label
//                       htmlFor="usermessage"
//                       className="block text-sm text-gray-300"
//                   >
//                     Message for User <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                       id="usermessage"
//                       onChange={handleChange}
//                       type="text"
//                       className="block w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
//                       required
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <Button
//                       onClick={handleApprove}
//                       colorScheme="green"
//                       className="text-white"
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                       onClick={handleReject}
//                       colorScheme="red"
//                       className="text-white"
//                   >
//                     Reject
//                   </Button>
//                   <Button colorScheme="gray" data-bs-dismiss="modal">
//                     Close
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Blogcard;

/*
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "@chakra-ui/react";

const Blogcard = (props) => {
  const width = window.innerWidth;
  const address = "/showblog/" + props.data._id;
  const [submit, setSubmit] = useState(false);
  const [usermessage, setUserMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const newBadge = (() => {
    const currentTime = new Date().getTime();
    const postTime = new Date(props.data.eventDate).getTime(); 
    return Math.floor((currentTime - postTime) / 86400000) <= 15;
  })();

  const handleApprove = () => {
    setSubmit(true);
    axios
      .post("http://localhost:5000/admin/approve", {
        id: props.data._id,
        message: usermessage,
        token: props.token,
      })
      .then((res) => {
        props.setData(res.data.data);
        props.setMessage(res.data.message);
        setSubmit(false);
        inputClear();
      });
      setIsModalOpen(false);
  };

  const handleReject = () => {
    setSubmit(true);
    axios
      .post("http://localhost:5000/admin/reject", {
        id: props.data._id,
        message: usermessage,
        token: props.token,
      })
      .then((res) => {
        props.setData(res.data.data);
        props.setMessage(res.data.message);
        setSubmit(false);
        inputClear();
      });
      setIsModalOpen(false);
  };

  const handleDelete = () => {
    setSubmit(true);
    axios
      .post("http://localhost:5000/admin/delete", {
        id: props.data._id,
        token: props.token,
      })
      .then((res) => {
        props.setData(res.data.data);
        props.setMessage(res.data.message);
        setSubmit(false);
      });
      setIsModalOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.id === "usermessage") {
      setUserMessage(e.target.value);
    }
    
  };

  const inputClear = () => {
    document.getElementById("usermessage").value = "";
    setUserMessage("");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="transition-all ease-in-out hover:scale-105 delay-150 w-11/12 md:w-3/4 rounded-lg p-6 bg-black text-white shadow-lg hover:shadow-xl">
        <h5 className="text-3xl font-extrabold mb-2 text-white">
          {props.data.title}
          {newBadge && (
            <Badge className="ml-2" colorScheme="green">
              NEW
            </Badge>
          )}
        </h5>

        <p className="text-sm text-gray-400 mb-4">
          By {props.data.userId} on {props.data.eventDate} at {props.data.eventTime}
        </p>

        <p className="text-base leading-relaxed">
          {width > 800
            ? props.data.blog.slice(0, 700)
            : props.data.blog.slice(0, 200)}
          &hellip;
        </p>

        <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
          <Link to={address}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="solid"
              className="w-full"
            >
              Read More
            </Button>
          </Link>
          {!props.data.isApproved && (
            <>
              <Button
                colorScheme="green"
                variant="solid"
                isLoading={submit}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setIsModalOpen(true)}
              >
                Approve
              </Button>
              <Button
                colorScheme="yellow"
                variant="solid"
                isLoading={submit}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Reject
              </Button>
              <Button
                colorScheme="red"
                variant="solid"
                isLoading={submit}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </div>
        {isModalOpen && (
        <div
          className="modal fade text-black"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-gray-800">
              <div className="modal-header">
                <h1 className="modal-title text-white" id="exampleModalLabel">
                  Approve / Reject with a message
                </h1>
              </div>
              <div className="modal-body">
                <label
                  htmlFor="usermessage"
                  className="block text-sm text-gray-300"
                >
                  Message for User <span className="text-red-500">*</span>
                </label>
                <input
                  id="usermessage"
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="modal-footer">
                <Button
                  onClick={handleApprove}
                  colorScheme="green"
                  className="text-white"
                >
                  Approve
                </Button>
                <Button
                  onClick={handleReject}
                  colorScheme="red"
                  className="text-white"
                >
                  Reject
                </Button>
                <Button colorScheme="gray" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
)}
      </div>
    </div>
  );
};

export default Blogcard;

*/
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "@chakra-ui/react";

const Blogcard = (props) => {
  //console.log("Blogcard",props);
  

  const width = window.innerWidth;
  const address = "/showblog/" + props.data._id;
  const [submit, setSubmit] = useState(false);
  const [usermessage, setUserMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newBadge = (() => {
    const currentTime = new Date().getTime();
    const postTime = new Date(props.data.eventDate).getTime();
    return Math.floor((currentTime - postTime) / 86400000) <= 15;
  })();

  const handleApprove = () => {
    setSubmit(true);
    // console.log("BlogCard : ", props.data._id,usermessage,props.token);
    axios
      .post("http://localhost:5000/admin/approve", {
        id: props.data._id,
        message: usermessage,
        token: props.token,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);

        props.setData(res.data.data);
        props.setMessage(res.data.message);
        setSubmit(false);
        inputClear();
      });
    setIsModalOpen(false);
  };

  const handleReject = () => {
    setSubmit(true);
    axios
      .post("http://localhost:5000/admin/reject", {
        id: props.data._id,
        message: usermessage,
        token: props.token,
      })
      .then((res) => {
        props.setData(res.data.data);
        props.setMessage(res.data.message);
        setSubmit(false);
        inputClear();
      });
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setSubmit(true);
    axios
      .post("http://localhost:5000/admin/delete", {
        id: props.data._id,
        token: props.token,
      })
      .then((res) => {
        props.setData(res.data.data);
        props.setMessage(res.data.message);
        setSubmit(false);
      });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const inputClear = () => {
    setUserMessage("");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="transition-all ease-in-out hover:scale-105 delay-150 w-11/12 md:w-3/4 rounded-lg p-6 bg-[#457b9d] text-white shadow-lg hover:shadow-xl mb-3">
        <h5 className="text-3xl font-extrabold mb-2 text-slate-950">
          {props.data.title}
          {newBadge && (
            <Badge className="ml-2" colorScheme="green">
              NEW
            </Badge>
          )}
        </h5>

        <p className="text-sm text-[#023047] mb-4">
          By {props.data.userId} on {props.data.eventDate} at {props.data.eventTime}
        </p>

        <p className="text-base leading-relaxed">
          {width > 800
            ? props.data.blog.slice(0, 700)
            : props.data.blog.slice(0, 200)}
          &hellip;
        </p>

        <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
          <Link to={address}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="solid"
              className="w-full"
            >
              Read More
            </Button>
          </Link>
           {(props.isAdmin && props.data.isApproved)?<Button
                colorScheme="red"
                variant="solid"
                isLoading={submit}
                onClick={handleDelete}
              >
                Delete
              </Button>:<></>} 
          {!props.data.isApproved && (
            <>
              <Button
                colorScheme="green"
                variant="solid"
                isLoading={submit}
                onClick={() => setIsModalOpen(true)}
              >
                Approve
              </Button>
              <Button
                colorScheme="yellow"
                variant="solid"
                isLoading={submit}
                onClick={() => setIsModalOpen(true)}
              >
                Reject
              </Button>
              <Button
                colorScheme="red"
                variant="solid"
                isLoading={submit}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </div>
        {isModalOpen && (
          <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content bg-gray-800 p-6 rounded-lg">
              <h1 className="text-white text-lg mb-4">Approve / Reject with a message</h1>
              <label htmlFor="usermessage" className="block text-sm text-gray-300">
                Message for User <span className="text-red-500">*</span>
              </label>
              <input
                id="usermessage"
                value={usermessage}
                onChange={handleChange}
                type="text"
                className="block w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
                required
              />
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleApprove} colorScheme="green" className="text-white">
                  Approve
                </Button>
                <Button onClick={handleReject} colorScheme="red" className="text-white">
                  Reject
                </Button>
                <Button colorScheme="gray" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogcard;
