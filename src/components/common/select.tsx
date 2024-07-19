"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LayoutAdminComponent from "@/components/admin/layout";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

const SelectComponent = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(people[1]);

  return (
    <Combobox
      value={selected}
      onChange={(value: any) => setSelected(value)}
      onClose={() => setQuery("")}
    >
      <div className="relative flex items-center w-32">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-800">Community</div>
        <ComboboxInput
          className={clsx(
            "w-full rounded-lg border-none bg-white/10 text-gray-800 py-1.5 pr-8 pl-3 text-sm/6 collapse",
            "focus:outline-none"
          )}
          displayValue={(person: any) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 text-gray-800" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "rounded-md border shadow-md w-40 bg-white mt-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {people.map((person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className="group flex flex-between w-full cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-[#D8E9E4]"
          >
            <div className="text-sm/6 text-gray-800">{person.name}</div>
            <CheckIcon className="invisible size-4 group-data-[selected]:visible text-gray-800" />
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default SelectComponent;
