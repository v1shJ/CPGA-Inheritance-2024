import React from "react";
import Navbar from "./HomeNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { id } = JSON.parse(user);
      axios
        .get(`${backendUrl}/api/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then((response) => {
          // console.log("User data fetched successfully:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data from backend:", error);
        });
    } else {
      console.warn("No user data found in localStorage");
    }
  }, []);

  return (
    <div className="mt-2 overflow-hidden bg-gradient-to-b to-gray-800 from-black">
      <div className="h-16">
        <Navbar />
      </div>
      <div className="flex flex-col gap-4 w-full items-center justify-evenly h-full min-h-screen"> 
        <div className="p-8 w-full lg:w-2/3 min-h-72 rounded-lg flex bg-gradient-to-b from-gray-800 to-black shadow-2xl items-center">
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
        <div className="p-8 min-w-80 min-h-72 rounded-lg gap-4 flex flex-col items-center bg-gradient-to-b from-gray-800 to-black shadow-2xl justify-center h-full">
          <div className="text-lg text-cyan-50">Platform IDs</div>
          {userData.platformIds &&
            Object.entries(userData.platformIds[0]).map(([key, value], index) => (
              <div
              key={index}
              className="w-full flex items-center justify-center"
              >
                <div className="flex gap-4 w-full items-center justify-center">
                  <div className="text-cyan-600">{key} : </div>
                  <div className="text-cyan-500">{value}</div>
                </div>
              </div>
            ))}
        </div>
       

        <div className="p-8 min-w-80 min-h-72 rounded-lg gap-4 flex flex-col items-center bg-gradient-to-b from-gray-800 to-black shadow-2xl justify-center h-full"></div>
            </div>
      </div>
    </div>
  );
};

export default Profile;
