
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Blogcard from "../components/Blogcard";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

function Blogs(props) {
  //console.log("Blogs",props)
  const [data, setData] = useState([]);
  const [callCount, setCallCount] = useState(0);
  
  useEffect(() => {
    if (callCount === 0) {
      axios.get("http://localhost:5000/blog/blogs").then((res) => {
        setData(() => {
          let temp = res.data.data;
          temp.reverse();
          return temp;
        });
        setCallCount(1);
      });
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" bg-[#f1faee] min-h-screen">
      <Navbar {...props} />
      <h1 className="w-3/4 p-3 mx-auto mt-5 mb-5 text-2xl text-center text-white bg-gray-800 rounded-lg shadow-lg">
        VNIT EVENTS
      </h1>
      {data === null ? (
        <div className="text-center">
          <h1 className="mt-32 mb-32 text-xl text-center">
            <Spinner className="m-4" size="xl" />
            <br />
            <span className="">This may take time, Please Wait...</span>
          </h1>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center">
          <h1 className="mt-32 mb-32 text-xl text-center text-red-500">
            <span className="">NO RECORDS FOUND</span>
          </h1>
        </div>
      ) : (
        <div className="flex-wrap md:p-5 d-block flex-column justify-content-center">
          {data.map((blog, index) => {
            return (
              <div key={index} className="m-1">
                <Blogcard data={blog} token={props.token} setData={setData} setMessage={props.setMessage || (() => {})} isAdmin={props.user.isAdmin}/>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Blogs;
