import React from "react";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useProfileStore } from "@/store/auth/profile";

const NavbarComponent = () => {
  const pathname = usePathname();
  const profile = useProfileStore((state) => state.data);

  return (
    <nav className="w-[300px] overflow-y-auto px-5 py-7 hidden md:block">
      <ul className="grid gap-y-4 text-gray-800">
        <li>
          <Link href="/admin/home">
            <div
              className={clsx({
                "flex gap-x-2 items-center": true,
                "text-[#243831] font-semibold": pathname === "/admin/home",
              })}
            >
              <HomeIcon className="size-5" />
              <span className="text-sm">Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href={profile ? "/admin/out-blog" : "/"}>
            <div
              className={clsx({
                "flex gap-x-2 items-center": true,
                "text-[#243831] font-semibold": pathname === "/admin/out-blog",
              })}
            >
              <PencilSquareIcon className="size-5" />
              <span className="text-sm">Our Blog</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
