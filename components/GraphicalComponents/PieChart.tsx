import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const backgroundColors:string[] = ["#ea580c","#8b5cf6","#d946ef","#ec4899","#06b6d4","#22c55e","#eab308","#f59e0b","#78716c","#6b7280","#64748b","#6366f1","#0ea5e9","#14b8a6"]

export function PieChart({devices,data}:{
  devices:string[],
  data:number[]
}) {

  const passDown = {
    labels: devices,
    datasets: [
      {
        data: data,
        backgroundColor : backgroundColors
      },
    ],  
  };

  return <Pie data={passDown} />;
}
