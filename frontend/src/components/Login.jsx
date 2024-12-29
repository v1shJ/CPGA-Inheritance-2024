import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 flex flex-col items-center shadow-2xl w-full h-full  bg-gradient-to-b from-black to-gray-800 justify-center">
        <form className="flex flex-col items-center gap-4 p-4 border rounded-2xl w-4/5 md:w-3/5">
          <p className="text-center text-[#64ffda] text-4xl">Login</p>

          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              required
              placeholder="Username"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="text"
              name="username"
            />
          </div>
          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-lock text-[#64ffda]"></i>
            <input
              placeholder="Paasword"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="password"
              name="password"
            />
          </div>
          <div className="flex items-center justify-evenly w-full max-w-md">
            <button className="cursor-pointer py-3 px-6 rounded-xl border border-[#64ffda] text-[#64ffda] font-bold transition-all duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-inner">
              Login
            </button>
            <div className="flex flex-col">
              <p className="text-white">Don't have an account?</p>
              <Link to="/register" className="text-[#64ffda] hover:text-neutral-200">
                Register
              </Link>
            </div>
          </div>
            <Link to="/" className="text-zinc-500">Forgot Password</Link>
        </form>
        <Link to="/" className="custom-btn mt-4">Home</Link>
      </div>
    </div>
  );
};

export default Login;
