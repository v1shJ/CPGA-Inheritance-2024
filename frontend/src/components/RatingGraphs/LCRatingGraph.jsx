import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LCRatingGraph = ({ contestParticipation }) => {
  if (!contestParticipation) {
    return <h1 className="text-red-400">No contest participation data available</h1>;
  }

  // Prepare data for the graph
  const labels = contestParticipation.map((entry) =>
    new Date(entry.contest.startTime * 1000).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
  );
  const ratings = contestParticipation.map((entry) => parseInt(entry.rating));

  const data = {
    labels,
    datasets: [
      {
        label: "LeetCode Rating",
        data: ratings,
        backgroundColor: "#4CAF50",
        borderColor: "cyan",
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "cyan",
        borderDash: [1,1,1,1,1], // Dashed line
        tension: 0.4, // Curve the line
        borderWidth: 2, // Set border width
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "LeetCode Rating Progress",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const contestName = contestParticipation[context.dataIndex].contest.title;
            const rating = contestParticipation[context.dataIndex].rating;
            const rank = contestParticipation[context.dataIndex].ranking;
            const problemsSolved = contestParticipation[context.dataIndex].problemsSolved;
            const totalProblems = contestParticipation[context.dataIndex].totalProblems;
            const finishTime = contestParticipation[context.dataIndex].finishTimeInSeconds;

            return [
              `Contest: ${contestName}`,
              `Rating: ${rating}`,
              `Rank: ${rank}`,
              `Problems Solved: ${problemsSolved}/${totalProblems}`,
              `Finish Time: ${Math.floor(finishTime / 60)} mins ${finishTime % 60} secs`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Contest Date",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Rating",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LCRatingGraph;
