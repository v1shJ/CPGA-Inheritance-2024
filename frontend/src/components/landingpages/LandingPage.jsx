import React from "react";
import Image from "../../assets/LandingPageImage.png";
import { NavLink } from "react-router-dom"; 

export default function LandingPage() {
  return (
      <div id="home" className="landingPage h-screen p-2 bg-gradient-to-b from-black to-gray-800">
        <div className=" rounded-lg h-full flex justify-evenly items-center">
          <div className=" flex flex-col justify-evenly items-center w-full lg:w-3/5">
            <div
              id="title"
              className="flex flex-col justify-center gap-2 items-center text-center font-light text-5xl"
            >
             <span><h2 className="text-cyan-200">"Master Competitive Programming</h2></span> 
              <span><h2 className="text-cyan-200"> with Ease"</h2></span> 
              <span className="text-2xl text-cyan-100">Personalized Guidance, Daily Challenges, and Expert Insights – Your Ultimate Companion for CP Success.</span>
            </div>
            <NavLink to="/registe" className=" custom-btn mt-5 animate__animated animate__pulse animate__infinite">
              GET STARTED
            </NavLink>
          </div>
          <div className="text-center hidden lg:block">
            <img
              src={Image}
              alt="ANY IMAGE"
              className="filter rounded-lg brightness-50"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </div>
      </div>
  );
}
