import React, { Fragment } from "react";
import {
  HomeIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useProfileStore } from "@/store/auth/profile";
import { useNavbarMoblieStore } from "@/store/navbar/moblie";
import {
  Transition,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const NavbarComponent = () => {
  const pathname = usePathname();
  const profile = useProfileStore((state) => state.data);
  const openNavbar = useNavbarMoblieStore((state) => state.data);
  const closeNavbar = useNavbarMoblieStore((state) => state.remove);

  return (
    <>
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
                  "text-[#243831] font-semibold":
                    pathname === "/admin/out-blog",
                })}
              >
                <PencilSquareIcon className="size-5" />
                <span className="text-sm">Our Blog</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <Transition appear show={openNavbar} as={Fragment}>
        <Dialog as="div" onClose={closeNavbar}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <nav className="absolute right-0 top-0 w-[200px] z-50 bg-[#243831] h-screen overflow-y-auto px-5 py-7 rounded-l-xl md:hidden block">
            <button onClick={closeNavbar}>
              <ArrowRightIcon className="size-5 text-white" />
            </button>

            <ul className="grid gap-y-4 text-white z-50 mt-7">
              <li>
                <Link href="/admin/home">
                  <div
                    onClick={closeNavbar}
                    className={clsx({
                      "flex gap-x-2 items-center": true,
                      "font-semibold": pathname === "/admin/home",
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
                    onClick={closeNavbar}
                    className={clsx({
                      "flex gap-x-2 items-center": true,
                      "font-semibold": pathname === "/admin/out-blog",
                    })}
                  >
                    <PencilSquareIcon className="size-5" />
                    <span className="text-sm">Our Blog</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </Dialog>
      </Transition>
    </>
  );
};

export default NavbarComponent;
