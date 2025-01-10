import React, { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const DailyProblemForm = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagAlert, setShowTagAlert] = useState(false);
  const [ratingRange, setRatingRange] = useState({
    min: 800,
    max: 2000,
  });

  const problemTags = [
    "brute force",
    "implementation",
    "greedy",
    "binary search",
    "math",
    "bitmasks",
    "sortings",
    "divide and conquer",
    "dp",
    "graphs",
    "2-sat",
    "chinese remainder theorem",
    "combinatorics",
    "constructive algorithms",
    "data structures",
    "dfs and similar",
    "dsu",
    "expression parsing",
    "fft",
    "flows",
    "games",
    "geometry",
    "graph matchings",
    "hashing",
    "interactive",
    "matrices",
    "meet-in-the-middle",
    "number theory",
    "probabilities",
    "schedules",
    "shortest paths",
    "string suffix structures",
    "strings",
    "ternary search",
    "trees",
    "two pointers",
  ];



  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      setShowTagAlert(false);
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
      setShowTagAlert(false);
    } else {
      setShowTagAlert(true);
      setTimeout(() => setShowTagAlert(false), 3000);
    }
  };

  const handleRatingChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    setRatingRange((prev) => ({
      ...prev,
      [type]: numValue,
    }));
  };

  const isRatingValid = () => {
    return (
      ratingRange.min >= 800 &&
      ratingRange.max <= 3500 &&
      ratingRange.min <= ratingRange.max
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the data to the backend
    const token = localStorage.getItem("token");
    const data = {
      problemTags: selectedTags,
      ratingRange,
    };
    // console.log(data);

    toast.promise(
      axios.post(`${backendUrl}/api/daily-problem-preferences`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        pending: 'Saving preferences...',
        success: 'Preferences saved successfully!',
        error: 'An error occurred. Please try again.',
      }
    );

    // Navigate to the daily problem page
    window.location.href = "/dailyProblems";

    // Store the data in local storage
    localStorage.setItem("dailyProblemPreference", JSON.stringify(data));
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="h-full min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-800 gap-8">
      <div className="h-16">
        <HomeNavbar />
      </div>
      <div className="max-w-xl mx-auto p-5 border bg-gradient-to-t from-black to-gray-800 border-gray-300 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Daily Problem Preferences</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Tags Section */}
          <div>
            <label className="block font-medium mb-2">Problem Tags</label>
            <div className="mb-2">{selectedTags.length}/3 selected</div>
            {showTagAlert && (
              <div className="text-red-500 text-sm mb-2">
                You can select a maximum of 3 tags
              </div>
            )}
            <div
              className={`overflow-hidden ${isExpanded ? "h-auto" : "h-30"}`}
            >
              <div
                className={`flex flex-wrap gap-2 text-black ${
                  isExpanded ? "" : "h-20"
                }`}
              >
                {problemTags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={`px-3 py-1 rounded ${
                      selectedTags.includes(tag)
                        ? "border-2 border-blue-500 bg-blue-100"
                        : "border border-gray-300 bg-white"
                    } ${
                      selectedTags.length >= 3 && !selectedTags.includes(tag)
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-500 hover:text-blue-600 text-sm"
            >
              {isExpanded ? "Show Less" : "Show All Tags"}
            </button>
          </div>
          {/* Rating Range Section */}
          <div>
            <label className="block font-medium mb-2">Rating Range</label>
            <div className="flex gap-4 text-white">
              <div>
                <label className="block text-sm mb-1">Minimum Rating</label>
                <input
                  type="number"
                  min={800}
                  max={3500}
                  value={ratingRange.min}
                  onChange={(e) => handleRatingChange("min", e.target.value)}
                  className="p-2 border text-black border-gray-300 rounded w-24"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Maximum Rating</label>
                <input
                  type="number"
                  min={800}
                  max={3500}
                  value={ratingRange.max}
                  onChange={(e) => handleRatingChange("max", e.target.value)}
                  className="p-2 text-black border border-gray-300 rounded w-24"
                />
              </div>
            </div>
            {!isRatingValid() && (
              <div className="text-red-500 text-sm mt-2">
                Rating range must be between 800 and 3500, and minimum rating
                must be less than or equal to maximum rating
              </div>
            )}
          </div>
          {/* Selected Tags */}
          <div>
            <label className="block font-medium mb-2">Selected Tags</label>
            <div className="flex gap-2 flex-wrap text-black">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-2 bg-blue-100 rounded px-3 py-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {selectedTags.length === 0 && (
                <span className="text-gray-500">No tags selected</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              isRatingValid() && selectedTags.length > 0
                ? "custom-btn text-black"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isRatingValid() || selectedTags.length === 0}
            onClick={handleSubmit}
          >
            Save Preferences
          </button>
          <NavLink
            type="submit"
            className="custom-btn text-center"
            to="/dailyProblems"
          >
            Cancel
          </NavLink>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DailyProblemForm;