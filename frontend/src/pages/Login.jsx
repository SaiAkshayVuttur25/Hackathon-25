
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Signup.css";

function Login(props) {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // m stands for modal for forgot password
  const [musername, setmUsername] = useState("");
  const [mpassword, setmPassword] = useState("");
  const [menrollment, setmEnrollment] = useState("");
  const [message, setMessage] = useState(-1);

  const [submit, setSubmit] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  function handleChange(e) {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "menrollment":
        setmEnrollment(e.target.value);
        break;
      case "musername":
        setmUsername(e.target.value);
        break;
      case "mpassword":
        setmPassword(e.target.value);
        break;
      default:
        break;
    }
  }
  function inputClear() {
    document.getElementById("menrollment").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("musername").value = "";
    document.getElementById("mpassword").value = "";

    setmEnrollment("");
    setUsername("");
    setPassword("");
    setmUsername("");
    setmPassword("");
  }

  // function handleSubmit() {
  //   if (username === "" || password === "") {
  //     setMessage(2);
  //     return;
  //   }
  //   setSubmit(true);
  //   axios
  //     .post("http://localhost:5000/user/login", {
  //       username: username,
  //       password: password,
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${res.data.token}`,  // Send token in headers
  //       },
  //       withCredentials: true, // Include credentials (cookies)
  //     })
  //     .then((res) => {
  //       setMessage(res.data.message);
  //       if (res.data.isLoggedin === true) {
  //         props.setLogin(true);
  //         props.setUser(res.data.user);
  //         cookies.set("authToken", res.data.token, {
  //           path: "/",
  //           maxAge: 5 * 60 * 60 ,
  //            secure: false,
  //         });
  //         props.setToken(res.data.token);
  //       }
  //       setSubmit(false);
  //       if (res.data.message === 1) {
  //         inputClear();
  //       }
  //     });
  // }
  function handleSubmit() {
    if (username === "" || password === "") {
      setMessage(2);
      return;
    }
    setSubmit(true);
    axios
      .post("http://localhost:5000/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.isLoggedin === true) {
          props.setLogin(true);
          props.setUser(res.data.user);
          cookies.set("authToken", res.data.token, {
            path: "/",
            maxAge: 5 * 60 * 60,
            secure: false,
          });
          props.setToken(res.data.token);
        }
        setSubmit(false);
        if (res.data.message === 1) {
          inputClear();
        }
      })
      .catch((err) => {
        console.error("Error logging in:", err);
        setSubmit(false);
      });
  }
  

  function handleReset() {
    if (musername === "" || mpassword === "" || menrollment === "") {
      setMessage(2);
      return;
    }
    setSubmit(true);
    axios
      .post("http://localhost:5000/user/resetPassword", {
        username: musername,
        enrollment: menrollment,
        password: mpassword,
      })
      .then((res) => {
        setMessage(res.data.message);
        setSubmit(false);
        if (res.data.message === 4) {
          inputClear();
        }
      });
  }

  useEffect(() => {
    if (props.isLogin === true) {
      navigate("/addblog");
    }
  });
  useEffect(() => {
    setMessage(-1);
  }, [message]);

  return (
    <div className="bg-[#edf2f4] relative flex flex-col justify-center overflow-hidden">
      <Navbar {...props} />
      <div className="my-10 w-5/6 lg:w-5/12 p-6 m-auto bg-white rounded-md shadow-xl border h-full">
        <h1 className="text-xl text-center text-black  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-person-fill-lock m-auto mb-4"
            viewBox="0 0 16 16"
          >
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5v-1a1.9 1.9 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
          </svg>
          <span className="">LOG IN</span>
        </h1>
        <form className="mt-6">
          <div className="mb-3 relative">
            <input
              id="username"
              onChange={handleChange}
              type="email"
              placeholder=""
              className="input-field"
            />
            <label htmlFor="email" className="labelline">
              username <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mb-3 relative">
            <input
              id="password"
              onChange={handleChange}
              placeholder=""
              type="password"
              className="input-field"
            />
            <label htmlFor="password" className="labelline">
              Password <span className="text-red-500">*</span>
            </label>
          </div>
          <span
            className="hover:cursor-pointer text-blue-500 mt-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Forgot Password ?
          </span>
          <div className="mt-8 mb-6">
            <Button
              onClick={handleSubmit}
              isLoading={submit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-green-600 "
            >
              Login
            </Button>
            {submit ? (
              <p className="text-center text-md mt-3">
                This may take time. Please Wait...
              </p>
            ) : (
              ""
            )}
          </div>
          {message === 0
            ? toast({
                title: "Invalid Credentials",
                description: "Please Try Again",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            : message === 1
            ? toast({
                title: "Log In Successfull",
                description: "",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
            : message === 2
            ? toast({
                title: "Fields cant be empty",
                description: "Please fill all the fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
              })
            : message === 3
            ? toast({
                title: "Some Error Occured",
                description: "Please Try Again",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            : message === 4
            ? toast({
                title: "Password Updated",
                description: "",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
            : ""}
        </form>
      </div>

      {/* Forgot Password Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">
                Reset Password
              </h1>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="email" className="block text-sm  text-gray-800">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="musername"
                  onChange={handleChange}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="enrollment number"
                  className="block text-sm  text-gray-800"
                >
                  Enrollment Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="menrollment"
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm  text-gray-800"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="mpassword"
                  onChange={handleChange}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:ring-stone-800 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button className="" data-bs-dismiss="modal">
                Close
              </Button>
              <Button
                onClick={handleReset}
                isLoading={submit}
                className=""
                colorScheme="red"
              >
                {" "}
                Reset{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

