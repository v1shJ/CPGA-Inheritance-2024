import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import HeatMapChart from "./HeatMap/HeatMapChart";
import CCRatingGraph from "./RatingGraphs/CCRatingGraph";
import CFRatingGraph from "./RatingGraphs/CFRatingGraph";
import LCRatingGraph from "./RatingGraphs/LCRatingGraph";
import CPStatsPieChart from "./PieChart";
import { Loader } from "./loader/loader.jsx";
import useFetchWithLocalStorage from "./FetchWithLocalStorage.jsx";
import {
  ConvertCFData,
  CombineHeatMapData,
  ConvertLCData,
} from "./utils/modifyData";
import { FetchData, fetchCodeChefData } from "./Api";

export default function Home() {


  const [CCData, setCCData] = useState(null);
  const [CFData, setCFData] = useState(null);
  const [CFData2, setCFData2] = useState(null);
  const [CFUserInfo, setCFUserInfo] = useState(null);
  const [LCData, setLCData] = useState(null);
  const [LCContestData, setLCContestData] = useState(null);
  const [CCProblemsSolved, setCCProblemsSolved] = useState(null);
  const { id } = useParams();
  const [userHandle, setUserHandle] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserHandle(JSON.parse(user));
    }
  }, []);
  // Replace with your fetch functions
  const fetchData = FetchData;
  let specialRefresh = false;

  const fetchCCData = useFetchWithLocalStorage("CCData", fetchData, setCCData, specialRefresh);
  const fetchCCSolved = useFetchWithLocalStorage(
    "CCSolved",
    fetchData,
    setCCProblemsSolved,
    specialRefresh
  );
  const fetchCFData = useFetchWithLocalStorage("CFData", fetchData, setCFData, specialRefresh);
  const fetchCFData2 = useFetchWithLocalStorage(
    "CFData2",
    fetchData,
    setCFData2,
    specialRefresh
  );
  const fetchCFUserInfo = useFetchWithLocalStorage(
    "CFUserInfo",
    fetchData,
    setCFUserInfo,
    specialRefresh
  );
  const fetchLCData = useFetchWithLocalStorage("LCData", fetchData, setLCData, specialRefresh);
  const fetchLCContestData = useFetchWithLocalStorage(
    "LCContestData",
    fetchData,
    setLCContestData,
    specialRefresh
  );
  
  
    const platforms = [
      {
        name: "LeetCode",
        faviconUrl: "https://leetcode.com/favicon.ico",
        link: userHandle?.platformIds?.[0]?.LeetCode 
          ? `https://leetcode.com/u/${userHandle.platformIds[0].LeetCode}` 
          : "#",
      },
      {
        name: "CodeChef",
        faviconUrl: "https://www.codechef.com/favicon.ico",
        link: userHandle?.platformIds?.[0]?.CodeChef 
          ? `https://www.codechef.com/users/${userHandle.platformIds[0].CodeChef}` 
          : "#",
      },
      {
        name: "CodeForces",
        faviconUrl: "https://codolio.com/icons/codeforces.png",
        link: userHandle?.platformIds?.[0]?.Codeforces 
          ? `https://codeforces.com/profile/${userHandle.platformIds[0].Codeforces}` 
          : "#",
      },
    ];

  // Handle button click for refreshing data
  const handleRefresh = (platform) => {
    console.log("Refreshing data for", platform);

    if (platform === "CodeChef") {
      fetchCCData(true); // Refresh CodeChef data
      fetchCCSolved(true); // Refresh CodeChef solved problems
    } else if (platform === "CodeForces") {
      fetchCFData(true); // Refresh CodeForces data
      fetchCFData2(true); // Refresh CodeForces data2
      fetchCFUserInfo(true); // Refresh CodeForces user info
    } else if (platform === "LeetCode") {
      fetchLCData(true); // Refresh LeetCode data
      fetchLCContestData(true); // Refresh LeetCode contest data
    }
    // specialRefresh = false;
  };
  
  // For changing platform on display
  const [platform, setPlatform] = useState("CodeChef");
  const handleChange = (e) => {
    setPlatform(e.target.value);
  };

  console.log(CCData, CFData, CFData2, LCData, CFUserInfo, LCContestData);

  const allDataFetched =
    CCData && CFData && CFData2 && LCData && CFUserInfo && LCContestData && CCProblemsSolved && userHandle;
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 3000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!allDataFetched && !timeoutReached) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader />
        <div className="text-lg text-white">
          If it is taking time, Refresh Page
        </div>
      </div>
    );
  }

  let CFConvertedData = ConvertCFData(CFData2 ? CFData2.result : []); // For converting CFData2 to required format
  let LCConvertedData = ConvertLCData(LCData ? LCData.submissionCalendar : []); // For converting LCData to required format
  const heatmapData = {
    CodeChef: CCData ? CCData.heatMap : [],
    CodeForces: CFConvertedData ? CFConvertedData.heatMapData : [],
    LeetCode: LCConvertedData ? LCConvertedData : [],
  };

  const combinedheatMapData = CombineHeatMapData(
    heatmapData.CodeChef,
    heatmapData.CodeForces,
    heatmapData.LeetCode
  );

  const solvedCount = {
    CodeChef: CCProblemsSolved ? CCProblemsSolved : 0,
    CodeForces: CFConvertedData ? parseInt(CFConvertedData.solved) : 0,
    LeetCode: LCData ? parseInt(LCData.totalSolved) : 0,
  };
  const totalSolved =
    solvedCount.CodeChef + solvedCount.CodeForces + solvedCount.LeetCode;

  const contestCount = {
    CodeChef: CCData ? parseInt(CCData.ratingData.length) : 0,
    CodeForces: CFData ? parseInt(CFData.result.length) : 0,
    LeetCode: LCContestData
      ? parseInt(
          LCContestData.contestParticipation
            ? LCContestData.contestParticipation.length
            : 0
        )
      : 0,
  };
  const totalContests =
    contestCount.CodeChef + contestCount.CodeForces + contestCount.LeetCode;

  const ratingData = {
    CodeChef: {
      current: CCData ? CCData.currentRating : 0,
      highest: CCData ? CCData.highestRating : 0,
    },
    CodeForces: {
      current: CFUserInfo ? CFUserInfo.result[0].rating : 0,
      highest: CFUserInfo ? CFUserInfo.result[0].maxRating : 0,
    },
    LeetCode: {
      current: LCContestData ? parseInt(LCContestData.contestRating, 10) : 0,
      highest: LCContestData ? parseInt(LCContestData.contestRating, 10) : 0,
    },
  };

  const rankData = {
    CodeChef: CCData ? CCData.stars : "Data not available",
    CodeForces: CFUserInfo ? CFUserInfo.result[0].rank : "Data not available",
    LeetCode: LCContestData
      ? LCContestData.contestBadges
        ? LCContestData.contestBadges.name
        : "NONE"
      : "Data not available",
  };

  const totalActiveDays = combinedheatMapData.length;

  return (
    <div>
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
      { !id && 
        <div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-4">
            {platforms.map((platform) => (
              <div
                className="flex items-center space-x-2 md:gap-2 bg-cyan-950 text-white p-2 border rounded-lg"
                key={platform.name}
              >
                <img
                  src={platform.faviconUrl}
                  alt={platform.name}
                  className="w-6 h-6"
                />
                <a href={platform.link} target="_blank" rel="noreferrer">
                  {platform.name}
                </a>
                <button
                  onClick={() => {
                    handleRefresh(platform.name);
                  }}
                >
                  <i className="fas fa-solid fa-refresh text-[#e1edea]"></i>
                </button>
                <a
                  href={platform.link}
                  className="fas fa-solid fa-arrow-up-right-from-square text-[#e1edea]"
                ></a>
              </div>
            ))}
          </div>
        </div>
    }
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
