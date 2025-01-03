import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
const backendURL = process.env.REACT_APP_BACKEND_URL;

function useFetchCFData2(setCFData2) {
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
            const platformID = response.data.platformIds[0].Codeforces;
            if (platformID) {
              console.log(platformID);
            } else {
              console.log("Platform ID for CodeForces not found");
            }
            if (platformID) {
              const cfResponse = await axios.get(
                `https://codeforces.com/api/user.status?handle=${platformID}&from=1`
              );
              setCFData2(cfResponse.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
  
        fetchUserData();
      }
    }, []);
}

export default useFetchCFData2;