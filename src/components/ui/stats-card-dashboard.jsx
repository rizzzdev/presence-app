const StatsCardDashboard = (props) => {
  const { title, value, footer, borderTopColor = "red" } = props;

  const borderTopColors = {
    red: "border-t-red-500/80",
    blue: "border-t-blue-500/80",
    green: "border-t-green-500/80",
    yellow: "border-t-accent/80",
  };

  return (
    <div
      className={`w-full p-4 bg-white/5 rounded-lg border-2 ${borderTopColors[borderTopColor]} border-x-white/10 border-b-white/10 flex flex-col justify-between items-center gap-1`}
    >
      <div className="w-full flex flex-col justify-center items-start">
        <p className="text-xs text-white/60">{title}</p>
        <h3 className="text-2xl font-bold text-white/80">{value}</h3>
      </div>
      <p className="w-full text-[10px] text-white/60">{footer}</p>
    </div>
  );
};

export default StatsCardDashboard;
