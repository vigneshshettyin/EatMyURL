import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export const data = {
  labels: ["ss", "Apple", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 20, 3, 5, 2, 3],
      backgroundColor: [
        "#B3FFB3",
        "#ECD9C6",
        "#B3FFB3",
        "#ECD9C6",
        "#B3FFB3",
        "#ECD9C6",
      ],
      borderColor: ["black", "white", "black", "white", "black", "white"],
      borderWidth: 1,
    },
  ],  
};

export function PieChart() {
  return <Pie data={data} />;
}
