import Hamburger from "../ui/hamburger";

const Topbar = (props) => {
  const { title, description } = props;

  return (
    <nav className="w-full h-19 border-b border-b-white/10 fixed top-0 left-0 pl-4 md:pl-60 py-4 pr-4  z-98 flex justify-between items-center transition-all duration-500 bg-sidebar">
      <div className="w-full flex flex-col justify-center items-start gap-1">
        <h3 className="text-md font-semibold text-white/80">{title}</h3>
        <p className="text-xs text-white/80">{description}</p>
      </div>
      <div className="w-full flex gap-4 justify-end items-center">
        <div className="w-fit p-2 flex justify-center items-center gap-2 bg-accent/20 border border-accent/40 rounded-lg">
          <span className="w-2 h-2 bg-accent rounded-full"></span>
          <p className="text-xs text-accent">Sesi Aktif</p>
        </div>
        <Hamburger />
      </div>
    </nav>
  );
};

export default Topbar;
