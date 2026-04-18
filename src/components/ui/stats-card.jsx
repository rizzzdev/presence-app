const StatsCard = (props) => {
  const { title, value, color = "green" } = props;

  const colors = {
    red: "bg-red-500/10  text-red-500/70",
    blue: "bg-blue-500/10  text-blue-500/70",
    green: "bg-green-500/10  text-green-500/70",
    yellow: "bg-accent/10  text-accent/70",
  };

  return (
    <div
      className={`w-full p-6 rounded-lg flex flex-col justify-between items-center gap-1 ${colors[color]}`}
    >
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-[10px] text-white/60">{title}</p>
    </div>
  );
};

export default StatsCard;
