
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";
import Blogcard from "../components/Blogcard";

function Dashboard(props) {
  //console.log("DashBoard",props);
  const [message, setMessage] = useState(-1);
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Ensure data is always an array
  const [callCount, setCallCount] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (callCount === 0) {
      axios
        .get("http://localhost:5000/admin/pending", {
          params: {
            token: props.token,
          },
        })
        .then((res) => {
          // console.log(res);
          if (Array.isArray(res.data.data)) {
            setData(res.data.data);
          } else {
            setData([]); 
          }
          setCallCount(1);
        });
    }

    if (!props.user.isAdmin) {
      navigate("/login");
    }
  }, [callCount, props.token, props.user.isAdmin, navigate]); // Added dependencies

  useEffect(() => {
    setMessage(-1);
  }, [message]);

  useEffect(() => {
    // console.log("Data state:", data);
  }, [data]);

  return (
    <div className="blog-bg">
      <Navbar {...props} />
      <h1 className="text-center text-2xl bg-slate-200 mt-3 w-3/4 m-auto rounded p-4 ">
        Pending Approvals{" "}
      </h1>
      { !data ? (
        <div className="text-center">
          <h1 className="text-center text-xl mt-32 mb-32">
            <Spinner className="m-4" size="xl" />
            <br />
            <span className="">Loading . . . .</span>
          </h1>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center">
          <h1 className="text-center text-xl mt-32 mb-32">
            <span className="">NO RECORDS FOUND</span>
          </h1>
        </div>
      ) : (
        <div className="d-block flex-column justify-content-center flex-wrap">
          {data.map((blog, index) => {
            return (
              <div key={index} className="m-3">
                <Blogcard
                  data={blog}
                  setData={setData}
                  setMessage={setMessage}
                  token={props.token}
                  isAdmin={props.user.isAdmin}
                />
              </div>
            );
          })}
        </div>
      )}
      {message === 0
        ? toast({
            title: "Some Error Occurred",
            description: "Please Try Again",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        : message === 1
        ? toast({
            title: "Approved Successfully",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        : message === 2
        ? toast({
            title: "Rejected",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        : message === 3
        ? toast({
            title: "Deleted Successfully",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        : ""}
    </div>
  );
}

export default Dashboard;
