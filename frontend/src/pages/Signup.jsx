

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Tooltip, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Signup.css";

function Signup(props) {
  const cookies = new Cookies();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [message, setMessage] = useState(-1);
  const [submit, setSubmit] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "cpassword":
        setCpassword(value);
        break;
      case "enrollment":
        setEnrollment(value);
        break;
      case "name":
        setName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !password || !cpassword || !enrollment) {
      setMessage(2);
      return;
    }
    if (password !== cpassword) {
      setMessage(3);
      return;
    }
    setSubmit(true);
    axios
      .post("http://localhost:5000/user/register", {
        name,
        username,
        enrollment,
        password,
      })
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.isLoggedin) {
          props.setLogin(true);
          props.setUser (res.data.user);
          cookies.set("authToken", res.data.token, {
            path: "/",
            maxAge: 5 * 60 * 60 * 1000,
            secure: true,
          });
          props.setToken(res.data.token);
        }
        setSubmit(false);
        if (res.data.message === 1) {
          inputClear();
        }
      })
      .catch(() => {
        setMessage(0); // Handle error
        setSubmit(false);
      });
  };

  const inputClear = () => {
    setName("");
    setUsername("");
    setPassword("");
    setCpassword("");
    setEnrollment("");
  };

  useEffect(() => {
    if (props.isLogin) {
      navigate("/addblog");
    }
  }, [props.isLogin, navigate]);

  useEffect(() => {
    if (message !== -1) {
      showToast();
      setMessage(-1);
    }
  }, [message]);

  const showToast = () => {
    const toastOptions = {
      0: {
        title: "Some Error Occurred",
        description: "Please try again later.",
        status: "error",
      },
      1: {
        title: "Account Created Successfully",
        description: "",
        status: "success",
      },
      2: {
        title: "Fields Can't Be Empty",
        description: "Please fill all the fields.",
        status: "warning",
      },
      3: {
        title: "Passwords Don't Match",
        description: "",
        status: "warning",
      },
      4: {
        title: "Username Already Exists",
        description: "",
        status: "error",
      },
    };

    if (toastOptions[message]) {
      toast({
        ...toastOptions[message],
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#edf2f4] relative flex flex-col justify-center overflow-hidden">
      <Navbar {...props} />
      <div className="my-12 w-5/6 lg:w-5/12 p-6 m-auto bg-white rounded-md shadow-xl border">
        <h1 className="text-xl text-center text-black">
          <span className="">SIGN UP</span>
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-3 relative">
            <input
              id="name"
              type="text"
              placeholder=""
              onChange={handleChange}
              className="input-field"
              value={name}
            />
            <label htmlFor="name" className="labelline">
              Name <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mb-3 relative">
            <input
              id="enrollment"
              type="text"
              placeholder=""
              onChange={handleChange}
              className="input-field"
              value={enrollment}
            />
            <label htmlFor="enrollment" className="labelline">
              Enrollment Number <span className="text-red-500">*</span>
            </label>
          </div>
          <Tooltip hasArrow label="Keep It Complex. IMPORTANT !!" bg="red.600">
            <div className="mb-3 relative">
              <input
                id="username"
                type="email"
                placeholder=""
                onChange={handleChange}
                className="input-field"
                value={username}
              />
              <label htmlFor="username" className="labelline">
                Email <span className="text-red-500">*</span>
              </label>
            </div>
          </Tooltip>
          <div className="mb-3 relative">
            <input
              id="password"
              type="password"
              placeholder=""
              onChange={handleChange}
              className="input-field"
              value={password}
            />
            <label htmlFor="password" className="labelline">
              Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mb-3 relative">
            <input
              id="cpassword"
              type="password"
              placeholder=""
              onChange={handleChange}
              className="input-field"
              value={cpassword}
            />
            <label htmlFor="cpassword" className="labelline">
              Confirm Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mt-6 mb-5">
            <Button
              type="submit"
              isLoading={submit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-green-600"
            >
              Sign Up
            </Button>
            {submit && (
              <p className="text-center text-md mt-3">
                This may take time. Please Wait...
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup; 
