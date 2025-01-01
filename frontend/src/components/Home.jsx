import React from "react";
import HomeNavbar from "./HomeNavbar";

export default function Home() {
  return (
    <div>
      <HomeNavbar />
      <div className="mt-2 main flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black to-gray-800 ">
        <div className="main1 min-h-48 border w-9/12 rounded-lg"></div>

        <div className="w-9/12 min-h-48 rounded-lg flex flex-wrap items-center justify-center lg:justify-between gap-4">
          <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg"></div>
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg"></div>
          </div>
          <div className=" w-full md:w-1/2 h-full min-h-48 border rounded-lg"></div>
        </div>

        <div className=" w-9/12 rounded-lg flex flex-wrap items-center justify-center lg:justify-between gap-4">
        <div className=" w-full md:w-1/2 h-full min-h-48 border rounded-lg"></div>
        <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg"></div>
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg"></div>
          </div>
        </div>

        <div className="w-9/12 min-h-48 rounded-lg flex flex-wrap items-center justify-center lg:justify-between gap-4">
            <div className="w-full md:w-5/12 h-full min-h-48 border rounded-lg"></div>
            <div className="w-full md:w-6/12 h-full min-h-48 border rounded-lg"></div>
        </div>

        <div className="main5 h-52 border w-9/12 rounded-lg"></div>
      </div>
    </div>
  );
}
