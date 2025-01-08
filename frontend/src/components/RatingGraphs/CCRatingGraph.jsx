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
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CCRatingGraph = ({ ratingData }) => {
  if (!ratingData) {
    return <h1 className="text-red-400">No contest participation data available</h1>;
  }
  // Prepare data for the graph
  const labels = ratingData.map((entry) =>
    new Date(entry.end_date).toLocaleDateString("en-IN", { month: "short" })
  );
  const ratings = ratingData.map((entry) => parseInt(entry.rating));

  const data = {
    labels,
    datasets: [
      {
        label: "CodeChef Rating",
        data: ratings,
        backgroundColor: "#4CAF50",
        borderColor: "cyan",
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "cyan",
        borderDash: [1, 1, 1, 1, 1, 1],
        clip: 10,
        tension: 0.4, // Curve the line
        borderWidth: 1, // Set border width
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
        text: "CodeChef Rating Progress",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const contestName = ratingData[context.dataIndex].name;
            const rating = ratingData[context.dataIndex].rating;
            const rank = ratingData[context.dataIndex].rank;
            const endDate = new Date(ratingData[context.dataIndex].end_date);

            // Returning each element on a new line
            return [
              `Contest: ${contestName}`,
              `Rating: ${rating}`,
              `Rank: ${rank}`,
              `End Date: ${endDate.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}`,
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
        },
      },
      y: {
        title: {
          display: true,
          text: "Rating",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CCRatingGraph;
