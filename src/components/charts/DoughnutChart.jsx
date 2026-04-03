import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "../../context/ThemeContext";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ progress = 75 }) => {
  const { isDark } = useTheme();
  const remaining = 100 - progress;
  const remainingColor = isDark ? "#374151" : "#e5e7eb";
  const legendColor = isDark ? "#d1d5db" : "#374151";

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [progress, remaining],
        backgroundColor: ["#f59e0b", remainingColor],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "72%",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 12 }, usePointStyle: true, padding: 16, color: legendColor },
      },
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.parsed}%` },
      },
    },
  };

  return (
    <div className="relative">
      <Doughnut key={progress} data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-8 pointer-events-none">
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{progress}%</span>
        <span className="text-xs text-gray-400 mt-0.5">Overall</span>
      </div>
    </div>
  );
};

export default DoughnutChart;