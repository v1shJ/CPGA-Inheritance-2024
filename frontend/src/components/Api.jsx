import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;

 function getApiUrl(key, platformID) {
  if(key === "CCData") return `https://codechef-api.vercel.app/handle/${platformID}`;
  else if(key === "CFData") return `https://codeforces.com/api/user.rating?handle=${platformID}`;
  else if(key === "CFData2") return `https://codeforces.com/api/user.status?handle=${platformID}&from=1`;
  else if(key === "CFUserInfo") return `https://codeforces.com/api/user.info?handles=${platformID}&checkHistoricHandles=true`
  else if(key === "LCData") return  `https://leetcode-stats-api.herokuapp.com/${platformID}`
  else if(key === "LCContestData") return `https://alfa-leetcode-api.onrender.com/${platformID}/contest`
  else return "";
}

export function FetchData(key, token, id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${backendURL}/api/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          let platform = "";
          if(key === "CCData") platform = "CodeChef";
          else if(key === "CFData" || key === "CFData2" || key === "CFUserInfo") platform = "Codeforces";
          else if(key === "LCData" || key === "LCContestData") platform = "LeetCode";

           const platformID =response.data.platformIds[0][platform];

          if (platformID) {
            console.log(`${platform}` + " ID: " + platformID); 
            const DataResponse = await axios.get(
              getApiUrl(key, platformID)
            );
            return DataResponse.data;
          } else {
            console.log(`Platform ID for ${platform} not found`);
            return;
          }
        } catch (err) {
          console.log(err.message);
          return err.message
        }
      };

      return fetchUserData();
}

export async function fetchCodeChefData(key ,token, id) {
  try {
    const response = await axios.get(`${backendURL}/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userHandle = response.data.platformIds[0]["CodeChef"];
    const ccresponse = await axios.post(`${backendURL}/api/getcc-problem-count`, { userHandle }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return ccresponse.data.totalProblemsSolved;
  } catch (err) {
    console.log(err.message);
  }
};
