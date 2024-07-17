import React from "react";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const LayoutAdminComponent = ({ children }: any) => {
  return (
    <div className="h-screen bg-[#BBC2C0]">
      <div>
        <header className="bg-[#243831] grid grid-cols-2 px-5 py-2">
          <div>
            <h1 className="text-lg text-white">a Board</h1>
          </div>
          <div className="flex flex-row-reverse">
            <button className="bg-[#49A569] py-1 px-3 rounded-lg text-white text-xs">
              Sign In
            </button>
          </div>
        </header>
        <div className="flex">
          <nav className="w-[300px] overflow-y-auto px-5 py-7">
            <ul className="grid gap-y-4">
              <li className="flex gap-x-2 items-center">
                <HomeIcon className="size-5" />
                <span className="text-sm">Home</span>
              </li>
              <li className="flex gap-x-2 items-center">
                <PencilSquareIcon className="size-5" />
                <span className="text-sm">Our Blog</span>
              </li>
            </ul>
          </nav>
          <div className="w-full h-full px-3 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdminComponent;
