import React from "react";

function Footer() {
  return (
    <div className="footer">
    <footer className="text-sm footer mt-0  bg-black text-light text-left  pb-3 sticky top-[100vh]">
      <div className="flex p-10 flex-column md:flex-row md:p-12">
        <div className="w-full md:w-2/3">
          <h4 className="inline text-xl text-warning">Our Location</h4>
          <p className="mt-3">V.G. Bhide</p>
          <p className="">
            Visvesvaraya National Institute of Technology,
            <br /> South Ambazari Road, Nagpur, Maharashtra. Pin 440010 (India)
          </p>
          <p className="mt-2">
            <span className="text-sky-300">Email: </span>{" "}
            saiakshay@gmail.com
          </p>
        </div>
        <div className="w-full mt-3 md:w-1/3 md:mt-0">
          <h4 className="text-xl text-warning">Contact Us</h4>

          <p className="mt-3">Sai Akshay</p>
          <p className="">
            Phone : <span className="text-sky-300"> 879xx 45767</span>
          </p>
        </div>

        <div className="w-full mt-3 md:w-1/2 md:mt-0">
          <div className="">
            <h4 className="text-xl text-warning">About V.G. Bhide</h4>
            <p className="mt-3">
              We are the residents of this Hostel, where we try to
              explore the horizons with the aid of our Engineering and Managing
              skills
            </p>
          </div>

          <a href="https://www.linkedin.com/company/ashlesha-astronomy-club-vnit/">
            <i className="m-2 fab fa-linkedin big hover:text-blue-600"></i>
          </a>
          <a href="https://www.instagram.com/aac_vnit/">
            <i className="m-2 fab fa-instagram big hover:text-red-400"></i>
          </a>

          <i className="m-2 fab fa-twitter big hover:text-blue-400"></i>
        </div>
      </div>
      <div className="text-sm text-center text-warning">
        COPYRIGHT ©-V.G. Bhide ,VNIT NAGPUR
 
      </div>
    </footer>
    </div>
  );
}

export default Footer;