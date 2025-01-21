import React from "react";

function Footer() {
  return (
    <div className="footer">
    <footer className="text-sm footer mt-0  bg-black text-light text-left  pb-3 sticky top-[100vh]">
      <div className="flex flex-column md:flex-row p-10 md:p-12">
        <div className="w-full md:w-2/3">
          <h4 className="text-warning text-xl inline">Our Location</h4>
          <p className="mt-3">V.G. Bhide</p>
          <p className=" ">
            Visvesvaraya National Institute of Technology,
            <br /> South Ambazari Road, Nagpur, Maharashtra. Pin 440010 (India)
          </p>
          <p className="mt-2">
            <span className="text-sky-300">Email: </span>{" "}
            saiakshay@gmail.com
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-3 md:mt-0">
          <h4 className="text-warning text-xl">Contact Us</h4>

          <p className="mt-3">Sai Akshay</p>
          <p className="">
            Phone : <span className="text-sky-300"> 879xx 45767</span>
          </p>
          <p className="mt-2">Prasanna Adnaik</p>
          <p className="">
            Phone : <span className="text-sky-300"> 787xx 01375</span>
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-3 md:mt-0">
          <div className="">
            <h4 className="text-warning text-xl">About V.G. Bhide</h4>
            <p className="mt-3">
              We are the residents of this Hostel, where we try to
              explore the horizons with the aid of our Engineering and Managing
              skills
            </p>
          </div>

          <a href="https://www.linkedin.com/company/ashlesha-astronomy-club-vnit/">
            <i className="fab fa-linkedin m-2 big hover:text-blue-600"></i>
          </a>
          <a href="https://www.instagram.com/aac_vnit/">
            <i className="fab fa-instagram  m-2 big hover:text-red-400"></i>
          </a>

          <i className="fab fa-twitter m-2 big hover:text-blue-400"></i>
        </div>
      </div>
      <div className="text-center text-warning  text-sm">
        COPYRIGHT ©-V.G. Bhide ,VNIT NAGPUR
 
      </div>
    </footer>
    </div>
  );
}

export default Footer;