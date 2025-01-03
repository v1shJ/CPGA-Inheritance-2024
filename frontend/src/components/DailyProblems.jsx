import React from "react";
import DailyProblemCard from "./DailyProblemCard";
import { useState } from "react";
import HomeNavbar from "./HomeNavbar";

export default function DailyProblems() {
  const [problems] = useState(() => {
    const today = new Date();

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    return [
      {
        title: "Two Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/two-sum/",
        date: formatDate(today),
        status: "unsolved",
      },
      {
        title: "Add Two Numbers",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/add-two-numbers/",
        date: formatDate(new Date(today.setDate(today.getDate() - 1))),
        status: "unsolved",
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        status: "unsolved",
        date: formatDate(new Date(today.setDate(today.getDate() - 1))),
      },
      {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        date: formatDate(new Date(today.setDate(today.getDate() - 1))),
        status: "unsolved",
      },
      {
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-palindromic-substring/",
        date: formatDate(new Date(today.setDate(today.getDate() - 1))),
        status: "unsolved",
      },
    ];
  });
  return (
    <div className="bg-gray-800 h-screen ">
      <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
    <div className="flex flex-col gap-4 mt-4">
      {problems.map((problem) => (
        <DailyProblemCard problem = {problem} />
      ))}
    </div>
      </div>
  );
}
