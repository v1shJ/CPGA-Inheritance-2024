import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import { Trophy, Medal, Award } from 'lucide-react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LeaderboardRow = ({ user, index, backendUrl }) => {
    const getMedalIcon = (position) => {
      switch (position) {
        case 0:
          return <Trophy className="w-6 h-6 text-yellow-400" />;
        case 1:
          return <Medal className="w-6 h-6 text-gray-300" />;
        case 2:
          return <Award className="w-6 h-6 text-amber-600" />;
        default:
          return <span className="text-xl font-bold text-gray-400">{position + 1}</span>;
      }
    };
  
    return (
      <div className={`group flex flex-wrap sm:flex-nowrap items-center w-full lg:w-2/3 rounded-xl p-4 
        ${index < 3 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700'
          : 'bg-gray-900/60 hover:bg-gray-800/80'} 
        transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10`}
      >
        <div className="flex items-center gap-6 w-full sm:w-1/3 px-4">
          <div className="flex items-center justify-center w-8">
            {getMedalIcon(index)}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.image ? `${backendUrl}/images/uploads/${user.image}` : `${backendUrl}/images/uploads/default.jpg`}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-cyan-400 transition-colors"
              />
              {index < 3 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                  {index === 0 && '👑'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {user.name}
              </h3>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-center w-full sm:w-1/3 py-4 sm:py-0">
          <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
            <span className="text-lg font-bold text-cyan-400">{user.dailyPoints}</span>
            <span className="text-gray-400 ml-2">points</span>
          </div>
        </div>
  
        <div className="w-full sm:w-1/3 flex justify-center">
          <NavLink to={`/profile/${user._id}`} className="w-full sm:w-auto">
            <button className="w-full px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg
                             transition-colors duration-300 flex items-center justify-center gap-2">
              View Profile
            </button>
          </NavLink>
        </div>
      </div>
    );
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="mt-2 h-16">
        <HomeNavbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-400">Top performers in daily challenges</p>
        </div>

        <div className="hidden sm:flex justify-between items-center w-full md:w-2/3 mx-auto p-4 rounded-lg bg-gray-800/50 text-gray-400 text-sm font-medium mb-6">
          <div className="w-1/3 pl-20">PLAYER</div>
          <div className="w-1/3 text-center">POINTS</div>
          <div className="w-1/3 text-center">PROFILE</div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {users?.map((user, index) => (
            <LeaderboardRow
              key={user._id}
              user={user}
              index={index}
              backendUrl={backendUrl}
            />
          ))}
        </div>
      </div>
    </div>
);
}
