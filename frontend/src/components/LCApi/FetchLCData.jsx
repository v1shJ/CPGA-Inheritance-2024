import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
const backendURL = process.env.REACT_APP_BACKEND_URL;

function useFetchLCData(setLCData) {
    let { id } = useParams();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if(!id) {
        id = user.id;
      }
      if (user) {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`${backendURL}/api/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            // console.log(response.data.platformIds[0].Codeforces);
            const platformID = response.data.platformIds[0].LeetCode;
            if (platformID) {
              console.log(platformID);
            } else {
              console.log("Platform ID for LeetCode not found");
            }
            if (platformID) {
              const lcResponse = await axios.get(
                `https://alfa-leetcode-api.onrender.com/${platformID}/contest`
              );
              setLCData(lcResponse.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
  
        fetchUserData();
      }
    }, []);
}

export default useFetchLCData;