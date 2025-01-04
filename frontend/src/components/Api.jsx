import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const backendURL = process.env.REACT_APP_BACKEND_URL;

export function useFetchCCData(setCCData) {
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


export function useFetchCFData(setCFData) {
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
                `https://codeforces.com/api/user.rating?handle=${platformID}`
              );
              setCFData(cfResponse.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
  
        fetchUserData();
      }
    }, []);
}

export function useFetchCFData2(setCFData2) {
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


export function useFetchCFUserInfo(setCFData2) {
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
                `https://codeforces.com/api/user.info?handles=${platformID}&checkHistoricHandles=true`
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


export function useFetchLCContestData(setLCContestData) {
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
              setLCContestData(lcResponse.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
  
        fetchUserData();
      }
    }, []);
}



export function useFetchLCHeatMapData(setLCData) {
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
                `https://leetcode-stats-api.herokuapp.com/${platformID}`
              );
              setLCData(lcResponse.data);
              // console.log(lcResponse.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
  
        fetchUserData();
      }
    }, []);
}