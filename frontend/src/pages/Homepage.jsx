// =================================================================================================================

// import { Button } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// //import Blogcard from "../components/Blogcard";
// import "./Homepage.css";
// import backgroundImage from './image.jpg';
// import logo from "./logo.jpg"

// function Homepage(props) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/blog/blogs").then((res) => {
//       let temp = res.data.data;
//       if(!temp || temp.length === 0) {
//         setData([]);
//       }else{
//         temp.reverse();
//         setData(temp);
//       }
//     });
//   }, []);

//   return (
//     <div className="text-white">
//       <div
//         className="bg-center bg-cover"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           minHeight: "90vh",
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

//       {/* <div className="container px-4 mt-10">
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
//       </div> */}

//       <div className="text-center bg-[#AEABB5]">
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



// import { Button } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// //import Blogcard from "../components/Blogcard";
// import "./Homepage.css";
// import backgroundImage from './image.jpg';
// import logo from "./logo.jpg"

// function Homepage(props) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/blog/blogs").then((res) => {
//       let temp = res.data.data;
//       if(!temp || temp.length === 0) {
//         setData([]);
//       }else{
//         temp.reverse();
//         setData(temp);
//       }
//     });
//   }, []);

//   return (
//     <div className="text-white">
//       <div
//         className="bg-center bg-cover"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           minHeight: "90vh",
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

//       <div className="text-center bg-[#AEABB5]">
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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Homepage.css";
import backgroundImage from './image.jpg';

function Homepage(props) {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      {/* Hero Section */}
      <div className="relative">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: 'brightness(0.4)',
          }}
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-teal-900/30" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
           <Navbar {...props} />
          
          {/* Main Hero Content */}
          <div className="flex items-center justify-center flex-1 px-4">
            <div className="max-w-6xl mx-auto text-center">
              {/* Main Title */}
              <h1 
                className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 50px rgba(102, 126, 234, 0.3)',
                }}
              >
                Unite, Celebrate, Thrive
              </h1>
              
              {/* Subtitle */}
              <p 
                className={`text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 font-light tracking-wide transition-all duration-1000 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Your Life, Your Story!
              </p>
              
              {/* Description */}
              <p 
                className={`text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Transform your College experience with seamless event management. 
                Create memories, build connections, and make every moment count.
              </p>
              
              {/* CTA Buttons */}
              <div 
                className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <Link to="/login">
                  <Button
                    size="lg"
                    px={10}
                    py={6}
                    fontSize="xl"
                    fontWeight="bold"
                    borderRadius="full"
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    color="white"
                    border="2px solid transparent"
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
                      bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    }}
                    _active={{
                      transform: 'scale(0.98)',
                    }}
                    transition="all 0.3s ease"
                  >
                    Explore Events
                  </Button>
                </Link>
                
                <Link to="/signup">
                  <Button
                    size="lg"
                    px={10}
                    py={6}
                    fontSize="xl"
                    fontWeight="bold"
                    borderRadius="full"
                    variant="outline"
                    borderWidth="2px"
                    borderColor="white"
                    color="white"
                    bg="rgba(255, 255, 255, 0.1)"
                    _hover={{
                      bg: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)',
                    }}
                    _active={{
                      transform: 'scale(0.98)',
                    }}
                    transition="all 0.3s ease"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
            <div className="flex justify-center w-6 h-10 border-2 border-white rounded-full">
              <div className="w-1 h-3 mt-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-white md:text-5xl">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group">
              <div className="p-8 transition-all duration-500 border bg-gradient-to-br from-purple-800/50 to-pink-800/50 rounded-2xl backdrop-blur-sm border-purple-500/30 hover:border-purple-400/50 hover:scale-105 hover:shadow-2xl">
                <div className="mb-4 text-4xl text-center">🎉</div>
                <h3 className="mb-4 text-xl font-bold text-center text-white">Easy Event Creation</h3>
                <p className="text-center text-gray-300">
                  Create and manage events effortlessly with our intuitive interface. 
                  From small gatherings to large celebrations.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group">
              <div className="p-8 transition-all duration-500 border bg-gradient-to-br from-blue-800/50 to-teal-800/50 rounded-2xl backdrop-blur-sm border-blue-500/30 hover:border-blue-400/50 hover:scale-105 hover:shadow-2xl">
                <div className="mb-4 text-4xl text-center">🤝</div>
                <h3 className="mb-4 text-xl font-bold text-center text-white">Community Building</h3>
                <p className="text-center text-gray-300">
                  Connect with fellow Batch mates and build lasting friendships 
                  through shared experiences and activities.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group">
              <div className="p-8 transition-all duration-500 border bg-gradient-to-br from-green-800/50 to-yellow-800/50 rounded-2xl backdrop-blur-sm border-green-500/30 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl">
                <div className="mb-4 text-4xl text-center">📱</div>
                <h3 className="mb-4 text-xl font-bold text-center text-white">Smart Management</h3>
                <p className="text-center text-gray-300">
                  Advanced tools for registration, attendance tracking, and 
                  real-time updates keep everyone in the loop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div className="group">
              <div className="mb-2 text-4xl font-bold text-white transition-transform duration-300 md:text-5xl group-hover:scale-110">
                500+
              </div>
              <div className="text-lg text-gray-300">Events Created</div>
            </div>
            <div className="group">
              <div className="mb-2 text-4xl font-bold text-white transition-transform duration-300 md:text-5xl group-hover:scale-110">
                2K+
              </div>
              <div className="text-lg text-gray-300">Happy Students</div>
            </div>
            <div className="group">
              <div className="mb-2 text-4xl font-bold text-white transition-transform duration-300 md:text-5xl group-hover:scale-110">
                50+
              </div>
              <div className="text-lg text-gray-300">College Connected</div>
            </div>
            <div className="group">
              <div className="mb-2 text-4xl font-bold text-white transition-transform duration-300 md:text-5xl group-hover:scale-110">
                99%
              </div>
              <div className="text-lg text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Transform Your College Life?
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-300">
            Join thousands of students who are already creating unforgettable memories
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              px={12}
              py={6}
              fontSize="xl"
              fontWeight="bold"
              borderRadius="full"
              bg="linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)"
              color="white"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 20px 40px rgba(255, 107, 107, 0.4)',
              }}
              _active={{
                transform: 'scale(0.98)',
              }}
              transition="all 0.3s ease"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Homepage;