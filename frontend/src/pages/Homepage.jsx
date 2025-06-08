
// import { Button } from "@chakra-ui/react";
// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import "./Homepage.css";


// function Homepage(props) {
//   return (
//     <div className="text-white ">
//       <div
//   className="bg-center bg-cover"
//   style={{
//     backgroundImage:
//       "url('https://vnit.ac.in/wp-content/uploads/2023/09/VNIT-Main-1024x623.jpg')",
//   }}
// >
//   <Navbar {...props} />
//   <section className="flex flex-col items-center justify-center py-24 bg-black bg-opacity-70">
//     <h1
//       className="mb-4 font-extrabold tracking-widest text-center text-white text-7xl"
//       style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
//     >
//       Unite, Celebrate, Thrive
//     </h1>
//     <h2 className="tracking-widest text-white gradient-text">
//       Your Hostel Life, Your Story!
//     </h2>
//     <Link to="/login">
//       <Button
//         colorScheme="teal"
//         variant="outline"
//         borderColor="rgba(255, 255, 255, 0.5)"
//         color="white"
//         _hover={{
//           bg: "rgba(255, 255, 255, 0.1)",
//           color: "teal.300",
//           boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
//         }}
//         _active={{
//           bg: "rgba(255, 255, 255, 0.2)",
//           color: "teal.400",
//         }}
//         _focus={{
//           boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.5)",
//         }}
//         px={6}
//         py={3}
//         borderRadius="md"
//       >
//         Explore More
//       </Button>
//     </Link>
//   </section>
// </div>
//       <div
//         id="about-us"
//         className="flex flex-col mx-4 mt-3 mb-3 border border-gray-700 lg:flex-row"
//       >
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <div className="container p-6 rounded-lg shadow-lg lg:px-10 shadow-gray-800">
//             <p className="text-2xl font-bold text-center text-black">About Us</p>

//             <p className="mt-4 text-black">
//               We are a group of individuals united by our love for astronomy and
//               passion for exploring the universe. As a club, we organize a
//               variety of events and activities that allow members to delve
//               deeper into this fascinating field. From educational workshops and
//               guest speaker sessions to stargazing sessions and telescope
//               viewings, we offer opportunities for hands-on learning and personal
//               growth.
//               <br />
//               <br /> Whether you're a seasoned astronomer or just starting to
//               develop an interest in the stars, our club provides a welcoming and
//               inclusive environment for all. Come join us and be a part of a
//               community that is dedicated to advancing our understanding of the
//               cosmos.
//             </p>
//           </div>
//         </div>
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <img
//             src="https://1.bp.blogspot.com/-MLX81cymNNs/X7QNIFT-RII/AAAAAAAAELc/2XG-Cxd0XRU0GJEO-3E0F6_MMutFkxdVQCLcBGAsYHQ/s1536/1898-lec3-1536x865.jpg"
//             alt="Astronomy event"
//           />
//         </div>
//       </div>

//       <div
//         id="here"
//         className="flex flex-col mx-4 mt-3 mb-3 border border-gray-700 lg:flex-row-reverse"
//       >
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <div className="container p-6 rounded-lg shadow-lg lg:px-10 shadow-gray-800">
//             <p className="text-2xl font-bold text-center">
//               Our Goal <span className="big">🎯</span>
//             </p>
//             <br />
//             <p>
//               Our goal at the Astronomy Club is to inspire and educate individuals
//               about the wonders of the universe.
//               <br /> We aim to:
//               <ul className="list-disc list-inside">
//                 <li>
//                   Promote a deeper understanding and appreciation of astronomy
//                   through hands-on learning experiences.
//                 </li>
//                 <li>
//                   Provide access to the latest technology and knowledge in the
//                   field of astronomy and aerospace.
//                 </li>
//                 <li>
//                   Create a community of like-minded individuals who share a
//                   passion for the cosmos.
//                 </li>
//                 <li>
//                   Encourage participation in astronomical research and
//                   projects.
//                 </li>
//                 <li>
//                   Raise awareness of the beauty and significance of the night
//                   sky.
//                 </li>
//               </ul>
//               <br />
//               Whether you're an amateur astronomer or a curious learner, we hope
//               you find the information and resources on this site to be both
//               informative and entertaining.
//             </p>
//           </div>
//         </div>
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <img
//             width="600px"
//             className=""
//             src="https://img.freepik.com/premium-photo/cute-rocket-space-illustrationcartoon-boy-flying-with-rocket-sky-background-vector_1016228-2723.jpg"
//             alt="Astronomy club activities"
//           />
//         </div>
//       </div>

//       <div className="text-center">
//         <Link to="/blogs">
//           <Button className="m-3" variant="outline" colorScheme="linkedin">
//             Blogs
//           </Button>
//         </Link>
//         <Link to="/signup">
//           <Button className="m-3" variant="outline" colorScheme="linkedin">
//             <span className="">Get Started</span>
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Homepage;

// import { Button } from "@chakra-ui/react";
// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import "./Homepage.css";
// import backgroundImage from './image.jpg';


// function Homepage(props) {
//   return (
//     <div className="text-white">
//       <div
//         className="bg-center bg-cover"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           minHeight: "85vh",
//         }}        
//       >
//         {/* Navbar with semi-transparent background */}
//         <Navbar {...props} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />

//         <section className="flex flex-col items-center justify-center py-24 bg-gray-800 bg-opacity-70">
//           <h1
//             className="mb-4 font-extrabold tracking-widest text-center text-white text-7xl"
//             style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
//           >
//             Unite, Celebrate, Thrive
//           </h1>
//           <h2 className="tracking-widest text-white gradient-text">
//             Your Hostel Life, Your Story!
//           </h2>
//           <Link to="/login">
//             <Button
//               colorScheme="teal"
//               variant="outline"
//               borderColor="rgba(255, 255, 255, 0.5)"
//               color="white"
//               _hover={{
//                 bg: "rgba(255, 255, 255, 0.1)",
//                 color: "teal.300",
//                 boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
//               }}
//               _active={{
//                 bg: "rgba(255, 255, 255, 0.2)",
//                 color: "teal.400",
//               }}
//               _focus={{
//                 boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.5)",
//               }}
//               px={6}
//               py={3}
//               borderRadius="md"
//             >
//               Explore More
//             </Button>
//           </Link>
//         </section>
//       </div>

//       {/* About Us Section */}
//       <div
//         id="about-us"
//         className="flex flex-col mx-4 mt-3 mb-3 border border-gray-700 lg:flex-row"
//       >
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <div className="container p-6 rounded-lg shadow-lg lg:px-10 shadow-gray-800">
//             <p className="text-2xl font-bold text-center text-black">About Us</p>
//             <p className="mt-4 text-black">
//               We are a group of individuals united by our love for astronomy and
//               passion for exploring the universe. As a club, we organize a
//               variety of events and activities that allow members to delve
//               deeper into this fascinating field. From educational workshops and
//               guest speaker sessions to stargazing sessions and telescope
//               viewings, we offer opportunities for hands-on learning and personal
//               growth.
//               <br />
//               <br /> Whether you're a seasoned astronomer or just starting to
//               develop an interest in the stars, our club provides a welcoming and
//               inclusive environment for all. Come join us and be a part of a
//               community that is dedicated to advancing our understanding of the
//               cosmos.
//             </p>
//           </div>
//         </div>
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <img
//             src="https://1.bp.blogspot.com/-MLX81cymNNs/X7QNIFT-RII/AAAAAAAAELc/2XG-Cxd0XRU0GJEO-3E0F6_MMutFkxdVQCLcBGAsYHQ/s1536/1898-lec3-1536x865.jpg"
//             alt="Astronomy event"
//           />
//         </div>
//       </div>

//       {/* Goals Section */}
//       <div
//         id="here"
//         className="flex flex-col mx-4 mt-3 mb-3 border border-gray-700 lg:flex-row-reverse"
//       >
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <div className="container p-6 rounded-lg shadow-lg lg:px-10 shadow-gray-800">
//             <p className="text-2xl font-bold text-center">
//               Our Goal <span className="big">🎯</span>
//             </p>
//             <br />
//             <p>
//               Our goal at the Astronomy Club is to inspire and educate individuals
//               about the wonders of the universe.
//               <br /> We aim to:
//               <ul className="list-disc list-inside">
//                 <li>
//                   Promote a deeper understanding and appreciation of astronomy
//                   through hands-on learning experiences.
//                 </li>
//                 <li>
//                   Provide access to the latest technology and knowledge in the
//                   field of astronomy and aerospace.
//                 </li>
//                 <li>
//                   Create a community of like-minded individuals who share a
//                   passion for the cosmos.
//                 </li>
//                 <li>
//                   Encourage participation in astronomical research and
//                   projects.
//                 </li>
//                 <li>
//                   Raise awareness of the beauty and significance of the night
//                   sky.
//                 </li>
//               </ul>
//               <br />
//               Whether you're an amateur astronomer or a curious learner, we hope
//               you find the information and resources on this site to be both
//               informative and entertaining.
//             </p>
//           </div>
//         </div>
//         <div className="m-auto lg:w-1/2 w-6/7">
//           <img
//             width="600px"
//             className=""
//             src="https://img.freepik.com/premium-photo/cute-rocket-space-illustrationcartoon-boy-flying-with-rocket-sky-background-vector_1016228-2723.jpg"
//             alt="Astronomy club activities"
//           />
//         </div>
//       </div>

//       {/* CTA Buttons */}
//       <div className="text-center">
//         <Link to="/blogs">
//           <Button className="m-3" variant="outline" colorScheme="linkedin">
//             Blogs
//           </Button>
//         </Link>
//         <Link to="/signup">
//           <Button className="m-3" variant="outline" colorScheme="linkedin">
//             <span className="">Get Started</span>
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Homepage;

// import { Button } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import Blogcard from "../components/Blogcard";
// import "./Homepage.css";
// import backgroundImage from './image.jpg';

// function Homepage(props) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get("https://aac-backend-25.onrender.com/blog/blogs").then((res) => {
//       let temp = res.data.data;
//       temp.reverse();
//       setData(temp);
//     });
//   }, []);

//   return (
//     <div className="text-white">
//       <div
//         className="bg-center bg-cover"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           minHeight: "85vh",
//         }}
//       >
//         <Navbar {...props} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />

//         <section className="flex flex-col items-center justify-center py-24 bg-gray-800 bg-opacity-70">
//           <h1
//             className="mb-4 font-extrabold tracking-widest text-center text-white text-7xl"
//             style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
//           >
//             Unite, Celebrate, Thrive
//           </h1>
//           <h2 className="tracking-widest text-white gradient-text">
//             Your Hostel Life, Your Story!
//           </h2>
//           <Link to="/login">
//             <Button
//               colorScheme="teal"
//               variant="outline"
//               borderColor="rgba(255, 255, 255, 0.5)"
//               color="white"
//               _hover={{
//                 bg: "rgba(255, 255, 255, 0.1)",
//                 color: "teal.300",
//                 boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
//               }}
//               _active={{
//                 bg: "rgba(255, 255, 255, 0.2)",
//                 color: "teal.400",
//               }}
//               _focus={{
//                 boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.5)",
//               }}
//               px={6}
//               py={3}
//               borderRadius="md"
//             >
//               Explore More
//             </Button>
//           </Link>
//         </section>
//       </div>
//       <div className="container px-4 mt-10">
//         <h2 className="mb-6 text-3xl font-bold text-center">Latest Blogs</h2>
//         {data === null ? (
//           <div className="text-center">
//             <h1 className="mt-32 mb-32 text-xl">Loading blogs...</h1>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             {data.slice(0, 3).map((blog, index) => (
//               <div key={index} className="m-1">
//                 <Blogcard data={blog} />
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="mt-8 text-center">
//           <Link to="/blogs">
//             <Button className="m-3" variant="outline" colorScheme="linkedin">
//               Read All Blogs
//             </Button>
//           </Link>
//         </div>
//       </div>
//       <div className="text-center">
//         <Link to="/signup">
//           <Button className="m-3" variant="outline" colorScheme="linkedin">
//             Get Started
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Homepage;


import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
//import Blogcard from "../components/Blogcard";
import "./Homepage.css";
import backgroundImage from './image.jpg';
import logo from "./logo.jpg"

function Homepage(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/blog/blogs").then((res) => {
      let temp = res.data.data;
      if(!temp || temp.length === 0) {
        setData([]);
      }else{
        temp.reverse();
        setData(temp);
      }
    });
  }, []);

  return (
    <div className="text-white">
      <div
        className="bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "90vh",
        }}
      >
        <Navbar {...props} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />

        <section className="flex flex-col items-center justify-center py-24 bg-gray-800 bg-opacity-70">
          <h1
            className="mb-4 font-extrabold tracking-widest text-center text-white text-7xl"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            Unite, Celebrate, Thrive
          </h1>
          <h2 className="tracking-widest text-white gradient-text">
            Your Hostel Life, Your Story!
          </h2>
          <Link to="/login">
            <Button
              colorScheme="teal"
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.5)"
              color="white"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                color: "teal.300",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
              }}
              _active={{
                bg: "rgba(255, 255, 255, 0.2)",
                color: "teal.400",
              }}
              _focus={{
                boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.5)",
              }}
              px={6}
              py={3}
              borderRadius="md"
            >
              Explore More
            </Button>
          </Link>
        </section>
      </div>

      {/* <div className="container px-4 mt-10">
        <h2 className="mb-6 text-3xl font-bold text-center">Latest Blogs</h2>
        {data === null ? (
          <div className="text-center">
            <h1 className="mt-32 mb-32 text-xl">Loading blogs...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.slice(0, 3).map((blog, index) => (
              <div key={index} className="m-1">
                <Blogcard data={blog} />
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link to="/blogs">
            <Button className="m-3" variant="outline" colorScheme="linkedin">
              Read All Blogs
            </Button>
          </Link>
        </div>
      </div> */}

      <div className="text-center bg-[#AEABB5]">
        <Link to="/signup">
          <Button className="m-3" variant="outline" colorScheme="linkedin">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
