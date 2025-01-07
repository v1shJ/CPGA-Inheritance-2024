import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Leaderboard() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        response.data.sort((a, b) => b.dailyPoints - a.dailyPoints);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data from backend:", error);
      });
  }, []);

return (
    <div>
            <div className="mt-2 h-16"> 
                    <HomeNavbar />
            </div>
        <div className="flex flex-col  items-center h-screen bg-gradient-to-b from-black to-gray-800 text-white">
            <div className="text-4xl m-4">LeaderBoard</div>
            <div className="hidden sm:flex justify-between items-center w-full md:w-2/3 p-4 rounded-lg bg-gray-900 text-white">
                <div className="w-1/3 text-center">User</div>
                <div className="w-1/3 text-center">Points</div>
                <div className="w-1/3 text-center">Profile</div>
            </div>
            <div className="flex flex-col items-center w-full mt-4 gap-4">
                {users &&
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap sm:flex-nowrap border justify-center sm:justify-between items-center w-full md:w-2/3 gap-4 sm:gap-0 rounded-lg p-4 bg-gradient-to-b to-gray-950 from-gray-800 text-white"
                        >
                            <div className="flex gap-4 items-center w-52 sm:w-1/3">
                                <span className="text-xl font-bold">{index + 1}</span>
                                <img
                                    src={
                                        user.image
                                        ? `${backendUrl}/images/uploads/${user.image}`
                                        : `${backendUrl}/images/uploads/default.jpg`
                                    }
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <h1>{user.name}</h1>
                            </div>
                            <div className=" w-48 sm:w-1/3 text-center">{user.dailyPoints}</div>
                            <NavLink
                                className="w-full sm:w-1/3 flex items-center justify-center text-center"
                                to={`/profile/${user._id}`}
                            >
                                <button className="custom-btn">View Profile</button>
                            </NavLink>
                        </div>
                    ))}
            </div>
        </div>
    </div>
);
}
