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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ConvertCFData,
  CombineHeatMapData,
  ConvertLCData,
} from "./utils/modifyData";
import { FetchData, fetchCodeChefData } from "./Api";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showCustomToast,
  showLoaderToast,
} from "./toastify.jsx";
import { use } from "react";

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserHandle(JSON.parse(user));
    }
  }, []);
  // Replace with your fetch functions
  const fetchData = FetchData;
  let specialRefresh = false;

  const fetchCCData = useFetchWithLocalStorage(
    "CCData",
    fetchData,
    setCCData,
    setError,
    specialRefresh
  );
  const fetchCCSolved = useFetchWithLocalStorage(
    "CCSolved",
    fetchCodeChefData,
    setCCProblemsSolved,
    setError,
    specialRefresh
  );
  const fetchCFData = useFetchWithLocalStorage(
    "CFData",
    fetchData,
    setCFData,
    setError,
    specialRefresh
  );
  const fetchCFData2 = useFetchWithLocalStorage(
    "CFData2",
    fetchData,
    setCFData2,
    setError,
    specialRefresh
  );
  const fetchCFUserInfo = useFetchWithLocalStorage(
    "CFUserInfo",
    fetchData,
    setCFUserInfo,
    setError,
    specialRefresh
  );
  const fetchLCData = useFetchWithLocalStorage(
    "LCData",
    fetchData,
    setLCData,
    setError,
    specialRefresh
  );
  const fetchLCContestData = useFetchWithLocalStorage(
    "LCContestData",
    fetchData,
    setLCContestData,
    setError,
    specialRefresh
  );

  if (error) {
    showErrorToast(error); // Show error toast
  }

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
  function handleRefresh(platform) {
    let fetchFunctions = [];
    if (platform === "CodeChef") {
      fetchFunctions = [fetchCCData(true), fetchCCSolved(true)];
    } else if (platform === "CodeForces") {
      fetchFunctions = [fetchCFData(true), fetchCFData2(true), fetchCFUserInfo(true)];
    } else if (platform === "LeetCode") {
      fetchFunctions = [fetchLCData(true), fetchLCContestData(true)];
    }

    showLoaderToast("Refreshing data, please wait...");

    Promise.all(fetchFunctions)
      .then((results) => {
        const result = results[results.length - 1];
        if (result >= 0) {
          toast.dismiss(); // Dismiss the info toast
          showSuccessToast("Data Refreshed Successfully");
        } else {
          toast.dismiss(); // Dismiss the info toast
          showInfoToast(
            `Timeout!! Try again after ${Math.ceil(Math.abs(result))} minutes`
          );
        }
      })
      .catch((error) => {
        toast.error("Failed to refresh data");
      });
  }
  // For changing platform on display
  const [platform, setPlatform] = useState("CodeChef");
  const handleChange = (e) => {
    setPlatform(e.target.value);
  };

  // console.log(userHandle)
  // console.log(CCData, CFData, CFData2, LCData, CFUserInfo, LCContestData);

  const allDataFetched =
    CCData &&
    CFData &&
    CFData2 &&
    LCData &&
    CFUserInfo &&
    LCContestData &&
    CCProblemsSolved &&
    userHandle;
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!allDataFetched && !timeoutReached) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader />
        <div className="text-lg text-white">Loading data, please wait...</div>
      </div>
    );
  }

  let CFConvertedData = ConvertCFData(CFData2 ? CFData2.result : []); // For converting CFData2 to required format
  let LCConvertedData = ConvertLCData(LCData ? LCData.submissionCalendar : []); // For converting LCData to required format
  const heatmapData = {
    CodeChef: CCData?.heatMap ? CCData.heatMap : [],
    CodeForces: CFConvertedData?.heatMapData ? CFConvertedData.heatMapData : [],
    LeetCode: LCConvertedData ? LCConvertedData : [],
  };
  let combinedheatMapData = [];
  try {
    combinedheatMapData = CombineHeatMapData(
      heatmapData.CodeChef,
      heatmapData.CodeForces,
      heatmapData.LeetCode
    );
  } catch (error) {
    showErrorToast("Failed to combine heatmap data");
  }

  const solvedCount = {
    CodeChef: CCProblemsSolved ? CCProblemsSolved : 0,
    CodeForces: CFConvertedData ? parseInt(CFConvertedData.solved) : 0,
    LeetCode: LCData ? parseInt(LCData.totalSolved) : 0,
  };
  const totalSolved =
    solvedCount.CodeChef + solvedCount.CodeForces + solvedCount.LeetCode;

  const contestCount = {
    CodeChef: parseInt(CCData?.ratingData ? CCData.ratingData.length : 0),
    CodeForces: parseInt(CFData?.result ? CFData.result.length : 0),
    LeetCode: parseInt(
      LCContestData?.contestParticipation
        ? LCContestData.contestParticipation.length
        : 0
    ),
  };
  const totalContests =
    contestCount.CodeChef + contestCount.CodeForces + contestCount.LeetCode;

  const ratingData = {
    CodeChef: {
      current: CCData ? CCData.currentRating : 0,
      highest: CCData ? CCData.highestRating : 0,
    },
    CodeForces: {
      current: CFUserInfo ? CFUserInfo.result?.[0]?.rating : 0,
      highest: CFUserInfo ? CFUserInfo.result?.[0]?.maxRating : 0,
    },
    LeetCode: {
      current: LCContestData ? parseInt(LCContestData.contestRating, 10) : 0,
      highest: LCContestData?.contestParticipation
        ? parseInt(
            Math.max(
              ...LCContestData.contestParticipation.map(
                (contest) => contest.rating
              )
            )
          )
        : 0,
    },
  };

  const rankData = {
    CodeChef: CCData ? CCData.stars : "Data not available",
    CodeForces: CFUserInfo ? CFUserInfo.result?.[0]?.rank : "Data not available",
    LeetCode: LCContestData
      ? LCContestData.contestBadges
        ? LCContestData.contestBadges.name
        : "NONE"
      : "Data not available",
  };

  const totalActiveDays = combinedheatMapData?.length;

  return (
    <div>
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
      {!id && (
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
      )}
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
            {platform === "CodeChef" && (
              <CCRatingGraph ratingData={CCData?.ratingData} />
            )}
            {platform === "CodeForces" && (
              <CFRatingGraph ratingData={CFData?.result} />
            )}
            {platform === "LeetCode" && (
              <LCRatingGraph
                contestParticipation={LCContestData?.contestParticipation}
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
                      " ( Max: " +
                      (ratingData[platform].highest
                        ? ratingData[platform].highest
                        : "none") +
                      ")"}
                  </div>
                }
                <div>{<div>{"Rank: " + rankData[platform]} </div>}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-7/12 flex flex-wrap items-center justify-center gap-4">
          <div className="border w-64 rounded-lg aspect-w-1 aspect-h-2  px-10 bg-gray-800">
            <CPStatsPieChart Count={solvedCount} Title={"Problems Solved"} />
          </div>
          <div className="border w-64 rounded-lg aspect-w-1 aspect-h-2  px-10 bg-gray-800">
            <CPStatsPieChart Count={contestCount} Title={"Contests Attended"} />
          </div>
          <div className="border w-64 rounded-lg aspect-w-1 aspect-h-2 p-2 bg-gray-800 flex flex-col justify-center items-center gap-4 md:gap-8 m-4">
            <h1 className="text-lg text-cyan-50">Progress</h1>
            {platforms.map((platform) => (
              <div
                className="flex items-center justify-between w-9/12 space-x-2 md:gap-2 bg-cyan-950 text-white p-2 border rounded-lg"
                key={platform.name}
              >
                <img
                  src={platform.faviconUrl}
                  alt={platform.name}
                  className="w-6 h-6"
                />
                <div>{ratingData[platform.name].current}</div>
                <div>{rankData[platform.name]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      /> */}
    </div>
  );
}
