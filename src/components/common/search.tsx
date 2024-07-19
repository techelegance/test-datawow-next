"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SelectComponent from "@/components/common/select";
import { useDialogCreatePostStore } from "@/store/dialog/create-post";
import ButtonComponent from "./button";

const SearchComponent = () => {
  const setDialogCreate = useDialogCreatePostStore((state) => state.update);

  return (
    <section className="grid grid-cols-5 items-center gap-x-5">
      <div className="col-span-3 flex items-center gap-x-2 border border-white rounded-lg px-4">
        <MagnifyingGlassIcon className="size-5 text-[#5B5B5B]" />
        <input
          className="bg-[#BBC2C0] placeholder:text-[#5B5B5B] placeholder:font-light h-8 w-full focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="text-center">
        <SelectComponent />
      </div>
      <div className="text-right">
        <ButtonComponent
          type="button"
          style="solid"
          onClick={() => setDialogCreate(true)}
        >
          Create +
        </ButtonComponent>
      </div>
    </section>
  );
};

export default SearchComponent;
