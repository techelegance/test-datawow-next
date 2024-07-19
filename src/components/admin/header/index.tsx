import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const HeaderComponent = () => {
  return (
    <header className="bg-[#243831] grid grid-cols-2 px-5 py-2">
      <div>
        <h1 className="text-lg text-white">a Board</h1>
      </div>
      <div className="flex flex-row-reverse">
        
        <button className="bg-[#49A569] hover:bg-green-600 py-1 px-3 rounded-lg text-white text-xs md:block hidden">
          Sign In
        </button>
        <Bars3Icon className="size-7 text-white md:hidden block" />
      </div>
    </header>
  );
};

export default HeaderComponent;
