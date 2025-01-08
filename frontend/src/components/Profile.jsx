import React from "react";
import Navbar from "./HomeNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Home from "./Home";
import Idform from "./Idform";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data from backend:", error);
      });
  }, []);

  const platforms = [
    {
      name: "LeetCode",
      faviconUrl: "https://leetcode.com/favicon.ico",
      link: userData?.platformIds?.[0]?.LeetCode
        ? `https://leetcode.com/u/${userData.platformIds[0].LeetCode}`
        : "#",
      platformId: userData?.platformIds?.[0]?.LeetCode,
    },
    {
      name: "CodeChef",
      faviconUrl: "https://www.codechef.com/favicon.ico",
      link: userData?.platformIds?.[0]?.CodeChef
        ? `https://www.codechef.com/users/${userData.platformIds[0].CodeChef}`
        : "#",
      platformId: userData?.platformIds?.[0]?.CodeChef,
    },
    {
      name: "CodeForces",
      faviconUrl: "https://codolio.com/icons/codeforces.png",
      link: userData?.platformIds?.[0]?.Codeforces
        ? `https://codeforces.com/profile/${userData.platformIds[0].Codeforces}`
        : "#",
      platformId: userData?.platformIds?.[0]?.Codeforces,
    },
  ];

  return (
    <div>
      <div className="mt-2 overflow-hidden bg-gradient-to-b from-gray-800 to-black">
        <div className="h-16">
          <Navbar />
        </div>
        <div className="flex flex-col gap-4 w-full items-center justify-evenly h-full min-h-screen">
          <div className="p-8 w-full lg:w-2/3 min-h-72 rounded-lg flex bg-gradient-to-t from-gray-800 to-black shadow-2xl items-center">
            <div className="w-1/2 gap-4 flex flex-col items-center justify-s">
              <img
                src={
                  userData.image
                    ? `${backendUrl}/images/uploads/${userData.image}`
                    : `${backendUrl}/images/uploads/default.jpg`
                }
                alt="User Profile"
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <h3 className="text-lg font-semibold text-cyan-100 mx-auto">
                {userData.name}
              </h3>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <p className="text-cyan-300">Username: {userData.username}</p>
              <p className="text-cyan-400">Email: {userData.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full items-center justify-center">
            <div className="p-4 min-w-80 min-h-72 rounded-lg gap-2 flex flex-col items-center bg-gray-800 shadow-2xl justify-center h-full">
              <div className="text-lg text-cyan-50">Platform IDs</div>
              <div className="flex flex-col justify-center items-center gap-2 md:gap-8 mt-4">
                {platforms.map((platform) => (
                  platform.platformId &&
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
                      {platform.platformId}
                    </a>
                    <a
                      href={platform.link}
                      className="fas fa-solid fa-arrow-up-right-from-square text-[#e1edea]"
                    ></a>
                  </div>
                ))}
                <a className="custom-btn" href="/getIds">
                  Add Platform ID
                </a>
              </div>
            </div>
            <div className="p-8 min-w-80 min-h-72 rounded-lg gap-4 flex flex-col items-center bg-gray-800 shadow-2xl justify-center h-full"></div>
          </div>
        </div>
      </div>
      <Home />
    </div>
  );
};

export default Profile;
