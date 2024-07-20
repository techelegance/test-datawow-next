"use client";

import React, { useState, Fragment } from "react";
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDialogCreatePostStore } from "@/store/dialog/create-post";
import ButtonComponent from "./button";
import { Listbox, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "@/store/auth/profile";
import { useRouter } from "next/navigation";

const SearchComponent = ({
  search,
  setSearch,
  setGroup,
}: {
  search: string;
  setSearch: any;
  setGroup: any;
}) => {
  const router = useRouter();
  const setDialogCreate = useDialogCreatePostStore((state) => state.update);
  const profile = useProfileStore((state) => state.data);
  const [openSearch, setOpenSearch] = useState(false);

  const {
    isLoading,
    error,
    data: group,
  } = useQuery({
    queryKey: ["GroupData"],
    queryFn: () =>
      fetch(`http://localhost:3000/group`).then((res) => res.json()),
  });

  return (
    <section className="grid grid-cols-5 items-center gap-x-5">
      {openSearch ? (
        <div className="col-span-5 items-center gap-x-2 border border-white rounded-lg px-4 flex">
          <MagnifyingGlassIcon className="size-5 text-[#5B5B5B]" />
          <input
            className="bg-[#BBC2C0] placeholder:text-[#5B5B5B] placeholder:font-light h-8 w-full focus:outline-none"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      ) : (
        <>
          <div className="md:hidden block" onClick={() => setOpenSearch(true)}>
            <MagnifyingGlassIcon className="size-5 text-[#5B5B5B]" />
          </div>
          <div className="md:col-span-3 items-center gap-x-2 border border-white rounded-lg px-4 md:flex hidden">
            <MagnifyingGlassIcon className="size-5 text-[#5B5B5B]" />
            <input
              className="bg-[#BBC2C0] placeholder:text-[#5B5B5B] placeholder:font-light h-8 w-full focus:outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-center md:col-span-1 col-span-2">
            <Listbox onChange={(e) => setGroup(e)}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full md:w-auto cursor-pointer py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                  <span className="block truncate text-black font-medium md:text-left text-center">
                    Community
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="size-4 text-black"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm text-start">
                    {group &&
                      group?.map((item: any, index: number) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? "bg-[#D8E9E4]" : "text-gray-900"
                            }`
                          }
                          value={item}
                        >
                          {({ selected }) => (
                            <>
                              {selected ? (
                                <span className="absolute inset-y-0 right-3 flex items-center pl-3 text-gray-800">
                                  <CheckIcon
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {item.title}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="text-right md:col-span-1 col-span-2">
            <ButtonComponent
              type="button"
              style="solid"
              onClick={() =>
                profile
                  ? setDialogCreate(true)
                  : router.push("/", { scroll: false })
              }
            >
              Create +
            </ButtonComponent>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchComponent;
