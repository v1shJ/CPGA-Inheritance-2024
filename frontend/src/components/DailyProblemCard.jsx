import React from "react";
import { NavLink } from "react-router-dom";
import useFetchWithLocalStorage from "./FetchWithLocalStorage.jsx";
import {FetchData} from "./Api";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showLoaderToast, showSuccessToast, showInfoToast } from "./toastify.jsx";
import {updateProblemStatus} from "./Api";

export default function DailyProblemCard({problem, ind}) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [data, setData] = useState({});

  const fetchCfSolvedProblem = useFetchWithLocalStorage(
    "CFData2",
    FetchData,
    setData
  );

  function handleRefresh(){
    if(problem.status === "solved") {
      showInfoToast("Problem already solved");
      return;
    }
    const fetchFunctions = [];
    fetchFunctions.push(fetchCfSolvedProblem(true, 0));
    showLoaderToast("Refreshing data, please wait...");

    Promise.all(fetchFunctions)
      .then((results) => {
        const result = results[results.length - 1];
        if (result >= 0) {
          const problemSolved = data.result;
          toast.dismiss(); // Dismiss the info toast

          const url = new URL(problem.link);
          const pathSegments = url.pathname.split('/');
          const contestId = pathSegments[2];
          const index = pathSegments[4];
          const points = problem.points;

          if(problemSolved[0].problem.contestId == contestId && problemSolved[0].problem.index === index &&  problemSolved[0]["verdict"] === "OK") {
            problem.status = "solved";
            
            const previousLocalStorageData = JSON.parse(localStorage.getItem("dailyProblem"));
            previousLocalStorageData[ind].status = "solved";
            localStorage.setItem("dailyProblem", JSON.stringify(previousLocalStorageData));
            const fetchTime = new Date().toISOString();
            localStorage.setItem("fetchTimeOfDailyProblem", fetchTime);

            updateProblemStatus({contestId, index, points});
          }
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

  return (
    <div
      className={`w-full xl:w-6/12 ${
        problem.status === "solved" ? "bg-cyan-800" : "bg-gray-900"
      } ${formatDate(problem.date) === formatDate(Date.now()) ? "border" : ""} p-4 rounded-lg mt-4 shadow-2xl`}
    >
      <div className="flex flex-wrap w-full gap-4 items-center justify-evenly">
        <div className="flex items-center justify-center sm:justify-start gap-4 w-80 md:w-1/2 ">
          <button className="fas fa-refresh text-white" onClick={() => handleRefresh()}></button>
          <div className="flex flex-col items-center sm:items-start justify-center gap-1 text-white">
            <div className="text-light text-gray-400">{formatDate(problem.date)}</div>
            <div className="text-bold text-2xl">{problem.name}</div>
            <div className="flex gap-1">
              Difficulty: <p>{problem.rating}</p>
            </div>
            <div className="flex gap-1">
              Points: <p>{problem.points}</p>
            </div>

          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end md:w-1/3">
          <NavLink to={problem.link} target="_blank" className="custom-btn">
            Solve Problem
          </NavLink>
        </div>
      </div>
    </div>
  );
}
