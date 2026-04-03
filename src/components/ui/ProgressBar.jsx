const ProgressBar = ({ value, label, showPercent = true, color = "blue", size = "md" }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
    teal: "bg-teal-500",
    orange: "bg-orange-500",
    gray: "bg-gray-400",
    emerald: "bg-emerald-500",
    yellow: "bg-yellow-500",
  };
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const bar = colors[color] ?? "bg-blue-500";
  const h = heights[size] ?? heights.md;

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>}
          {showPercent && (
            <span className={`text-xs font-semibold ${value === 100 ? "text-green-600" : "text-gray-500 dark:text-gray-400"}`}>
              {value}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-100 dark:bg-gray-800 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${bar} ${h} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;