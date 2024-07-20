import React, { Fragment, useEffect } from "react";
import Navbar from "../navbar";
import Header from "../header";
import { useTokenStore } from "@/store/auth/token";
import { Toaster } from "react-hot-toast";

const LayoutAdminComponent = ({ children }: any) => {
  const setToken = useTokenStore((state) => state.update);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  });

  return (
    <div>
      <Toaster />
      <div>
        <Header />
        <div className="flex">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdminComponent;
