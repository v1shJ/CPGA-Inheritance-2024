import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "./toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Idform() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const platforms = ["Codeforces", "CodeChef", "LeetCode"];

  const [ids, setIds] = useState({
    Codeforces: user?.platformIds[0]?.Codeforces || "",
    CodeChef: user?.platformIds[0]?.CodeChef || "",
    LeetCode: user?.platformIds[0]?.LeetCode || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIds({ ...ids, [name]: value });
  };
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userid = user.id;
    if(!ids.CodeChef && !ids.Codeforces && !ids.LeetCode){
      setError("Atleast provide one Platform ID");
      return
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/${userid}/addPlatforms`,
        ids,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify({
        ...user,
        platformIds: [{ ...ids }]
      }));
      showSuccessToast("Platforms added successfully");
      window.location = "/";
    } catch (err) {
      showErrorToast(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black to-gray-800">
      <div>
        {error && (
          <>
            {showErrorToast(error)}
            {setError("")}
          </>
        )}
      </div>
      <div className="min-w-96 p-6 mx-auto rounded-lg shadow-lg border bg-gradient-to-b to-black from-gray-800 flex flex-col items-center justify-center text-cyan-50">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter Platform IDs
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-9 w-full">
          <div className="flex flex-col gap-6 w-full">
            {platforms.map((platform) => (
              <div key={platform}>
                <label
                  htmlFor={platform.toLowerCase()}
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {platform} ID:
                </label>
                <input
                  type="text"
                  id={platform.toLowerCase()}
                  name={platform}
                  value={ids[platform]}
                  onChange={handleChange}
                  placeholder={`Enter your ${platform} ID`}
                  className="w-full px-3 py-2 border rounded-lg bg-slate-800 text-white"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full custom-btn py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Idform;
