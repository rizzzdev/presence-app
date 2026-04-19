import { atom, useAtom } from "jotai";

export const isHamburgerOpenAtom = atom(true);

const Hamburger = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useAtom(isHamburgerOpenAtom);

  const handleClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <div
      className="flex w-6 h-6 flex-col justify-center items-center gap-2 cursor-pointer md:hidden"
      onClick={handleClick}
    >
      <span
        className={`w-full h-0.5 bg-text rounded-lg ${isHamburgerOpen && "rotate-45 translate-y-2.5"} transition-all duration-500`}
      ></span>
      <span
        className={`w-full h-0.5 bg-text rounded-lg  ${isHamburgerOpen && "translate-x-full invisible"} transition-all duration-200`}
      ></span>
      <span
        className={`w-full h-0.5 bg-text rounded-lg  ${isHamburgerOpen && "-rotate-45 -translate-y-2.5"} transition-all duration-500`}
      ></span>
    </div>
  );
};

export default Hamburger;
