import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // Import default styles
import "./HeatMapStyle.css";
import { Tooltip } from "react-tooltip";

const HeatMapChart = ({ heatMapData }) => {
  // console.log(heatMapData);
  // Transform data into required format for react-calendar-heatmap
  const transformedData = heatMapData.map((item) => ({
    date: item.date,
    count: item.value,
  }));

  // Define color scale for heatmap cells
  const getClassForValue = (value) => {
    if (!value) return "color-scale-0 border";
    if (value.count < 20) return "color-scale-1 border";
    if (value.count < 40) return "color-scale-2 border";
    if (value.count < 60) return "color-scale-3 border";
    return "color-scale-4";
  };

return (
    <div className="text-white">
      <h3 className="text-white">Heatmap Visualization</h3>
      <CalendarHeatmap
        startDate={new Date("2024-04-01")}
        endDate={new Date("2024-12-31")}
        values={transformedData}
        classForValue={getClassForValue}
        tooltipDataAttrs={(value) => ({
          "data-tooltip-id": "heatmap-tooltip",
          "data-tooltip-content": value && value.date ? `${value.date}: ${value.count}` : "No data",
        })}
        showWeekdayLabels
        id="heatmap"
      />
      <Tooltip id="heatmap-tooltip"/>
    </div>
);
};

export default HeatMapChart;
