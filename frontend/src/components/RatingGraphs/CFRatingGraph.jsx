import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const RatingGraph = ({ ratingData }) => {
  // console.log(ratingData);
  if (!ratingData) {
    return <h1 className="text-cyan-400">No contest participation data available</h1>;
  }

  const labels = ratingData.map((item) => {
    const month = new Date(item.ratingUpdateTimeSeconds * 1000);
    return month.toLocaleString("en-In", {
      month: "short",
      timeZone: "Asia/Kolkata",
    });
  });

  const ratings = ratingData.map((item) => item.newRating);
  const contestNames = ratingData.map((item) => item.contestName);
  const ratingChanges = ratingData.map(
    (item) => item.newRating - item.oldRating
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "CF Rating Graph",
        data: ratings,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
            label: function (context) {
                const contestName = contestNames[context.dataIndex];
                let ratingChange = ratingChanges[context.dataIndex];
                if (ratingChange > 0) {
                  ratingChange = `+${ratingChange}`;
                }
                const date = new Date(ratingData[context.dataIndex].ratingUpdateTimeSeconds * 1000);
                const rank = ratingData[context.dataIndex].rank;
                
                // Returning each element on a new line
                return [
                  `Rating: ${context.raw} (${ratingChange})`,
                  `Rank: ${rank}`,
                  `Contest: ${contestName}`,
                  `Date: ${date.toLocaleString("en-In", {   timeZone: "Asia/Kolkata" })}`,
                ];
              },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Contests",
        },
        title: {
          display: true,
          text: "Rating",
        },
      },
    },
  };

  return (
    // <div style={{ width: '80%', margin: '0 auto' }}>
    //   <h2>User Rating Progress</h2>
    <Line data={chartData} options={options} />
    // </div>
  );
};

export default RatingGraph;
