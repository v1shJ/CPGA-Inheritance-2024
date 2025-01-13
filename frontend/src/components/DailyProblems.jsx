import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeNavbar from "./HomeNavbar";
import DailyProblemCard from "./DailyProblemCard";
import { getDailyProblem, getALLDailyProblems } from "./Api";
import { Search, ArrowUpDown, CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";
import { showErrorToast, showInfoToast, showSuccessToast } from "./toastify";


const SortControls = ({ onSort, currentSort }) => {
  const sortOptions = [
    { id: 'date-new', label: 'Newest First', icon: Clock },
    { id: 'date-old', label: 'Oldest First', icon: Clock },
    { id: 'difficulty-high', label: 'Hardest First', icon: Trophy },
    { id: 'difficulty-low', label: 'Easiest First', icon: Trophy },
    { id: 'solved', label: 'Solved First', icon: CheckCircle2 },
    { id: 'unsolved', label: 'Unsolved First', icon: XCircle },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <ArrowUpDown size={16} className="text-gray-400" />
        <span className="text-sm text-gray-400">Sort by</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSort(id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all
              ${currentSort === id 
                ? 'bg-cyan-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterStats = ({ problems, filteredCount }) => {
  const totalProblems = problems.length;
  const solvedProblems = problems.filter(p => p.status === "solved").length;
  
  return (
    <div className="flex gap-4 text-sm text-gray-400">
      <span>Total: {totalProblems}</span>
      <span>Solved: {solvedProblems}</span>
      {filteredCount !== totalProblems && (
        <span>Filtered: {filteredCount}</span>
      )}
    </div>
  );
};

const Calendar = ({ problems, onDayClick }) => {
  const getDayColor = (date) => {
    const problem = problems.find((p) => {
      const pDate = new Date(p.date);
      return pDate.toDateString() === date.toDateString();
    });

    if (!problem) return "bg-gray-800";
    if (problem.status === "solved") return "bg-cyan-600";
    return "bg-gray-700";
  };

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 42); // Show last 6 weeks

  const weeks = [];
  let currentWeek = [];
  let currentDate = new Date(startDate);

  while (currentDate <= today) {
    if (currentDate.getDay() === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h3 className="text-white font-medium mb-4">Problem Activity</h3>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs text-gray-400 text-center">
            {day}
          </div>
        ))}
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((date, dateIndex) => (
              <button
                key={dateIndex}
                onClick={() => onDayClick(date)}
                className={`w-6 h-6 rounded-sm transition-all ${getDayColor(
                  date
                )} 
                  hover:ring-2 hover:ring-cyan-400 hover:ring-opacity-50`}
                title={`${date.toDateString()}`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const SearchBar = ({ onSearch }) => (
  <div className="relative">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
    <input
      type="text"
      placeholder="Search problems..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg 
                 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                 transition-colors"
    />
  </div>
);

export default function DailyProblems() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const problemRefs = useRef({});

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProblems(problems);
      return;
    }

    const filtered = problems.filter(problem =>
      problem.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(filtered);
  };


  const scrollToProblem = (date) => {
    const targetDate = date.toISOString().split("T")[0];
    const element = problemRefs.current[targetDate];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // ... Your existing useEffect and other functions ...

  const toFetchDailyProblem = async (problems) => {
    const dailyFetchTime = new Date();
    dailyFetchTime.setHours(0, 0, 0, 0);

    // console.log(problems);

    if (problems?.length > 0) {
      const firstProblemTime = new Date(problems[0].date);
      // console.log(firstProblemTime.getTime(), dailyFetchTime.getTime())
      if (firstProblemTime.getTime() < dailyFetchTime.getTime()) {
        // console.log("Fetching new daily problems...");
        await fetchDailyProblem();
      }
    } else {
      console.log("No problems found. Fetching new daily problems...");
      await fetchDailyProblem();
    }
  };

  const [sortType, setSortType] = useState('date-new');
  
  const handleSort = (type) => {
    setSortType(type);
    let sortedProblems = [...(filteredProblems.length > 0 ? filteredProblems : problems)];

    switch (type) {
      case 'date-new':
        sortedProblems.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-old':
        sortedProblems.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'difficulty-high':
        sortedProblems.sort((a, b) => b.rating - a.rating);
        break;
      case 'difficulty-low':
        sortedProblems.sort((a, b) => a.rating - b.rating);
        break;
      case 'solved':
        sortedProblems.sort((a, b) => {
          if (a.status === "solved" && b.status !== "solved") return -1;
          if (a.status !== "solved" && b.status === "solved") return 1;
          return new Date(b.date) - new Date(a.date);
        });
        break;
      case 'unsolved':
        sortedProblems.sort((a, b) => {
          if (a.status !== "solved" && b.status === "solved") return -1;
          if (a.status === "solved" && b.status !== "solved") return 1;
          return new Date(b.date) - new Date(a.date);
        });
        break;
      default:
        break;
    }
    
    setFilteredProblems(sortedProblems);
  };

  useEffect(() => {
    const fetchAllDailyProblems = async () => {
      const storedProblems = JSON.parse(localStorage.getItem("dailyProblem"));

      if (storedProblems && storedProblems.length > 0) {
        setProblems(storedProblems);
        showSuccessToast("Daily problems loaded successfully!");
        await toFetchDailyProblem(storedProblems);
        return;
      }

      try {
        const response = await getALLDailyProblems();
        if (!response || response.length === 0) {
          console.warn("No daily problems available.");
          showInfoToast("No daily problems available!");
          await toFetchDailyProblem(response);
          return;
        }

        setProblems(response);
        localStorage.setItem("dailyProblem", JSON.stringify(response));
        localStorage.setItem(
          "fetchTimeOfDailyProblem",
          new Date().toISOString()
        );

        await toFetchDailyProblem(response);
        showSuccessToast("Daily problems fetched successfully!");
      } catch (error) {
        console.error("Error fetching all daily problems:", error);
        showErrorToast("Error fetching all daily problems.");
      }
    };

    fetchAllDailyProblems();
  }, []);

  const fetchDailyProblem = async () => {
    try {
      await toast.promise(getDailyProblem(), {
        pending: "Fetching daily problem...",
        success: "Daily problem fetched successfully!",
        error: "Error fetching daily problem. Please try again.",
      });

      const response = await getALLDailyProblems();
      setProblems(response);
      localStorage.setItem("dailyProblem", JSON.stringify(response));
      localStorage.setItem("fetchTimeOfDailyProblem", new Date().toISOString());
    } catch (error) {
      showErrorToast("Error fetching daily problem. Please try again.");
      console.error("Error fetching daily problem:", error);
    }
  };

  const dailyProblemPreference = JSON.parse(
    localStorage.getItem("dailyProblemPreference") || "{}"
  );

  const handleOnClick = () => {
    navigate("/daily-problem-form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
            <div className="space-y-1 w-full sm:w-auto">
              <h2 className="text-sm font-medium text-gray-400">
                Selected Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {(
                  dailyProblemPreference.problemTags || [
                    "array",
                    "math",
                    "implementation",
                  ]
                ).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleOnClick}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors
                        flex items-center gap-2"
            >
              <i className="fas fa-cog" />
              Change Preferences
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-evenly">
          <div className="w-1/3 min-w-80">
            <div className="w-96 left-32 top-52 lg:fixed space-y-4">
              <Calendar problems={problems} onDayClick={scrollToProblem} />
              <FilterStats
                problems={problems}
                filteredCount={
                  (filteredProblems.length > 0 ? filteredProblems : problems)
                    .length
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <div className="space-y-4">
              <SearchBar onSearch={handleSearch} />
              <SortControls onSort={handleSort} currentSort={sortType} />
            </div>

            <div className="space-y-4">
              {(filteredProblems.length > 0 ? filteredProblems : problems)?.map(
                (problem, index) => (
                  <div
                    key={problem.id || index}
                    ref={(el) =>
                      (problemRefs.current[problem.date.split("T")[0]] = el)
                    }
                    className="w-full"
                  >
                    <DailyProblemCard problem={problem} ind={index} />
                  </div>
                )
              )}

              {(filteredProblems.length > 0 ? filteredProblems : problems)
                .length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No problems found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
