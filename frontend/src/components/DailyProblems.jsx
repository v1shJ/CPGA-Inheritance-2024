import React from "react";
import DailyProblemCard from "./DailyProblemCard";
import { useState, useEffect } from "react";
import HomeNavbar from "./HomeNavbar";
import { useNavigate } from "react-router-dom";
import { getDailyProblem, getALLDailyProblems } from "./Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DailyProblems() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  const toFetchDailyProblem = async (problems) => {
    const nineAMToday = new Date();
    nineAMToday.setHours(9, 0, 0, 0);

    // console.log(problems);

    if (problems?.length > 0) {
      const firstProblemTime = new Date(problems[0].date);

      if (firstProblemTime.getTime() > nineAMToday.getTime()) {
        // console.log("Fetching new daily problems...");
        await fetchDailyProblem();
      }
    } else {
      console.log("No problems found. Fetching new daily problems...");
      await fetchDailyProblem();
    }
  };

  useEffect(() => {
    const fetchAllDailyProblems = async () => {
      const storedProblems = JSON.parse(localStorage.getItem("dailyProblem"));

      if (storedProblems && storedProblems.length > 0) {
        setProblems(storedProblems);
        toast.success("Daily problems loaded successfully!");
        await toFetchDailyProblem(storedProblems);
        return;
      }

      try {
        const response = await getALLDailyProblems();
        if (!response || response.length === 0) {
          console.warn("No daily problems available.");
          toast.warn("No daily problems available!");
          await toFetchDailyProblem(response);
          return;
        }

        setProblems(response);
        localStorage.setItem("dailyProblem", JSON.stringify(response));
        localStorage.setItem("fetchTimeOfDailyProblem", new Date().toISOString());

        toast.success("Daily problems fetched successfully!");
        await toFetchDailyProblem(response);
      } catch (error) {
        console.error("Error fetching all daily problems:", error);
        toast.error("Error fetching all daily problems.");
      }
    };

    fetchAllDailyProblems();
  }, []);

  const fetchDailyProblem = async () => {
    try {
      await toast.promise(getDailyProblem(), {
        pending: "Fetching daily problem...",
        success: "Daily problem fetched successfully!",
        error: "Error fetching daily problem. Please try again.",
      });

      const response = await getALLDailyProblems();
      setProblems(response);
      localStorage.setItem("dailyProblem", JSON.stringify(response));
      localStorage.setItem("fetchTimeOfDailyProblem", new Date().toISOString());
    } catch (error) {
      console.error("Error fetching daily problem:", error);
    }
  };

  const dailyProblemPreference = JSON.parse(
    localStorage.getItem("dailyProblemPreference") || "{}"
  );

  const handleOnClick = () => {
    navigate("/daily-problem-form");
  };

  return (
    <div className="bg-gray-800 h-full min-h-screen ">
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
      <div className="flex justify-evenly items-center p-4 border-b-2">
        <p className="text-lg font-bold text-white">
          Selected Tags :
          <span className="text-cyan-400">
            {dailyProblemPreference.problemTags
              ? dailyProblemPreference.problemTags.join(", ")
              : "implementation"}
          </span>
        </p>
        <p>
          <button
            className="border p-2 rounded-lg bg-gray-400 font-semibold"
            onClick={handleOnClick}
          >
            Change Preference
          </button>
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        {problems &&
          problems.map((problem, index) => (
            <DailyProblemCard problem={problem} ind={index} />
          ))}
      </div>
    </div>
  );
}
