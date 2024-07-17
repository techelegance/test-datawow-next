import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LayoutAdminComponent from "@/components/admin/layout";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

const BoardPage = () => {
  return (
    <LayoutAdminComponent>
      <main className="w-3/4 h-full">
        <section className="grid grid-cols-5 items-center gap-x-5">
          <div className="col-span-3 flex items-center gap-x-2 border border-white rounded-lg px-4">
            <MagnifyingGlassIcon className="size-5 text-[#5B5B5B]" />
            <input
              className="bg-[#BBC2C0] placeholder:text-[#5B5B5B] placeholder:font-light h-8 w-full focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div className="w-52 text-right">
            <Menu>
              <MenuButton className="flex items-center gap-x-2">
                Community
                <ChevronDownIcon className="size-5" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <PencilIcon className="size-4 fill-white/30" />
                    Edit
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘E
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    Duplicate
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘D
                    </kbd>
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                    Archive
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘A
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <TrashIcon className="size-4 fill-white/30" />
                    Delete
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘D
                    </kbd>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div>
            <button className="bg-[#49A569] py-2 px-5 rounded-lg text-white text-xs">
              Create +
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg mt-5 py-5">
          <div >
            <div className="px-4">
              <div className="flex items-center gap-x-2">
                <img
                  src="https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9QMaml8Q5mejqhHhJkMco0Z9YZHSc4M4Po8IgTl5U1ykThCoFe3vgHjR7WdCTOfdz2bRpXLf9YHrjqOipA4OqaVqZuqM6798fu67WyecYJcEcLfd8OrZknoOdjlxBUTHUXyzikR5NcWpwUaT~WT7RMU0kf3O5N-jsM3AIFUSt6m0Ho2GgSz07wfc1ngQUb~sZ2p1rasFZde8gb7vHHFXbE65EsGBuNHzsIL-YpvkPpA682-vcwOjSYsnseJU3~VK9IE6ArMKXihQx54zT9ltMOM5in9WHCmKdui~UTSSq85hZ1IgFJyyu5VZm8YXInsVqliHyyTvfWMTB7iV6BIdw__"
                  className="w-7 h-7 rounded-full"
                />
                <span className="text-xs text-[#939494]">Wittawat</span>
              </div>
              <div className="mt-3">
                <span className="bg-slate-100 rounded-full text-xs py-1 px-2 text-[#4A4A4A]">
                  History
                </span>
              </div>
              <div className="mt-3">
                <h3 className="font-medium">
                  The Beginning of the End of the World
                </h3>
                <p className="text-xs line-clamp-2">
                  The afterlife sitcom The Good Place comes to its culmination,
                  the show’s two protagonists, Eleanor and Chidi, contemplate
                  their future. Having lived thousands upon thousands of
                  lifetimes together, and having experienced virtually
                  everything this life has to offer,
                  The afterlife sitcom The Good Place comes to its culmination,
                  the show’s two protagonists, Eleanor and Chidi, contemplate
                  their future. Having lived thousands upon thousands of
                  lifetimes together, and having experienced virtually
                  everything this life has to offer,
                </p>
                <div className="mt-2 text-[#939494] text-xs flex gap-x-2 items-center">
                  <ChatBubbleOvalLeftIcon className="size-4" />
                  <span>32</span>
                  <span>Comments</span>
                </div>
              </div>
            </div>
            <hr className="mt-5" />
          </div>
        </section>
      </main>
    </LayoutAdminComponent>
  );
};

export default BoardPage;
