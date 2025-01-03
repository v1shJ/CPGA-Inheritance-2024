import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const backendURL = process.env.REACT_APP_BACKEND_URL;

function useFetchCCData(setCCData) {
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
            // console.log(response.data.platformIds[0].CodeChef);
            const platformID = response.data.platformIds[0].CodeChef;
            if (platformID) {
              console.log(platformID);
            } else {
              console.log("Platform ID for CodeChef not found");
            }
            if (platformID) {
              const ccResponse = await axios.get(
                `https://codechef-api.vercel.app/handle/${platformID}`
              );
              setCCData(ccResponse.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
  
        fetchUserData();
      }
    }, []);
}

export default useFetchCCData;