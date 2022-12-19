import React from "react";
import "./Chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function Chart({ chartDate }) {
  const txLengthArray = [];
  const dayArray = [];

  chartDate.forEach((el) => {
    dayArray.push(el.day.slice(5));
    txLengthArray.push(el.txLength);
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      y: {
        min: Math.min.apply(null, txLengthArray),
        max: Math.max.apply(null, txLengthArray) + 5,
      },
    },
  };

  const data = {
    labels: dayArray,
    datasets: [
      {
        data: txLengthArray,
        borderColor: "#5954FA",
        backgroundColor: "#5954FA",
      },
    ],
  };

  return (
    <>
      <div className="chartjsContainer">
        <Line data={data} options={options} height={60} />
      </div>
    </>
  );
}

export default Chart;
