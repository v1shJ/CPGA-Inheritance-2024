import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import HeatMapChart from "./HeatMap/HeatMapChart";
import CCRatingGraph from "./RatingGraphs/CCRatingGraph";
import CFRatingGraph from "./RatingGraphs/CFRatingGraph";
import LCRatingGraph from "./RatingGraphs/LCRatingGraph";
import CPStatsPieChart from "./PieChart";
import { Loader } from "./loader/loader.jsx";
import {
  ConvertCFData,
  CombineHeatMapData,
  ConvertLCData,
} from "./utils/modifyData";
import {
  useFetchCFData,
  useFetchCFData2,
  useFetchLCHeatMapData,
  useFetchLCContestData,
  useFetchCFUserInfo,
  useFetchCCData,
} from "./Api";

export default function Home() {
  // For everything related to CodeChef
  const [CCData, setCCData] = useState(null);
  useFetchCCData(setCCData);

  // For everything related to CodeForces
  const [CFData, setCFData] = useState(null); // For rating graph and number of contests
  useFetchCFData(setCFData);

  const [CFData2, setCFData2] = useState(null); // For heatmap data and number of solved problems
  useFetchCFData2(setCFData2);

  const [CFUserInfo, setCFUserInfo] = useState(null); // For user info like rank and rating
  useFetchCFUserInfo(setCFUserInfo);

  // For everything related to LeetCode
  const [LCData, setLCData] = useState(null); // For heatmap data !!!!!!! limitation of api calls !!!!!!!
  useFetchLCHeatMapData(setLCData);

  const [LCContestData, setLCContestData] = useState(null); // For rating graph and number of contests attended
  useFetchLCContestData(setLCContestData);

  // Ensure all data is fetched successfully

  // For changing platform on display
  const [platform, setPlatform] = useState("CodeChef");
  const handleChange = (e) => {
    setPlatform(e.target.value);
  };

  const allDataFetched =
    CCData && CFData && CFData2 && LCData && CFUserInfo && LCContestData;
  if (!allDataFetched) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader />
        <div className="text-lg text-white">If it is taking time, Refresh Page</div>
      </div>
    );
  }

  let CFConvertedData = {}; // For converting CFData2 to required format
  CFConvertedData = ConvertCFData(CFData2.result);
  const heatmapData = {
    CodeChef: CCData.heatMap,
    CodeForces: CFConvertedData.heatMapData,
    LeetCode: ConvertLCData(LCData.submissionCalendar),
  };

  const combinedheatMapData = CombineHeatMapData(
    heatmapData.CodeChef,
    heatmapData.CodeForces,
    heatmapData.LeetCode
  );

  const solvedCount = {
    CodeChef: 181,
    CodeForces: parseInt(CFConvertedData.solved),
    LeetCode: parseInt(LCData.totalSolved),
  };
  const totalSolved =
    solvedCount.CodeChef + solvedCount.CodeForces + solvedCount.LeetCode;

  const contestCount = {
    CodeChef: parseInt(CCData.ratingData.length),
    CodeForces: parseInt(CFData.result.length),
    LeetCode: parseInt(LCContestData.contestParticipation.length),
  };
  const totalContests =
    contestCount.CodeChef + contestCount.CodeForces + contestCount.LeetCode;

  const ratingData = {
    CodeChef: {
      current: CCData.currentRating,
      highest: CCData.highestRating,
    },
    CodeForces: {
      current: CFUserInfo.result[0].rating,
      highest: CFUserInfo.result[0].maxRating,
    },
    LeetCode: {
      current: parseInt(LCContestData.contestRating, 10),
      // "highest": parseInt(LCContestData.contestRating, 10)
    },
  };

  const rankData = {
    CodeChef: CCData.stars,
    CodeForces: CFUserInfo.result[0].rank,
    LeetCode: LCContestData.contestBadges.name,
  };

  const totalActiveDays = combinedheatMapData.length;

  return (
    <div>
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
      <div className="mt-2 main flex flex-col gap-8 items-center justify-cente bg-gradient-to-b from-black to-gray-800 ">
        <div className="w-11/12 rounded-lg flex flex-wrap items-center justify-center gap-4">
          <div className=" h-full min-h-48 flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="w-full md:w-52 min-w-52 h-full text-xl bg-gray-800 text-white flex flex-col items-center justify-center gap-4 border rounded-lg p-4">
                <div className="text-center">Total Problems</div>
                <div className="text-center">{totalSolved}</div>
              </div>
              <div className="w-full md:w-52 min-w-52 h-full text-xl bg-gray-800 text-white flex flex-col items-center justify-center gap-4 border rounded-lg p-4">
                <div className="text-center">Total Active Days</div>
                <div className="text-center">{totalActiveDays}</div>
              </div>
            </div>
          </div>
          <div
            className="h-36 sm:h-56 border bg-gray-800 rounded-lg"
            style={{ aspectRatio: "3" }}
          >
            <HeatMapChart heatMapData={combinedheatMapData} />
          </div>
        </div>

        <div className="w-11/12 rounded-lg flex flex-wrap items-center justify-center gap-4">
          <div
            className="h-48 sm:h-72 md:h-80 border bg-gray-700 rounded-lg flex items-center justify-center"
            style={{ aspectRatio: "2" }}
          >
            {platform === "CodeChef" && CCData && (
              <CCRatingGraph ratingData={CCData.ratingData} />
            )}
            {platform === "CodeForces" && CFData && (
              <CFRatingGraph ratingData={CFData.result} />
            )}
            {platform === "LeetCode" && LCContestData && (
              <LCRatingGraph
                contestParticipation={LCContestData.contestParticipation}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-full md:w-52 min-w-52 h-full text-xl bg-gray-800 text-white flex flex-col items-center justify-center gap-4 border rounded-lg p-4">
              {"Total Contests: " + totalContests}
            </div>
            <div
              className="h-48 md:h-52 border bg-gray-700 rounded-lg flex flex-col gap-2 items-center text-white justify-center"
              style={{ aspectRatio: "1" }}
            >
              <select
                className="p-2 border rounded-xl bg-gray-500"
                onChange={handleChange}
              >
                <option value="CodeChef">CodeChef</option>
                <option value="CodeForces">CodeForces</option>
                <option value="LeetCode">LeetCode</option>
              </select>
              <div>{"Number of Contests: " + contestCount[platform]}</div>
              <div>
                {
                  <div>
                    {"Rating: " +
                      ratingData[platform].current +
                      " (" +
                      ratingData[platform].highest +
                      ")"}
                  </div>
                }
                <div>{<div>{"Rank: " + rankData[platform]} </div>}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-7/12 flex flex-wrap items-center justify-center md:justify-start gap-4">
          <div className="border w-64 rounded-lg aspect-w-1 aspect-h-2  px-10 bg-gray-800">
            <CPStatsPieChart Count={solvedCount} Title={"Problems Solved"} />
          </div>
          <div className="border w-64 rounded-lg aspect-w-1 aspect-h-2  px-10 bg-gray-800">
            <CPStatsPieChart Count={contestCount} Title={"Contests Attended"} />
          </div>
        </div>
      </div>
    </div>
  );
}
