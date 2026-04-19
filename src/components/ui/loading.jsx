const Loading = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-sidebar flex justify-center items-center z-2000">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="loader"></div>
        <h3 className="text-accent font-bold">Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;
