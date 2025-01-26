import { NavLink } from "react-router-dom";

import HeaderLeft from "./components/headerLeft/headerLeft";
import HeaderRight from "./components/headerRight/headerRight";

const Header: React.FC = () => {
  return (
    <header
      className="m-auto h-[100px]  bg-[#F7F5EB]  dark:bg-zinc-900 
    w-full
semismall:w-[138%]
semimedium:w-[100%]
small:w-[170%]
    "
    >
      <div
        className="header flex justify-between gap-5 p-10 w-full small:w-[50%]
      large:w-[100%]
      sm:w-[100%]
      "
      >
        <HeaderLeft />

        <div
          className="bg-[#f8f4e3] dark:bg-zinc-900 text-[#450920] dark:text-white ml-[100px] text-4xl font-[600]
          small:text-[30px]
          large:text-[40px]
        
        
        "
        >
          <NavLink to={"/"}>ThriftShop</NavLink>
        </div>

        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
