import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const CPStatsPieChart = ({ Count, Title }) => {
  // Data for the pie chart
  const data = {
    labels: ["Codechef", "Codeforces", "LeetCode"],
    datasets: [
      {
        data: [Count.CodeChef, Count.CodeForces, Count.LeetCode], // Data for the sections
        backgroundColor: ["#0CB5B4", "#A7E435", "#2BB845"], // Colors for Codechef and Codeforces
        hoverBackgroundColor: ["#0CB5B4", "#A7E435", "#2BB845"], // Hover colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    cutout: "75%", // Create a donut chart with a large cutout for the center text
  };

  return (
    <div className="flex flex-col gap-1 items-center justify-center"> 
      {/* Centered Total Value */}
      <div className="text-2xl text-white text-center">
         {Title}
      </div>
      {/* Pie Chart */}
      <Pie data={data} options={options} />
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-1 items-start justify-center">
          <p style={{ color: "#0CB5B4", margin: 0 }}>
            Codechef: {Count.CodeChef}
          </p>
          <p style={{ color: "#A7E435", margin: 0 }}>
            Codeforces: {Count.CodeForces}
          </p>
          <p style={{ color: "#2BB845", margin: 0 }}>
            LeetCode: {Count.LeetCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CPStatsPieChart;
