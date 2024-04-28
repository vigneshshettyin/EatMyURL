import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const backgroundColors:string[] = ["#ea580c","#8b5cf6","#d946ef","#ec4899","#06b6d4","#22c55e","#eab308","#f59e0b","#78716c","#6b7280","#64748b","#6366f1","#0ea5e9","#14b8a6"]
const devices:string[] = ["Windows 12","IOS","Windows 11","Ubuntu","Kali"]
const devicesEngage:number[] = [12,20,32,45,64]

export const data = {
  labels: devices,
  datasets: [
    {
      data: devicesEngage,
      backgroundColor : backgroundColors
    },
  ],  
};

export function PieChart() {
  return <Pie data={data} />;
}
