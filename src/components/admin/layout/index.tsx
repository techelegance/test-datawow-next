import React, { Fragment } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Navbar from "../navbar";
import Header from "../header";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import DialogCreatePostComponent from "@/components/common/dialogCreatePost";



const LayoutAdminComponent = ({ children }: any) => {
  

  return (
    <div className="h-screen bg-[#BBC2C0]">
      <div>
        <Header />
        <div className="flex">
          <Navbar />
          {children}
        </div>
      </div>

      <DialogCreatePostComponent />
    </div>
  );
};

export default LayoutAdminComponent;
