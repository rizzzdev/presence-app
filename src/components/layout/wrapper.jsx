import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Wrapper = (props) => {
  const { children, topbarTitle, topbarDescription } = props;

  return (
    <>
      <Topbar title={topbarTitle} description={topbarDescription} />
      <Sidebar />
      <main
        className={`w-full h-[calc(100vh-76px)] flex flex-col justify-start items-center pl-4 md:pl-60 mt-19 pt-4 pb-4 pr-4 bg-main overflow-y-auto`}
      >
        {children}
      </main>
    </>
  );
};

export default Wrapper;
