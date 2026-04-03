import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { monthlyMarks as defaultMarks } from "../../data/mockData";
import { useTheme } from "../../context/ThemeContext";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ latestMark }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? "#374151" : "#f3f4f6";
  const tickColor = isDark ? "#9ca3af" : "#6b7280";

  // Override the last (most recent) bar with the user's current score
  const marks = defaultMarks.map((d, i) =>
    i === defaultMarks.length - 1 && latestMark !== undefined
      ? { ...d, marks: latestMark }
      : d
  );

  const data = {
    labels: marks.map((d) => d.month),
    datasets: [
      {
        label: "Marks (%)",
        data: marks.map((d) => d.marks),
        backgroundColor: marks.map((_, i) =>
          i === marks.length - 1 ? "#f59e0b" : isDark ? "#3b82f6" : "#bfdbfe"
        ),
        hoverBackgroundColor: marks.map((_, i) =>
          i === marks.length - 1 ? "#d97706" : isDark ? "#60a5fa" : "#93c5fd"
        ),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        min: 60,
        max: 100,
        grid: { color: gridColor },
        ticks: { callback: (v) => `${v}%`, font: { size: 11 }, color: tickColor },
      },
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: tickColor } },
    },
  };

  return <Bar key={String(latestMark)} data={data} options={options} />;
};

export default BarChart;