import { Radar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { radarSkills as defaultSkills } from "../../data/mockData";
import { useTheme } from "../../context/ThemeContext";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ you, average, labels }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const tickColor = isDark ? "#6b7280" : "#9ca3af";
  const angleColor = isDark ? "#374151" : "#e5e7eb";

  const resolvedLabels = labels || defaultSkills.labels;
  const resolvedYou = you || defaultSkills.you;
  const resolvedAverage = average || defaultSkills.average;

  const data = {
    labels: resolvedLabels,
    datasets: [
      {
        label: "You",
        data: resolvedYou,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245,158,11,0.15)",
        borderWidth: 2,
        pointBackgroundColor: "#f59e0b",
        pointRadius: 4,
      },
      {
        label: "Class Average",
        data: resolvedAverage,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#6366f1",
        pointRadius: 3,
        borderDash: [4, 3],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        min: 50,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (v) => `${v}`,
          font: { size: 9 },
          color: tickColor,
          backdropColor: "transparent",
        },
        grid: { color: gridColor },
        angleLines: { color: angleColor },
        pointLabels: {
          font: { size: 11 },
          color: isDark ? "#d1d5db" : "#374151",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 11 },
          color: isDark ? "#d1d5db" : "#374151",
          usePointStyle: true,
          padding: 16,
        },
      },
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.r}%` },
      },
    },
  };

  return <Radar key={resolvedYou.join(",")} data={data} options={options} />;
};

export default RadarChart;
