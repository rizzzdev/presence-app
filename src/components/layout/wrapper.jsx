import Topbar from "./topbar";

const Wrapper = (props) => {
  const { children, topbarTitle, topbarDescription } = props;

  return (
    <>
      <Topbar title={topbarTitle} description={topbarDescription} />
      <main
        className={`w-full min-h-[100vh-80px] flex flex-col justify-center items-center pl-4 md:pl-60 pt-24 pb-4 pr-4`}
      >
        {children}
      </main>
    </>
  );
};

export default Wrapper;
