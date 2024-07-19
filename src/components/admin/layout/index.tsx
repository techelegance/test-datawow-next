import React, { Fragment, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Navbar from "../navbar";
import Header from "../header";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import DialogCreatePostComponent from "@/components/admin/dialog/dialogCreatePost";
import DialogUpdatePostComponent from "@/components/admin/dialog/dialogUpdatePost";
import DialogDeletePostComponent from "@/components/admin/dialog/dialogDeletePost";
// import { useTokenStore } from "@/store/auth/token";

const LayoutAdminComponent = ({ children }: any) => {
  // const setToken = useTokenStore((state) => state.update);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setToken(token);
  //   }
  // })
  
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
      <DialogUpdatePostComponent />
      <DialogDeletePostComponent />
    </div>
  );
};

export default LayoutAdminComponent;
