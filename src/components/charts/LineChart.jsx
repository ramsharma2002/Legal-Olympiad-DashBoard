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
  Filler,
} from "chart.js";
import { useTheme } from "../../context/ThemeContext";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data: rawData, period }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? "#374151" : "#f3f4f6";
  const tickColor = isDark ? "#9ca3af" : "#6b7280";

  const data = {
    labels: rawData.labels,
    datasets: [
      {
        label: "You",
        data: rawData.you,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245,158,11,0.08)",
        borderWidth: 2.5,
        pointBackgroundColor: "#f59e0b",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Top Student",
        data: rawData.topStudent,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.06)",
        borderWidth: 2,
        pointBackgroundColor: "#6366f1",
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: false,
        borderDash: [5, 3],
      },
      {
        label: "Class Average",
        data: rawData.average,
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.06)",
        borderWidth: 2,
        pointBackgroundColor: "#10b981",
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: false,
        borderDash: [3, 3],
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          font: { size: 11 },
          color: tickColor,
          usePointStyle: true,
          pointStyleWidth: 8,
          padding: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        min: 55,
        max: 100,
        grid: { color: gridColor },
        ticks: { callback: (v) => `${v}%`, font: { size: 11 }, color: tickColor },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: tickColor },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
