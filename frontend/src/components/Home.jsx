import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import CCRatingGraph from "./CCRatingGraph";
import useFetchCCData from "./FetchCCData";
import useFetchCFData from "./FetchCFData";
import CFRatingGraph from "./CFRatingGraph";

export default function Home() {
  const [CCData, setCCData] = useState(null);
  useFetchCCData(setCCData);

  const [CFData, setCFData] = useState(null);
  useFetchCFData(setCFData);

  const [platform, setPlatform] = useState("CC");

  const handleChange = (e) => {
    setPlatform(e.target.value);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
      <div className="mt-2 main flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black to-gray-800 ">
        {/* <div className="w-9/12 min-h-48 rounded-lg flex flex-wrap items-center justify-center lg:justify-between gap-4">
          <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
          </div>
          <div className=" w-full md:w-1/2 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
        </div>

        <div className=" w-9/12 rounded-lg flex flex-wrap items-center justify-center lg:justify-between gap-4">
          <div className=" w-full md:w-1/2 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
          <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
          </div>
        </div> */}

        <div className="w-11/12 rounded-lg flex flex-wrap items-center justify-center gap-4">
          <div
            className="h-48 sm:h-72 md:h-80 border bg-gray-700 rounded-lg flex flex-col gap-2 items-center text-white justify-center"
            style={{ aspectRatio: "1" }}
          >
            <select
              className="p-2 border rounded-xl bg-gray-500"
              onChange={handleChange}
            >
              <option value="CC">CodeChef</option>
              <option value="CF">CodeForces</option>
            </select>
            <div>
              {platform === "CC" && CCData && (
                <div>{"Number of Contests: " + CCData.ratingData.length} </div>
              )}
              {platform === "CF" && CFData && (
                <div>{"Number of Contests: " + CFData.result.length} </div>
              )}
            </div>
            <div>
              {platform === "CC" && CCData && (
                <div>{"Rating: " + CCData.ratingData[CCData.ratingData.length - 1].rating} </div>
              )}
              {platform === "CF" && CFData && (
                <div>{"Rating: " + CFData.result[CFData.result.length - 1].newRating} </div>
              )}
            </div>
          </div>
          <div
            className="h-48 sm:h-72 md:h-80 border bg-gray-700 rounded-lg flex items-center justify-center"
            style={{ aspectRatio: "2" }}
          >
            {platform === "CC" && CCData && (
              <CCRatingGraph ratingData={CCData.ratingData} />
            )}
            {platform === "CF" && CFData && (
              <CFRatingGraph ratingData={CFData.result} />
            )}
          </div>
        </div>

        {/* <div className="h-52 border w-9/12 rounded-lg aspect-w-1 aspect-h-2"></div> */}
      </div>
    </div>
  );
}
