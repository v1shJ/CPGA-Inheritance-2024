import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function VerifyEmail() {
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error', 'missingToken'
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    // console.log(token);
    if (!token) {
      console.error("No token found in URL");
      setStatus("missingToken");
      return;
    }

    axios
      .get(`${backendUrl}/api/verify-email?token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
        if (
          error.response.data.message === "Email has already been verified."
        ) {
          setStatus("alreadyVerified");
          return;
        }
        setStatus("error");
      });
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 flex gap-4 text-3xl flex-col items-center justify-center h-screen">
      <div className="">
        {status === "loading" && (
          <h1 className="text-cyan-200">Verifying your email...</h1>
        )}
        {status === "success" && (
          <h1 className="text-green-500">Email verified successfully!</h1>
        )}
        {status === "alreadyVerified" && (
          <h1 className="text-yellow-500">Email has already been verified.</h1>
        )}
        {status === "error" && (
          <h1 className="text-red-500">
            There was an error verifying your email. Please try again or contact
            support.
          </h1>
        )}
        {status === "missingToken" && (
          <h1 className="text-red-500">
            Verification token is missing from the URL. Please check the link
            again.
          </h1>
        )}
       
      </div> 
      <NavLink>
          <button
            className="custom-btn"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go to Home
          </button>
        </NavLink>
    </div>
  );
}
