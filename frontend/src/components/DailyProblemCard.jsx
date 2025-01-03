import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function DailyProblemCard({ problem }) {
  const [problemData, setProblemData] = useState(problem);
  const color = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-black to-gray-800 p-4 rounded-lg flex flex-col items-center justify-center">
      <div className="flex flex-wrap w-full gap-4 lg:w-2/3 items-center justify-center">
        <div>
          <input
            type="checkbox"
            id="solved"
            name="status"
            checked={problemData.status === "solved"}
            onChange={() =>
              setProblemData({
                ...problemData,
                status: problemData.status === "solved" ? "unsolved" : "solved",
              })
            }
          />
          <label htmlFor="solved" className="text-white">
            Solved
          </label>
        </div>
        <div className="flex flex-col w-80 md:w-1/2 items-center sm:items-start justify-center gap-1 text-white">
          <div>Problem: {problemData.title}</div>
          <div className="flex gap-1">
            Difficulty: <p className={`${color[problemData.difficulty]}`}>{problemData.difficulty}</p>
          </div>
          <div>Date: {problemData.date}</div>
        </div>
        <div className="flex items-center justify-center lg:justify-end md:w-1/3">
          <NavLink to={problemData.link} target="_blank" className="custom-btn">
            Solve Problem
          </NavLink>
        </div>
      </div>
    </div>
  );
}
