import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import CCRatingGraph from "./RatingGraphs/CCRatingGraph";
import useFetchCCData from "./CCApi/FetchCCData";
import useFetchCFData from "./CFApi/FetchCFData";
import useFetchCFData2 from "./CFApi/FetchCFData2";
import useFetchLCData from "./LCApi/FetchLCData";
import CFRatingGraph from "./RatingGraphs/CFRatingGraph";
import HeatMapChart from "./HeatMap/HeatMapChart";
import { combineHeatMapData } from "./HeatMap/combineHeatMapData";
import { convertCFData } from "./HeatMap/convertCFData";

export default function Home() {
  const [CCData, setCCData] = useState(null);
  useFetchCCData(setCCData);

  const [CFData, setCFData] = useState(null);
  useFetchCFData(setCFData);

  const [LCData, setLCData] = useState(null);
  useFetchLCData(setLCData);

  if(LCData)
  console.log(LCData);

  //For heat map
  const [CFData2, setCFData2] = useState(null);
  useFetchCFData2(setCFData2);

  // For changing rating graph
  const [platform, setPlatform] = useState("CC");
  const handleChange = (e) => {
    setPlatform(e.target.value);
  };
  

  let CFConvertedData = {};
  let CCHeatMapData = [];
  let CFHeatMapData = [];
  let heatMapData = [];
  let CFSolvedCount = 0;

  if (CCData && CFData2) {
    CCHeatMapData = CCData.heatMap;
    CFConvertedData = convertCFData(CFData2.result);
    CFHeatMapData = CFConvertedData.heatMapData;
    CFSolvedCount = CFConvertedData.solved;
    heatMapData = combineHeatMapData(CCHeatMapData, CFHeatMapData);
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
      <div className="mt-2 main flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black to-gray-800 ">
        <div className="w-11/12 rounded-lg flex flex-wrap items-center justify-center gap-4">
          <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
          <div className="w-full md:w-52 min-w-52 h-full text-xl bg-gray-800 text-white flex flex-col items-center justify-center gap-4 border rounded-lg p-4">
              <div className="text-center">Total Problems</div>
              <div className="text-center">{CFSolvedCount}</div>
            </div>
            <div className="w-full md:w-52 min-w-52 h-full text-xl bg-gray-800 text-white flex flex-col items-center justify-center gap-4 border rounded-lg p-4">
              <div className="text-center">Total Active Days</div>
              <div className="text-center">{heatMapData.length}</div>
            </div>
          </div>
          <div className="h-36 sm:h-52 border bg-gray-800 rounded-lg"
           style={{ aspectRatio: "3" }}
          >
          {heatMapData.length>0 && <HeatMapChart heatMapData={heatMapData} />}</div>
        </div>
{/* 
        <div className=" w-9/12 rounded-lg flex flex-wrap items-center justify-center lg:justify-between gap-4">
          <div className=" w-full md:w-1/2 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
          <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
            <div className="w-full md:w-52 min-w-52 h-full min-h-48 border rounded-lg aspect-w-1 aspect-h-2"></div>
          </div>
        </div> */}

        <div className="w-11/12 rounded-lg flex flex-wrap items-center justify-center gap-4">
          <div
            className="h-48 md:h-52 border bg-gray-700 rounded-lg flex flex-col gap-2 items-center text-white justify-center"
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
