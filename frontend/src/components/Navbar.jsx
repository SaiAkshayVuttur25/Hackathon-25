

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useToast } from "@chakra-ui/react";
import logo from "../pages/logo.jpg";

function Navbar(props) {
  const cookies = new Cookies();
  const [message, setMessage] = useState(-1);
  const [navbar, setNavbar] = useState(false);
  //console.log("Navbar",props);

  useEffect(() => {
    setMessage(-1);
  }, [message]);

  const toast = useToast();

  function logout() {
    cookies.remove("authToken");
    setMessage(1);
    props.setLogin(false);
    props.setUser({ isAdmin: false });
    props.setToken("");
  }

  return (
    <nav className="p-1 text-white bg-gray-700 shadow mont">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-0">
        <div>
          <div className="flex items-center justify-between md:block">
            <img
              className="inline w-16 rounded-full"
              src={logo}
              alt="Astronomy logo"
            />
            <span className="px-2 text-sm text-white md:text-lg">
              VNIT NAGPUR
            </span>

            <div className="md:hidden">
              <button
                className="p-2 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 text-center md:flex md:space-x-6 md:space-y-0">
              <Link to="/">
                <li className="mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                  Home
                </li>
              </Link>
              <Link to="/blogs">
                <li className="mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                  Events
                </li>
              </Link>
              <Link to="/resources">
                <li className="mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                  Calender
                </li>
              </Link>

              {props.isLogin && props.user.isAdmin === true ? (
                <Link to="/dashboard">
                  <li className="mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                    Approvals
                  </li>
                </Link>
              ) : null}

              {props.isLogin ? (
                <>
                  { (
                    <>
                      <Link to="/addblog">
                        <li className="mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                          Add Proposals
                        </li>
                      </Link>
                      
                    </>
                  )}
                  <Link to="">
                    <li
                      onClick={logout}
                      className="mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600"
                    >
                      Log Out
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <li className="flex justify-center mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                      Sign Up
                    </li>
                  </Link>
                  <Link to="/login">
                    <li className="flex justify-center mb-3 text-lg text-white hover:cursor-pointer md:my-auto hover:text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="my-auto bi bi-lock me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                      </svg>
                      Login
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {message === 1
        ? toast({
            title: "Logged Out Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        : ""}
    </nav>
  );
}

export default Navbar;


// ===============================================================================
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { useToast } from "@chakra-ui/react";
// import logo from "../pages/logo.jpg";

// function Navbar(props) {
//   const cookies = new Cookies();
//   const [message, setMessage] = useState(-1);
//   const [navbar, setNavbar] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     setMessage(-1);
//   }, [message]);

//   // Add scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 20;
//       setScrolled(isScrolled);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toast = useToast();

//   function logout() {
//     cookies.remove("authToken");
//     setMessage(1);
//     props.setLogin(false);
//     props.setUser({ isAdmin: false });
//     props.setToken("");
//   }

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled 
//           ? 'bg-black/80 backdrop-blur-md shadow-2xl border-b border-white/10' 
//           : 'bg-transparent'
//       }`}>
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20">
            
//             {/* Logo Section */}
//             <div className="flex items-center space-x-3 group">
//               <div className="relative">
//                 <img
//                   className="w-12 h-12 transition-all duration-300 rounded-full md:w-14 md:h-14 ring-2 ring-purple-500/50 group-hover:ring-purple-400/80 group-hover:scale-105"
//                   src={logo}
//                   alt="VNIT Nagpur logo"
//                 />
//                 <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:opacity-100"></div>
//               </div>
//               <div className="hidden sm:block">
//                 <h1 className="text-lg font-bold text-transparent md:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
//                   VNIT NAGPUR
//                 </h1>
//                 <p className="-mt-1 text-xs text-gray-400">Event Hub</p>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:block">
//               <ul className="flex items-center space-x-8">
//                 <Link to="/">
//                   <li className="relative group">
//                     <span className="font-medium text-white transition-colors duration-300 hover:text-purple-400">
//                       Home
//                     </span>
//                     <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
//                   </li>
//                 </Link>
                
//                 <Link to="/blogs">
//                   <li className="relative group">
//                     <span className="font-medium text-white transition-colors duration-300 hover:text-purple-400">
//                       Events
//                     </span>
//                     <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
//                   </li>
//                 </Link>
                
//                 <Link to="/resources">
//                   <li className="relative group">
//                     <span className="font-medium text-white transition-colors duration-300 hover:text-purple-400">
//                       Calendar
//                     </span>
//                     <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
//                   </li>
//                 </Link>

//                 {props.isLogin && props.user.isAdmin === true && (
//                   <Link to="/dashboard">
//                     <li className="relative group">
//                       <span className="flex items-center font-medium text-white transition-colors duration-300 hover:text-purple-400">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         Approvals
//                       </span>
//                       <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
//                     </li>
//                   </Link>
//                 )}

//                 {props.isLogin ? (
//                   <>
//                     <Link to="/addblog">
//                       <li className="relative group">
//                         <span className="flex items-center font-medium text-white transition-colors duration-300 hover:text-purple-400">
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                           </svg>
//                           Add Proposals
//                         </span>
//                         <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
//                       </li>
//                     </Link>
                    
//                     <li 
//                       onClick={logout}
//                       className="cursor-pointer"
//                     >
//                       <span className="inline-flex items-center px-4 py-2 font-medium text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                         </svg>
//                         Logout
//                       </span>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/signup">
//                       <li>
//                         <span className="inline-flex items-center px-4 py-2 font-medium text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105">
//                           Sign Up
//                         </span>
//                       </li>
//                     </Link>
                    
//                     <Link to="/login">
//                       <li>
//                         <span className="inline-flex items-center px-4 py-2 font-medium text-white transition-all duration-300 transform border rounded-full border-purple-500/50 hover:border-purple-400 hover:scale-105 backdrop-blur-sm">
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                           </svg>
//                           Login
//                         </span>
//                       </li>
//                     </Link>
//                   </>
//                 )}
//               </ul>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setNavbar(!navbar)}
//                 className="relative w-10 h-10 text-white focus:outline-none"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <div className="absolute block w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
//                   <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
//                     navbar ? 'rotate-45' : '-translate-y-1.5'
//                   }`}></span>
//                   <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
//                     navbar ? 'opacity-0' : ''
//                   }`}></span>
//                   <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
//                     navbar ? '-rotate-45' : 'translate-y-1.5'
//                   }`}></span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div className={`md:hidden transition-all duration-300 ease-in-out ${
//           navbar 
//             ? 'max-h-96 opacity-100' 
//             : 'max-h-0 opacity-0'
//         } overflow-hidden`}>
//           <div className="px-2 pt-2 pb-3 space-y-1 border-t bg-black/90 backdrop-blur-md border-white/10">
//             <Link to="/" onClick={() => setNavbar(false)}>
//               <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                 Home
//               </div>
//             </Link>
            
//             <Link to="/blogs" onClick={() => setNavbar(false)}>
//               <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                 Events
//               </div>
//             </Link>
            
//             <Link to="/resources" onClick={() => setNavbar(false)}>
//               <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                 Calendar
//               </div>
//             </Link>

//             {props.isLogin && props.user.isAdmin === true && (
//               <Link to="/dashboard" onClick={() => setNavbar(false)}>
//                 <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                   Approvals
//                 </div>
//               </Link>
//             )}

//             {props.isLogin ? (
//               <>
//                 <Link to="/addblog" onClick={() => setNavbar(false)}>
//                   <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                     Add Proposals
//                   </div>
//                 </Link>
                
//                 <div 
//                   onClick={() => {
//                     logout();
//                     setNavbar(false);
//                   }}
//                   className="block px-3 py-2 text-red-400 transition-all duration-300 rounded-md cursor-pointer hover:text-red-300 hover:bg-red-500/10"
//                 >
//                   Logout
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link to="/signup" onClick={() => setNavbar(false)}>
//                   <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                     Sign Up
//                   </div>
//                 </Link>
                
//                 <Link to="/login" onClick={() => setNavbar(false)}>
//                   <div className="block px-3 py-2 text-white transition-all duration-300 rounded-md hover:text-purple-400 hover:bg-white/5">
//                     Login
//                   </div>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Toast notification */}
//       {message === 1 && toast({
//         title: "Logged Out Successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       })}
//     </>
//   );
// }

// export default Navbar;